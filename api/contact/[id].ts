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

async function checkAuth(req: VercelRequest): Promise<boolean> {
  const h = req.headers.authorization;
  if (!h) return false;
  try {
    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    jwt.verify(h.substring(7), process.env.JWT_SECRET as string);
    return true;
  } catch { return false; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });

  await mongoose.connect(process.env.MONGODB_URI || "");
  const ContactMessage = getContactMessageModel();
  const { id } = req.query;

  if (req.method === "PUT") {
    const msg = await ContactMessage.findByIdAndUpdate(id, { isRead: Boolean(req.body?.isRead) }, { new: true });
    return msg ? res.status(200).json(msg) : res.status(404).json({ message: "Bulunamadi" });
  }

  if (req.method === "DELETE") {
    await ContactMessage.findByIdAndDelete(id);
    return res.status(200).json({ message: "Silindi" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
