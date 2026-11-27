import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
