import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Megaphone,
  Mail,
  LogOut,
  Menu,
  X,
  Shield,
  CalendarDays,
  Wallet,
  HelpCircle,
  FileText,
  Settings,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/kurslar", label: "Kurslar", icon: BookOpen },
  { path: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
  { path: "/admin/mesajlar", label: "Mesajlar", icon: Mail },
  { path: "/admin/sinav-takvimi", label: "Sınav Takvimi", icon: CalendarDays },
  { path: "/admin/harclar", label: "Harçlar", icon: Wallet },
  { path: "/admin/sss", label: "Sık Sorulan Sorular", icon: HelpCircle },
  { path: "/admin/belgeler", label: "Belge ve Dilekçeler", icon: FileText },
  { path: "/admin/site-bilgileri", label: "Site Bilgileri", icon: Settings },
  { path: "/admin/sifre", label: "Şifre Değiştir", icon: KeyRound },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="bg-tmg-primary text-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/admin" className="flex items-center gap-2">
              <Shield size={24} />
              <span className="font-bold text-lg">TMG Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline">
              {user?.name || "Admin"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/10"
            >
              <LogOut size={18} />
              <span className="ml-1 hidden sm:inline">Çıkış</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 pt-16 lg:pt-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin" &&
                  location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-tmg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              );
            })}
            <hr className="my-4" />
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100"
              target="_blank"
            >
              Siteyi Gör
            </Link>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-60px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
