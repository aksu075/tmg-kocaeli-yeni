import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");

    const UserSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true, lowercase: true },
      passwordHash: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, default: "admin" },
    }, { timestamps: true });
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email ve sifre gereklidir" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Gecersiz email veya sifre" });
    }

    const bcryptModule = await import("bcryptjs");
    const bcrypt = bcryptModule.default || bcryptModule;
    const isValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Gecersiz email veya sifre" });
    }

    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      token,
      user: { _id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Sunucu hatasi", error: error.message });
  }
}
