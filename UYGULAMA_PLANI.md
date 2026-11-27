# TMG Güvenlik Eğitim Kurumu — Kapsamlı Uygulama Planı

## Mevcut Durum Özeti

**Proje:** React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
**Mevcut Sayfalar:** Ana Sayfa, Hakkımızda, Kurslar, İletişim, 404
**Eksikler:** Backend yok, veritabanı yok, admin paneli yok, authentication yok, tüm veriler hardcoded

---

## Teknoloji Kararları

| Katman | Teknoloji | Neden |
|--------|-----------|-------|
| Frontend | React + TypeScript (mevcut) | Zaten kurulu, modern stack |
| Backend API | Express.js + TypeScript | Node.js ekosistemi, Vercel uyumu |
| Veritabanı | MongoDB Atlas (Free Tier) | 512MB ücretsiz, esnek şema, kolay kurulum |
| Görsel Depolama | Cloudinary (Free Tier) | 25GB ücretsiz, otomatik optimizasyon, CDN |
| Authentication | JWT + bcrypt | Basit, güvenilir, bağımsız |
| Deploy | Vercel | Frontend + Serverless API tek platformda |
| ORM/ODM | Mongoose | MongoDB için type-safe şema yönetimi |

---

## Faz 1: Mevcut Projeyi Optimize Et

### 1.1 Kod Temizliği ve Yeniden Yapılandırma
- [ ] Hardcoded kurs verilerini `src/data/courses.ts` dosyasına taşı
- [ ] `CoursesPage.tsx` ve `FeaturedCourses.tsx` arasındaki veri tekrarını kaldır
- [ ] Tekrar kullanılabilir `CourseCard` bileşeni oluştur
- [ ] İletişim formunu React Hook Form + Zod ile yeniden yaz (bağımlılıklar zaten mevcut)
- [ ] Kullanılmayan bağımlılıkları temizle (recharts, date-fns, embla-carousel vb.)

### 1.2 Performans İyileştirmeleri
- [ ] Sayfa bazlı lazy loading ekle (`React.lazy` + `Suspense`)
- [ ] Görseller için loading/fallback mekanizması ekle
- [ ] Navigation'a aktif sayfa göstergesi ekle
- [ ] SEO meta tag yönetimi ekle (react-helmet-async)

### 1.3 UX İyileştirmeleri
- [ ] Loading skeleton/spinner bileşenleri ekle
- [ ] Error boundary ekle
- [ ] Erişilebilirlik (a11y) iyileştirmeleri: aria-label, semantic HTML
- [ ] Scroll-to-top davranışı ekle

---

## Faz 2: Backend API Oluştur

### 2.1 Proje Yapısı
```
src/
├── api/                        # Vercel Serverless Functions
│   ├── auth/
│   │   ├── login.ts            # POST /api/auth/login
│   │   └── me.ts               # GET /api/auth/me (token doğrulama)
│   ├── courses/
│   │   ├── index.ts            # GET /api/courses (liste)
│   │   ├── [id].ts             # GET/PUT/DELETE /api/courses/:id
│   │   └── create.ts           # POST /api/courses
│   ├── announcements/
│   │   ├── index.ts            # GET /api/announcements (liste)
│   │   ├── [id].ts             # GET/PUT/DELETE /api/announcements/:id
│   │   └── create.ts           # POST /api/announcements
│   ├── contact/
│   │   └── index.ts            # POST /api/contact (form gönderimi)
│   └── upload/
│       └── index.ts            # POST /api/upload (Cloudinary'ye yükle)
├── lib/
│   ├── mongodb.ts              # MongoDB bağlantı yönetimi
│   ├── cloudinary.ts           # Cloudinary yapılandırması
│   ├── auth.ts                 # JWT yardımcı fonksiyonlar
│   └── middleware.ts           # Auth middleware
```

### 2.2 MongoDB Atlas Kurulumu
- [ ] MongoDB Atlas hesabı oluştur (ücretsiz M0 cluster)
- [ ] Veritabanı: `tmg_guvenlik`
- [ ] Network access ve kullanıcı ayarları

### 2.3 Veritabanı Şemaları

**Users Koleksiyonu:**
```typescript
{
  _id: ObjectId,
  email: string,           // admin@tmg.com
  passwordHash: string,    // bcrypt ile hashlenmiş
  name: string,
  role: "admin",
  createdAt: Date,
  updatedAt: Date
}
```

**Courses Koleksiyonu:**
```typescript
{
  _id: ObjectId,
  title: string,           // "Silahlı Özel Güvenlik Eğitimi"
  slug: string,            // "silahli-ozel-guvenlik"
  description: string,
  duration: string,        // "120 Saat"
  price: number,           // 2500
  image: string,           // Cloudinary URL
  curriculum: string[],    // Müfredat maddeleri
  requirements: string[],  // Gereksinimler
  isActive: boolean,
  order: number,           // Sıralama
  createdAt: Date,
  updatedAt: Date
}
```

