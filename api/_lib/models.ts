import mongoose from "mongoose";

// User
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "admin" },
}, { timestamps: true });

// Course
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

// Announcement
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

// ContactMessage
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

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export const Announcement = mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
export const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);
