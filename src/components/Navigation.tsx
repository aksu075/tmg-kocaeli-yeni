import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite, telBaglanti } from "@/data/icerik";

const navItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/kurslar", label: "Kurslar" },
  { to: "/ucretler", label: "Ücretler" },
  { to: "/sinav-takvimi", label: "Sınav Takvimi" },
  { to: "/duyurular", label: "Duyurular" },
  { to: "/#sss", label: "SSS" },
  { to: "/iletisim", label: "İletişim" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: site = varsayilanSite } = useSiteBilgileri();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path.includes("#")) return location.pathname + location.hash === path;
    if (path === "/") return location.pathname === "/" && location.hash !== "#sss";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
          : "bg-white shadow-sm"
      )}
    >
      {/* Top bar */}
      <div className="bg-tmg-dark text-white">
        <div className="container mx-auto px-4 py-1.5 flex justify-end items-center">
          <a
            href={telBaglanti(site.telefon1)}
            className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
          >
            <Phone size={13} />
            <span>{site.telefon1}</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="TMG Güvenlik Eğitim Kurumu"
              width={180}
              height={48}
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300",
                  isActive(item.to)
                    ? "text-tmg-primary bg-tmg-primary/5"
                    : "text-gray-600 hover:text-tmg-primary hover:bg-gray-50"
                )}
              >
                {item.label}
                {isActive(item.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-tmg-secondary rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/iletisim"
              className="ml-2 whitespace-nowrap bg-tmg-secondary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-tmg-secondary/90 transition-all duration-300 hover:shadow-md hover:shadow-tmg-secondary/20"
            >
              Kayıt Ol
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Menü"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-1"
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-[40rem] opacity-100 mt-3" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col space-y-1 pb-4 border-t border-gray-100 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={toggleMenu}
                className={cn(
                  "flex items-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(item.to)
                    ? "text-tmg-primary bg-tmg-primary/5"
                    : "text-gray-600 hover:text-tmg-primary hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/iletisim"
              onClick={toggleMenu}
              className="mt-2 bg-tmg-secondary text-white text-center py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-tmg-secondary/90 transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