**Announcements Koleksiyonu:**
```typescript
{
  _id: ObjectId,
  title: string,
  content: string,         // Rich text içerik
  image?: string,          // Opsiyonel Cloudinary URL
  isPinned: boolean,       // Sabitlenmiş duyuru
  isPublished: boolean,
  publishDate: Date,
  author: ObjectId,        // Users referansı
  createdAt: Date,
  updatedAt: Date
}
```

**ContactMessages Koleksiyonu:**
```typescript
{
  _id: ObjectId,
  name: string,
  surname: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  isRead: boolean,
  createdAt: Date
}
```

### 2.4 API Endpoint'leri

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| POST | /api/auth/login | Admin giriş | Hayır |
| GET | /api/auth/me | Token doğrulama | Evet |
| GET | /api/courses | Kurs listesi | Hayır |
| POST | /api/courses | Kurs ekle | Evet |
| PUT | /api/courses/:id | Kurs güncelle | Evet |
| DELETE | /api/courses/:id | Kurs sil | Evet |
| GET | /api/announcements | Duyuru listesi | Hayır |
| POST | /api/announcements | Duyuru ekle | Evet |
| PUT | /api/announcements/:id | Duyuru güncelle | Evet |
| DELETE | /api/announcements/:id | Duyuru sil | Evet |
| POST | /api/contact | İletişim formu gönder | Hayır |
| POST | /api/upload | Görsel yükle | Evet |
| GET | /api/contact | Mesajları listele | Evet |

---

## Faz 3: Cloudinary Entegrasyonu

### 3.1 Kurulum
- [ ] Cloudinary hesabı oluştur (ücretsiz)
- [ ] Upload preset oluştur (unsigned veya signed)
- [ ] Ortam değişkenlerini ayarla

### 3.2 Görsel Yönetimi
- [ ] Admin panelden görsel yükleme bileşeni
- [ ] Otomatik boyutlandırma ve optimizasyon
- [ ] Kurs ve duyuru görselleri için Cloudinary URL'leri MongoDB'de sakla
- [ ] Lazy loading + blur placeholder desteği

---

## Faz 4: Authentication Sistemi

### 4.1 JWT Tabanlı Auth
- [ ] Login endpoint (email + şifre → JWT token)
- [ ] Token doğrulama middleware
- [ ] Token'ı localStorage'da sakla (frontend)
- [ ] Auth context (React Context API)
- [ ] Protected route bileşeni

### 4.2 Güvenlik
- [ ] Şifreler bcrypt ile hashlenecek (salt rounds: 12)
- [ ] JWT expire süresi: 24 saat
- [ ] Rate limiting (brute-force koruması)
- [ ] CORS ayarları

---

## Faz 5: Admin Paneli (Frontend)

### 5.1 Yeni Route Yapısı
```
Mevcut (Public):
/                    → Ana Sayfa
/hakkimizda          → Hakkımızda
/kurslar             → Kurslar
/duyurular           → Duyurular (YENİ)
/iletisim            → İletişim

Admin (Protected):
/admin/login         → Admin Giriş
/admin               → Admin Dashboard
/admin/kurslar       → Kurs Yönetimi
/admin/duyurular     → Duyuru Yönetimi
/admin/mesajlar      → İletişim Mesajları
/admin/ayarlar       → Site Ayarları
```

### 5.2 Admin Sayfaları

**Login Sayfası (`/admin/login`):**
- Email + şifre formu
- JWT token al ve sakla
- Başarılı girişte dashboard'a yönlendir

**Dashboard (`/admin`):**
- Özet kartlar: toplam kurs, aktif duyuru, okunmamış mesaj sayısı
- Son 5 iletişim mesajı önizlemesi
- Hızlı erişim butonları

**Kurs Yönetimi (`/admin/kurslar`):**
- Kurs listesi (tablo görünümü)
- Kurs ekle/düzenle formu (modal veya ayrı sayfa)
- Görsel yükleme (Cloudinary)
- Müfredat ve gereksinimleri dinamik olarak ekle/çıkar
- Sıralama (drag & drop veya numara)
- Aktif/pasif toggle

**Duyuru Yönetimi (`/admin/duyurular`):**
- Duyuru listesi
- Zengin metin editörü (TipTap veya React Quill)
- Görsel ekleme
- Yayınla/taslak durumu
- Sabitleme özelliği

**Mesajlar (`/admin/mesajlar`):**
- İletişim formundan gelen mesajlar
- Okundu/okunmadı durumu
- Filtreleme ve arama

### 5.3 Admin Bileşenleri
```
src/components/admin/
├── AdminLayout.tsx          # Admin sidebar + header layout
├── AdminSidebar.tsx         # Sol menü
├── AdminHeader.tsx          # Üst bar (kullanıcı bilgisi, çıkış)
├── ProtectedRoute.tsx       # Auth kontrolü
├── CourseForm.tsx           # Kurs ekleme/düzenleme formu
├── AnnouncementForm.tsx     # Duyuru ekleme/düzenleme formu
├── ImageUploader.tsx        # Cloudinary görsel yükleme
├── RichTextEditor.tsx       # Zengin metin editörü
├── DataTable.tsx            # Genel tablo bileşeni
└── StatsCard.tsx            # Dashboard istatistik kartı
```

---

