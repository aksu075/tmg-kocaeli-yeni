import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

// Yönetim panelinden düzenlenen sayfa içerikleri (sınav takvimi, harçlar, SSS, site bilgileri).
// Her içerik tek bir kayıttır: { anahtar, veri }. Kayıt yoksa site kendi varsayılan içeriğini gösterir.
const ANAHTARLAR = ["site", "harclar", "takvim", "sss"];
const AZAMI_BOYUT = 100 * 1024; // 100 KB

function getModel() {
  const Schema = new mongoose.Schema(
    {
      anahtar: { type: String, required: true, unique: true },
      veri: { type: mongoose.Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
  );
  return mongoose.models.SiteIcerik || mongoose.model("SiteIcerik", Schema);
}

async function checkAuth(req: VercelRequest): Promise<boolean> {
  const h = req.headers.authorization;
  if (!h) return false;
  try {
    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    jwt.verify(h.substring(7), process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const anahtar = String(req.query.anahtar || "");
  if (!ANAHTARLAR.includes(anahtar)) {
    return res.status(400).json({ message: "Geçersiz içerik" });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    const Icerik = getModel();

    if (req.method === "GET") {
      const kayit: any = await Icerik.findOne({ anahtar }).lean();
      return res.status(200).json({ veri: kayit ? kayit.veri : null, guncelleme: kayit ? kayit.updatedAt : null });
    }

    if (req.method === "PUT") {
      if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });
      const veri = req.body?.veri;
      if (veri === undefined || veri === null || typeof veri !== "object") {
        return res.status(400).json({ message: "İçerik boş olamaz" });
      }
      if (JSON.stringify(veri).length > AZAMI_BOYUT) {
        return res.status(400).json({ message: "İçerik çok uzun" });
      }
      const kayit: any = await Icerik.findOneAndUpdate({ anahtar }, { veri }, { new: true, upsert: true }).lean();
      return res.status(200).json({ veri: kayit.veri, guncelleme: kayit.updatedAt });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
