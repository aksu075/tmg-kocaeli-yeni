import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite, telBaglanti } from "@/data/icerik";

const Footer = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();
  return (
    <footer className="bg-gray-900 text-white">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-tmg-primary via-tmg-secondary to-tmg-accent"></div>

      {/* Main Footer */}
      <div className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div>
              <div className="mb-5">
                <img
                  src="/logo.png"
                  alt="TMG Güvenlik Eğitim Kurumu"
                  width={210}
                  height={56}
                  className="h-14 w-auto bg-white p-1.5 rounded-lg"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Özel güvenlik sektöründe profesyonel hizmet veren TMG, güvenlik
                eğitiminde öncü kurumdur. İçişleri Bakanlığı onaylı sertifika
                programları sunuyoruz.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Eğitim ve Sınav
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/kurslar", label: "Kurslar" },
                  { to: "/ucretler", label: "Ücretler ve Harçlar" },
                  { to: "/sinav-takvimi", label: "Sınav Takvimi ve Sonuçlar" },
                  { to: "/sss", label: "Sık Sorulan Sorular" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
                Hızlı Bağlantılar
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Ana Sayfa" },
                  { to: "/hakkimizda", label: "Hakkımızda" },
                  { to: "/kurslar", label: "Kurslar" },
                  { to: "/duyurular", label: "Duyurular" },
                  { to: "/iletisim", label: "İletişim" },
                  { to: "/kvkk", label: "KVKK Aydınlatma Metni" },
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">
                İletişim
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 flex-shrink-0 text-tmg-secondary"
                  />
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {[site.adres1, site.adres2, site.adres3].filter(Boolean).join(" ")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    size={18}
                    className="flex-shrink-0 text-tmg-secondary"
                  />
                  <a
                    href={`mailto:${site.eposta}`}
                    className="text-gray-400 text-sm hover:text-white transition-colors break-all"
                  >
                    {site.eposta}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    size={18}
                    className="flex-shrink-0 text-tmg-secondary"
                  />
                  <div className="flex flex-col">
                    {[site.telefon1, site.telefon2].filter(Boolean).map((no) => (
                      <a key={no} href={telBaglanti(no)} className="text-gray-400 text-sm hover:text-white transition-colors">
                        {no}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TMG Güvenlik Eğitim Kurumu. Tüm
            hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
