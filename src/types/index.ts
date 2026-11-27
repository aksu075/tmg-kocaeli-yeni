// ==========================================
// TMG Guvenlik - Type Definitions
// ==========================================

export interface Course {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  curriculum: string[];
  requirements: string[];
  documents?: string[];
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Announcement {
  _id?: string;
  title: string;
  content: string;
  summary?: string;
  image?: string;
  link?: string;
  isPinned: boolean;
  isPublished: boolean;
  publishDate: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  surname: string;
  email?: string;
  phone: string;
  course?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}

export interface User {
  _id?: string;
  email: string;
  name: string;
  role: "admin";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Contact form schema
export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
