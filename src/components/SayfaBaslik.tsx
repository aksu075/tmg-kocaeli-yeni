import { ReactNode, useEffect } from "react";

// Sayfanın tarayıcı başlığını ve Google açıklamasını ayarlar.
export const useSayfa = (baslik: string, aciklama: string) => {
  useEffect(() => {
    document.title = `${baslik} | TMG Güvenlik Eğitim Kurumu`;
    const meta = document.querySelector('meta[name="description"]');
    const eski = meta?.getAttribute("content") || "";
    if (meta) meta.setAttribute("content", aciklama);
    return () => {
      if (meta) meta.setAttribute("content", eski);
    };
  }, [baslik, aciklama]);
};

interface Props {
  ikon: ReactNode;
  etiket: string;
  baslik: string;
  aciklama: string;
}

// Diğer sayfalardaki koyu mavi başlık alanıyla aynı görünüm
const SayfaBaslik = ({ ikon, etiket, baslik, aciklama }: Props) => (
  <section className="relative bg-tmg-dark text-white overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark/95 via-tmg-primary/90 to-tmg-dark/85"></div>
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    ></div>
    <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5">
          <span className="text-tmg-accent">{ikon}</span>
          <span className="text-sm font-medium text-white/90">{etiket}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{baslik}</h1>
        <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">{aciklama}</p>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
  </section>
);

export default SayfaBaslik;
