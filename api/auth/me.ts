import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Yetkisiz erisim" });
    }

    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    const token = authHeader.substring(7);
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    await mongoose.connect(process.env.MONGODB_URI || "");

    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true, lowercase: true },
      passwordHash: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, default: "admin" },
    }, { timestamps: true });
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Şifre değiştirme: { mevcut, yeni }
    if (req.method === "PUT") {
      const { mevcut, yeni } = req.body || {};
      if (typeof mevcut !== "string" || typeof yeni !== "string") {
        return res.status(400).json({ message: "Mevcut ve yeni şifre gereklidir" });
      }
      if (yeni.length < 10) {
        return res.status(400).json({ message: "Yeni şifre en az 10 karakter olmalıdır" });
      }
      const kullanici: any = await User.findById(decoded.userId);
      if (!kullanici) return res.status(404).json({ message: "Kullanici bulunamadi" });
      const bcryptModule = await import("bcryptjs");
      const bcrypt = (bcryptModule as any).default || bcryptModule;
      if (!bcrypt.compareSync(mevcut, kullanici.passwordHash)) {
        return res.status(400).json({ message: "Mevcut şifre yanlış" });
      }
      kullanici.passwordHash = bcrypt.hashSync(yeni, 12);
      await kullanici.save();
      return res.status(200).json({ message: "Şifre değiştirildi" });
    }

    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "Kullanici bulunamadi" });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(401).json({ message: "Gecersiz token" });
  }
}
