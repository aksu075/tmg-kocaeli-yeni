import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { lazy, Suspense } from "react";

// Main Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import ContactPage from "./pages/ContactPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import NotFound from "./pages/NotFound";
import UcretlerPage from "./pages/UcretlerPage";
import SinavTakvimiPage from "./pages/SinavTakvimiPage";
import SSSPage from "./pages/SSSPage";
import KvkkPage from "./pages/KvkkPage";

// Admin Pages (lazy loaded)
const LoginPage = lazy(() => import("./pages/admin/LoginPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const CoursesManagePage = lazy(() => import("./pages/admin/CoursesManagePage"));
const AnnouncementsManagePage = lazy(() => import("./pages/admin/AnnouncementsManagePage"));
const MessagesPage = lazy(() => import("./pages/admin/MessagesPage"));
const TakvimYonetPage = lazy(() => import("./pages/admin/TakvimYonetPage"));
const HarclarYonetPage = lazy(() => import("./pages/admin/HarclarYonetPage"));
const SSSYonetPage = lazy(() => import("./pages/admin/SSSYonetPage"));
const SiteBilgileriPage = lazy(() => import("./pages/admin/SiteBilgileriPage"));
const SifrePage = lazy(() => import("./pages/admin/SifrePage"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tmg-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="/kurslar" element={<CoursesPage />} />
              <Route path="/duyurular" element={<AnnouncementsPage />} />
              <Route path="/iletisim" element={<ContactPage />} />

              <Route path="/ucretler" element={<UcretlerPage />} />
              <Route path="/sinav-takvimi" element={<SinavTakvimiPage />} />
              <Route path="/sss" element={<SSSPage />} />
              <Route path="/kvkk" element={<KvkkPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/kurslar"
                element={
                  <ProtectedRoute>
                    <CoursesManagePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/duyurular"
                element={
                  <ProtectedRoute>
                    <AnnouncementsManagePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/mesajlar"
                element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/sinav-takvimi"
                element={
                  <ProtectedRoute>
                    <TakvimYonetPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/harclar"
                element={
                  <ProtectedRoute>
                    <HarclarYonetPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/sss"
                element={
                  <ProtectedRoute>
                    <SSSYonetPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/site-bilgileri"
                element={
                  <ProtectedRoute>
                    <SiteBilgileriPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/sifre"
                element={
                  <ProtectedRoute>
                    <SifrePage />
                  </ProtectedRoute>
                }
              />

              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
