// ==========================================
// API Client
// ==========================================

const API_BASE = "/api";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("tmg_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Bir hata olustu" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ---- Auth ----
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<{ user: any }>("/auth/me"),
  sifreDegistir: (mevcut: string, yeni: string) =>
    request<{ message: string }>("/auth/me", {
      method: "PUT",
      body: JSON.stringify({ mevcut, yeni }),
    }),
};

// ---- Panelden düzenlenen içerikler (site, harclar, takvim, sss) ----
export const icerikApi = {
  get: (anahtar: string) =>
    request<{ veri: any; guncelleme: string | null }>(`/icerik?anahtar=${encodeURIComponent(anahtar)}`),
  save: (anahtar: string, veri: any) =>
    request<{ veri: any; guncelleme: string | null }>(`/icerik?anahtar=${encodeURIComponent(anahtar)}`, {
      method: "PUT",
      body: JSON.stringify({ veri }),
    }),
};

// ---- Courses ----
export const coursesApi = {
  getAll: () => request<any[]>("/courses"),
  getById: (id: string) => request<any>(`/courses/${id}`),
  create: (data: any) =>
    request<any>("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    request<any>(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request<any>(`/courses/${id}`, { method: "DELETE" }),
};

// ---- Announcements ----
export const announcementsApi = {
  getAll: () => request<any[]>("/announcements"),
  getById: (id: string) => request<any>(`/announcements/${id}`),
  create: (data: any) =>
    request<any>("/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    request<any>(`/announcements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    request<any>(`/announcements/${id}`, { method: "DELETE" }),
};

// ---- Contact ----
export const contactApi = {
  send: (data: any) =>
    request<any>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAll: () => request<any[]>("/contact"),
  markRead: (id: string) =>
    request<any>(`/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isRead: true }),
    }),
  delete: (id: string) =>
    request<any>(`/contact/${id}`, { method: "DELETE" }),
};

// ---- Upload ----
export const uploadApi = {
  uploadImage: async (file: File) => {
    const token = localStorage.getItem("tmg_token");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Upload basarisiz");
    return res.json();
  },
};
