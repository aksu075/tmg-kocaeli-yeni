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

async function getAuth(req: VercelRequest): Promise<boolean> {
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

  if (req.method === "GET") {
    try {
      const isAdmin = await getAuth(req);
      const filter = isAdmin ? {} : { isActive: true };
      const courses = await Course.find(filter).sort({ order: 1 });
      return res.status(200).json(courses);
    } catch (error: any) {
      return res.status(500).json({ message: "Sunucu hatasi", error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Yetkisiz" });
      const jwtModule = await import("jsonwebtoken");
      const jwt = (jwtModule as any).default || jwtModule;
      jwt.verify(authHeader.substring(7), process.env.JWT_SECRET as string);

      const course = await Course.create(req.body);
      return res.status(201).json(course);
    } catch (error: any) {
      return res.status(500).json({ message: "Kurs olusturulamadi", error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
