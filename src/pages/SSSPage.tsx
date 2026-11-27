import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSSS, useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSSS, varsayilanSite, telBaglanti } from "@/data/icerik";

const SSSPage = () => {
  const { data: sss = varsayilanSSS } = useSSS();
  const { data: site = varsayilanSite } = useSiteBilgileri();
  const sorular = (sss.sorular || []).filter((s) => s.soru && s.cevap);
  useSayfa(
    "Sık Sorulan Sorular",
    "Özel güvenlik eğitimi, sınav, puan, sınav hakkı, kimlik kartı ve yenileme hakkında en çok sorulan soruların cevapları."
  );

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

  return (
    <Layout>
      <SayfaBaslik
        ikon={<HelpCircle size={16} />}
        etiket="Merak edilenler"
        baslik="Sık Sorulan Sorular"
        aciklama="Eğitim, sınav ve kimlik kartı hakkında en çok sorulan sorular."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="single" collapsible className="bg-white rounded-2xl border border-gray-100 px-6">
            {sorular.map((s, i) => (
              <AccordionItem key={i} value={`s${i}`} className={i === sorular.length - 1 ? "border-b-0" : ""}>
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
    </Layout>
  );
};

export default SSSPage;
