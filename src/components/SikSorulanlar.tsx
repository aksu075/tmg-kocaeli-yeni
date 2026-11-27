import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useSSS, useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSSS, varsayilanSite, telBaglanti } from "@/data/icerik";

// Ana sayfadaki "Sık Sorulan Sorular" bölümü: ilk 5 soru görünür, kalanı düğmeyle açılır.
// Sorular yönetim panelindeki "Sık Sorulan Sorular" ekranından gelir.
const ILK_GORUNEN = 5;

const SikSorulanlar = () => {
  const { data: sss = varsayilanSSS } = useSSS();
  const { data: site = varsayilanSite } = useSiteBilgileri();
  const [tumu, setTumu] = useState(false);
  const sorular = (sss.sorular || []).filter((s) => s.soru && s.cevap);
  const gorunen = tumu ? sorular : sorular.slice(0, ILK_GORUNEN);

  // Google için soru-cevap işaretlemesi
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: sorular.map((s) => ({ "@type": "Question", name: s.soru, acceptedAnswer: { "@type": "Answer", text: s.cevap } })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, [JSON.stringify(sorular)]); // eslint-disable-line react-hooks/exhaustive-deps

  if (sorular.length === 0) return null;

  return (
    <section id="sss" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Merak Edilenler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">Sık Sorulan Sorular</h2>
          <p className="text-lg text-gray-500">Eğitim, sınav ve kimlik kartı hakkında en çok sorulan sorular.</p>
        </div>

        <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-100 px-6">
          {gorunen.map((s, i) => (
            <AccordionItem key={i} value={`s${i}`} className={i === gorunen.length - 1 ? "border-b-0" : ""}>
              <AccordionTrigger className="text-left font-semibold text-tmg-dark hover:no-underline">{s.soru}</AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed text-[15px]">
                {s.cevap.split("\n").map((p, j) => (
                  <p key={j} className={j > 0 ? "mt-2" : ""}>
                    {p}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {sorular.length > ILK_GORUNEN && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setTumu(!tumu)}
              className="border-tmg-primary text-tmg-primary hover:bg-tmg-primary hover:text-white rounded-lg"
            >
              {tumu ? (
                <>
                  Daha az göster <ChevronUp size={18} className="ml-1" />
                </>
              ) : (
                <>
                  Tüm soruları gör ({sorular.length}) <ChevronDown size={18} className="ml-1" />
                </>
              )}
            </Button>
          </div>
        )}

        <p className="text-center text-gray-500 mt-8">
          Aradığınızı bulamadıysanız{" "}
          <a href={telBaglanti(site.telefon1)} className="text-tmg-secondary font-semibold hover:underline">
            {site.telefon1}
          </a>{" "}
          numarasından bizi arayın ya da{" "}
          <Link to="/iletisim" className="text-tmg-secondary font-semibold hover:underline">
            mesaj gönderin
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default SikSorulanlar;
