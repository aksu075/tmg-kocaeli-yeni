import { Link } from "react-router-dom";
import { Phone, Stethoscope, BookOpen, PenLine, IdCard, ChevronRight } from "lucide-react";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite, telBaglanti } from "@/data/icerik";

// İlk kez özel güvenlik görevlisi olacak adayın izleyeceği yol
const BesAdim = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();

  const adimlar = [
    {
      ikon: <Phone size={20} />,
      baslik: "Arayın",
      metin: "Yaşınızı, mezuniyetinizi ve varsa adli sicil kaydınızı söyleyin; başvurabilir misiniz, yeni dönem ne zaman başlıyor, hemen öğrenin.",
      baglanti: { yazi: site.telefon1, href: telBaglanti(site.telefon1) },
    },
    {
      ikon: <Stethoscope size={20} />,
      baslik: "Sağlık raporu",
      metin: "Devlet hastanesinden \"özel güvenlik görevlisi olur\" ibareli sağlık kurulu raporu alın.",
      baglanti: { yazi: "Başvuru şartları", to: "/basvuru-sartlari" },
    },
    {
      ikon: <BookOpen size={20} />,
      baslik: "Kayıt ve eğitim",
      metin: "Raporunuz ve evraklarınızla kurumumuza gelin, kaydınızı yapalım. Silahsız eğitim 100, silahlı eğitim 120 saattir.",
      baglanti: { yazi: "Kurslar", to: "/kurslar" },
    },
    {
      ikon: <PenLine size={20} />,
      baslik: "Sınav",
      metin: "Emniyet Genel Müdürlüğü'nün yaptığı yazılı sınava girin. Silahlı adaylar ayrıca atış sınavına girer.",
      baglanti: { yazi: "Puan hesaplama", to: "/puan-hesaplama" },
    },
    {
      ikon: <IdCard size={20} />,
      baslik: "Kimlik kartı",
      metin: "Sınavı geçince kimlik kartı başvurunuzu e-Devlet'ten yapın. Kart beş yıl geçerlidir.",
      baglanti: { yazi: "Toplam maliyet", to: "/ucretler" },
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nasıl başlarım?</span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">İlk telefondan kimlik kartına beş adım</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            İlk kez özel güvenlik görevlisi olacak bir adayın izleyeceği yol. Sağlık raporuna para vermeden önce şartları taşıdığınızdan
            emin olun.
          </p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {adimlar.map((a, i) => (
            <li key={a.baslik} className="relative flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <span className="absolute top-4 right-5 text-3xl font-bold text-gray-200">{i + 1}</span>
              <div className="w-10 h-10 rounded-lg bg-tmg-primary text-white flex items-center justify-center mb-4">{a.ikon}</div>
              <h3 className="font-bold text-tmg-dark mb-1.5">{a.baslik}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{a.metin}</p>
              {"to" in a.baglanti ? (
                <Link to={a.baglanti.to!} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tmg-secondary hover:underline">
                  {a.baglanti.yazi} <ChevronRight size={15} />
                </Link>
              ) : (
                <a href={a.baglanti.href} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-tmg-secondary hover:underline">
                  <Phone size={14} /> {a.baglanti.yazi}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BesAdim;