## Faz 6: Duyurular Sayfası (Public)

### 6.1 Public Duyurular Sayfası (`/duyurular`)
- [ ] Duyuru listesi (kart görünümü)
- [ ] Sabitlenmiş duyurular üstte
- [ ] Tarih bazlı sıralama (yeniden eskiye)
- [ ] Pagination veya infinite scroll
- [ ] Duyuru detay görünümü (modal veya ayrı sayfa)

### 6.2 Ana Sayfaya Entegrasyon
- [ ] Son 3 duyuruyu ana sayfada göster
- [ ] "Tüm Duyurular" bağlantısı

---

## Faz 7: Deploy ve Son Ayarlar

### 7.1 Ortam Değişkenleri (.env)
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 7.2 Vercel Deploy
- [ ] GitHub repo bağla
- [ ] Ortam değişkenlerini Vercel'e ekle
- [ ] Build ayarları: `npm run build`
- [ ] Serverless functions otomatik algılanacak (api/ klasörü)

### 7.3 İlk Admin Kullanıcı
- [ ] Seed script ile ilk admin kullanıcı oluştur
- [ ] Varsayılan şifre belirleme ve değiştirme mekanizması

---

## Dosya Yapısı (Final)

```
guvenlik-dijital-gelecek/
├── api/                              # Vercel Serverless Functions
│   ├── auth/login.ts
│   ├── auth/me.ts
│   ├── courses/index.ts
│   ├── courses/[id].ts
│   ├── courses/create.ts
│   ├── announcements/index.ts
│   ├── announcements/[id].ts
│   ├── announcements/create.ts
│   ├── contact/index.ts
│   ├── upload/index.ts
│   └── _lib/                         # Paylaşılan backend kodu
│       ├── mongodb.ts
│       ├── cloudinary.ts
│       ├── auth.ts
│       └── models/
│           ├── User.ts
│           ├── Course.ts
│           ├── Announcement.ts
│           └── ContactMessage.ts
├── public/
├── src/
│   ├── components/
│   │   ├── ui/                       # shadcn/ui (mevcut)
│   │   ├── admin/                    # Admin bileşenleri (YENİ)
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CourseCard.tsx            # YENİ (tekrar kullanılabilir)
│   │   ├── AnnouncementCard.tsx      # YENİ
│   │   ├── FeaturedCourses.tsx
│   │   ├── LatestAnnouncements.tsx   # YENİ
│   │   ├── ContactCTA.tsx
│   │   └── Testimonials.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx           # YENİ
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── use-auth.ts              # YENİ
│   │   ├── use-courses.ts           # YENİ (React Query)
│   │   └── use-announcements.ts     # YENİ (React Query)
│   ├── lib/
│   │   ├── utils.ts
│   │   └── api.ts                   # YENİ (API client)
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── AboutPage.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── AnnouncementsPage.tsx     # YENİ
│   │   ├── ContactPage.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/                    # YENİ
│   │       ├── LoginPage.tsx
│   │       ├── DashboardPage.tsx
│   │       ├── CoursesManagePage.tsx
│   │       ├── AnnouncementsManagePage.tsx
│   │       └── MessagesPage.tsx
│   ├── types/
│   │   └── index.ts                  # YENİ (TypeScript tipleri)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vercel.json                       # Vercel yapılandırması
├── .env.local                        # Ortam değişkenleri
├── package.json
└── ...
```

---

## Uygulama Sırası ve Tahmini Süre

| Faz | Görev | Tahmini Süre |
|-----|-------|-------------|
| 1 | Mevcut kodu optimize et | ~1 saat |
| 2 | MongoDB Atlas + Backend API | ~2-3 saat |
| 3 | Cloudinary entegrasyonu | ~30 dakika |
| 4 | Authentication sistemi | ~1 saat |
| 5 | Admin paneli (tüm sayfalar) | ~3-4 saat |
| 6 | Public duyurular sayfası | ~1 saat |
| 7 | Deploy ve test | ~1 saat |

**Toplam Tahmini Süre: ~10-11 saat**

---

## Yeni Bağımlılıklar

**Frontend:**
- `react-helmet-async` — SEO meta tag yönetimi
- `@tiptap/react` — Zengin metin editörü (duyurular için)
- `axios` — HTTP client (API istekleri)

**Backend (api/ klasörü):**
- `mongoose` — MongoDB ODM
- `bcryptjs` — Şifre hashleme
- `jsonwebtoken` — JWT token yönetimi
- `cloudinary` — Görsel yükleme API
- `multer` — Dosya upload middleware

---

## Notlar

- MongoDB Atlas Free Tier: 512MB depolama, paylaşımlı cluster — küçük/orta projeler için yeterli
- Cloudinary Free Tier: 25GB depolama, aylık 25GB bandwidth — bu proje için fazlasıyla yeterli
- Vercel Free Tier: Aylık 100GB bandwidth, serverless function desteği
- İlk admin kullanıcı seed script ile oluşturulacak
- Tüm API istekleri CORS korumalı olacak
- Hassas bilgiler (JWT secret, DB URI vb.) ortam değişkenlerinde saklanacak
