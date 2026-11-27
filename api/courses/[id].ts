import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

function getCourseModel() {
  const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    curriculum: [{ type: String }],
    requirements: [{ type: String }],
    documents: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  }, { timestamps: true });
  return mongoose.models.Course || mongoose.model("Course", CourseSchema);
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
  const Course = getCourseModel();
  const { id } = req.query;

  if (req.method === "GET") {
    const course = await Course.findById(id);
    return course ? res.status(200).json(course) : res.status(404).json({ message: "Bulunamadi" });
  }

  if (req.method === "PUT") {
    if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    return course ? res.status(200).json(course) : res.status(404).json({ message: "Bulunamadi" });
  }

  if (req.method === "DELETE") {
    if (!(await checkAuth(req))) return res.status(401).json({ message: "Yetkisiz" });
    await Course.findByIdAndDelete(id);
    return res.status(200).json({ message: "Silindi" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
