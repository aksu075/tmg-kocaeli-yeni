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

async function getAuth(req: VercelRequest): Promise<any> {
  const h = req.headers.authorization;
  if (!h) return null;
  try {
    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    return jwt.verify(h.substring(7), process.env.JWT_SECRET as string);
  } catch { return null; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await mongoose.connect(process.env.MONGODB_URI || "");
  const Announcement = getAnnouncementModel();

  if (req.method === "GET") {
    const auth = await getAuth(req);
    const filter = auth ? {} : { isPublished: true };
    const announcements = await Announcement.find(filter).sort({ isPinned: -1, publishDate: -1 });
    return res.status(200).json(announcements);
  }

  if (req.method === "POST") {
    const auth = await getAuth(req);
    if (!auth) return res.status(401).json({ message: "Yetkisiz" });

    const announcement = await Announcement.create({ ...req.body, author: auth.userId });
    return res.status(201).json(announcement);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
