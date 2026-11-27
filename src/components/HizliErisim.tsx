import { Link } from "react-router-dom";
import { Search, Calculator, ClipboardCheck, CalendarDays, FileText, CalendarCheck, IdCard, Wallet, HelpCircle, ChevronRight, ExternalLink } from "lucide-react";
import { useTakvim } from "@/hooks/use-icerik";
import { varsayilanTakvim, SINAV_SONUC_ADRESI, RANDEVU_ADRESI, KIMLIK_BASVURU_ADRESI } from "@/data/icerik";

interface Kutu {
  ikon: JSX.Element;
  baslik: string;
  alt: string;
  to?: string; // site içi sayfa
  href?: string; // dış site (yeni sekmede açılır)
}

// Ana sayfada adayların en çok aradığı işlemlere kısa yol
const HizliErisim = () => {
  const { data: takvim = varsayilanTakvim } = useTakvim();
  const buYil = String(new Date().getFullYear());
  const takvimYili = (takvim.yillar || []).some((y) => y.yil === buYil) ? buYil : takvim.yillar?.[0]?.yil || buYil;

  const kutular: Kutu[] = [
    { ikon: <Search size={22} />, baslik: "Sınav Sonuçları", alt: "EGM sonuç sorgulama", href: SINAV_SONUC_ADRESI },
    { ikon: <Calculator size={22} />, baslik: "Puan Hesaplama", alt: "Kaç puan aldım?", to: "/puan-hesaplama" },
    { ikon: <ClipboardCheck size={22} />, baslik: "Başvuru Şartları", alt: "Kimler başvurabilir?", to: "/basvuru-sartlari" },
    { ikon: <CalendarDays size={22} />, baslik: "Sınav Takvimi", alt: `${takvimYili} sınav tarihleri`, to: "/sinav-takvimi" },
    { ikon: <FileText size={22} />, baslik: "Belge ve Dilekçeler", alt: "Dilekçe örnekleri", to: "/belge-ve-dilekceler" },
    { ikon: <CalendarCheck size={22} />, baslik: "Randevu Al", alt: "Kocaeli Emniyet özel güvenlik işlemleri", href: RANDEVU_ADRESI },
    { ikon: <IdCard size={22} />, baslik: "Kimlik Kartı İşlemleri", alt: "e-Devlet başvurusu", href: KIMLIK_BASVURU_ADRESI },
    { ikon: <Wallet size={22} />, baslik: "Ücretler ve Harçlar", alt: "Toplam maliyet", to: "/ucretler" },
    { ikon: <HelpCircle size={22} />, baslik: "Sık Sorulan Sorular", alt: "Merak edilenler", to: "/#sss" },
  ];

  const icerik = (k: Kutu) => (
    <>
      <div className="w-12 h-12 rounded-xl bg-tmg-primary/10 text-tmg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-tmg-primary group-hover:text-white transition-colors duration-300">
        {k.ikon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-tmg-dark leading-snug">{k.baslik}</h3>
        <p className="text-sm text-gray-500 leading-snug">{k.alt}</p>
      </div>
      {k.href ? (
        <ExternalLink size={16} className="text-gray-300 group-hover:text-tmg-secondary flex-shrink-0" />
      ) : (
        <ChevronRight size={18} className="text-gray-300 group-hover:text-tmg-secondary group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
      )}
    </>
  );

  const sinif =
    "group flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-tmg-primary/30 hover:-translate-y-0.5 transition-all duration-300";

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Hızlı Erişim</span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">Aradığınız İşlem</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {kutular.map((k) =>
            k.href ? (
              <a key={k.baslik} href={k.href} target="_blank" rel="noopener noreferrer" className={sinif}>
                {icerik(k)}
              </a>
            ) : (
              <Link key={k.baslik} to={k.to!} className={sinif}>
                {icerik(k)}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HizliErisim;
