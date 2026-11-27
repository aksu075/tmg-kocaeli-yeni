import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ message: "Yetkisiz" });
  try {
    const jwtModule = await import("jsonwebtoken");
    const jwt = (jwtModule as any).default || jwtModule;
    jwt.verify(h.substring(7), process.env.JWT_SECRET as string);
  } catch {
    return res.status(401).json({ message: "Yetkisiz" });
  }

  try {
    const cloudinaryModule = await import("cloudinary");
    const cloudinary = cloudinaryModule.default || cloudinaryModule;
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { data } = req.body;
    if (!data) return res.status(400).json({ message: "Gorsel verisi gerekli" });

    const result = await cloudinary.v2.uploader.upload(data, {
      folder: "tmg-guvenlik",
      resource_type: "auto",
    });

    return res.status(200).json({ url: result.secure_url, publicId: result.public_id });
  } catch (error: any) {
    return res.status(500).json({ message: "Yukleme basarisiz", error: error.message });
  }
}
