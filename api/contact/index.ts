import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

function getContactMessageModel() {
  const ContactMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    course: { type: String, default: "" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  }, { timestamps: true });
  return mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
}

// Yeni mesaj gelince kuruma e-posta bildirimi. RESEND_API_KEY ve BILDIRIM_EPOSTA tanımlı değilse hiçbir şey yapmaz.
// Bildirim gönderilemese bile mesaj kaydedilmiş olur.
async function bildir(v: Record<string, string>) {
  const anahtar = process.env.RESEND_API_KEY;
  const alici = process.env.BILDIRIM_EPOSTA;
  if (!anahtar || !alici) return;
  const satirlar = [
    `Ad Soyad: ${v.name} ${v.surname}`,
    `Telefon: ${v.phone}`,
    v.email ? `E-posta: ${v.email}` : "",
    v.course ? `İlgilendiği kurs: ${v.course}` : "",
    `Konu: ${v.subject}`,
    "",
    v.message,
    "",
    "Bu mesaj tmgkocaeli.com iletişim formundan gönderildi. Tüm mesajlar yönetim panelinde de görünür.",
  ].filter((s, i, a) => s !== "" || a[i - 1] !== "");
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${anahtar}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.BILDIRIM_GONDEREN || "TMG Web Sitesi <onboarding@resend.dev>",
        to: alici.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: v.email || undefined,
        subject: `Web sitesinden yeni mesaj: ${v.subject}`,
        text: satirlar.join(String.fromCharCode(10)),
      }),
    });
  } catch {
    /* bildirim gitmezse mesaj yine panelde */
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await mongoose.connect(process.env.MONGODB_URI || "");
  const ContactMessage = getContactMessageModel();

  if (req.method === "POST") {
    // Yalnızca formdaki alanlar alınır; uzunluklar sınırlanır (isRead gibi alanlar dışarıdan ayarlanamaz).
    const body = req.body || {};
    const alan = (k: string, max: number) => (typeof body[k] === "string" ? body[k].trim().slice(0, max) : "");
    const veri = {
      name: alan("name", 80),
      surname: alan("surname", 80),
      email: alan("email", 120),
      phone: alan("phone", 30),
      course: alan("course", 120),
      subject: alan("subject", 150),
      message: alan("message", 3000),
    };
    if (!veri.name || !veri.surname || !veri.phone || !veri.subject || !veri.message) {
      return res.status(400).json({ message: "Lütfen zorunlu alanları doldurun." });
    }
    try {
      await ContactMessage.create(veri);
      await bildir(veri);
    } catch {
      return res.status(500).json({ message: "Mesajınız kaydedilemedi. Lütfen bizi telefonla arayın." });
    }
    return res.status(201).json({ message: "Mesajınız gönderildi" });
  }

  if (req.method === "GET") {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ message: "Yetkisiz" });
    try {
      const jwtModule = await import("jsonwebtoken");
      const jwt = (jwtModule as any).default || jwtModule;
      jwt.verify(h.substring(7), process.env.JWT_SECRET as string);
    } catch {
      return res.status(401).json({ message: "Yetkisiz" });
    }

    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.status(200).json(messages);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
