import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

function getAnnouncementModel() {
  const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });
  return mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
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
  await mongoose.connect(process.env.MONGODB_URI || "");
  const Announcement = getAnnouncementModel();
  const { id } = req.query;

  if (req.method === "GET") {
    const item = await Announcement.findById(id);
    return item ? res.status(200).json(item) : res.status(404).json({ message: "Bulunamadi" });
  }

  if (req.method === "PUT") {
    if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });
    const item = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    return item ? res.status(200).json(item) : res.status(404).json({ message: "Bulunamadi" });
  }

  if (req.method === "DELETE") {
    if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });
    await Announcement.findByIdAndDelete(id);
    return res.status(200).json({ message: "Silindi" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
