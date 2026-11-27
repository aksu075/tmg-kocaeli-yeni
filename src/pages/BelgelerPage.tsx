import { FileText, Download, CalendarCheck, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { dilekceler, RANDEVU_ADRESI, KIMLIK_BASVURU_ADRESI } from "@/data/icerik";

const BelgelerPage = () => {
  useSayfa(
    "Belge ve Dilekçeler",
    "Özel güvenlik temel eğitim, yenileme ve kimlik kartı dilekçe örnekleri; Kocaeli Emniyet özel güvenlik randevusu."
  );

  return (
    <Layout>
      <SayfaBaslik
        ikon={<FileText size={16} />}
        etiket="Kocaeli İl Emniyet Müdürlüğü"
        baslik="Belge ve Dilekçeler"
        aciklama="Emniyete vereceğiniz dilekçelerin örnekleri. Dosyalar Kocaeli İl Emniyet Müdürlüğü'nün kendi sitesinden iner."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dilekceler.map((d) => (
              <a
                key={d.adres}
                href={d.adres}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-gray-100 p-6 flex gap-4 hover:border-tmg-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-tmg-primary/10 text-tmg-primary flex items-center justify-center flex-shrink-0">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-tmg-dark mb-1">{d.baslik}</h2>
                  <p className="text-sm text-gray-500 mb-3">{d.aciklama}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tmg-secondary group-hover:underline">
                    <Download size={15} /> Word dosyasını indir
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-bold text-tmg-dark mb-2 flex items-center gap-2">
                <CalendarCheck size={20} className="text-tmg-primary" /> Emniyet randevusu
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Dilekçe ve evrak teslimi gibi özel güvenlik işlemleri için Kocaeli İl Emniyet Müdürlüğü'nden online randevu alabilirsiniz.
              </p>
              <a href={RANDEVU_ADRESI} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-tmg-secondary hover:underline">
                Randevu al <ExternalLink size={14} />
              </a>
            </div>
            <div>
              <h2 className="text-lg font-bold text-tmg-dark mb-2 flex items-center gap-2">
                <FileText size={20} className="text-tmg-primary" /> Kimlik kartı başvurusu
              </h2>
              <p className="text-sm text-gray-600 mb-3">Sınavı geçtikten sonra kimlik kartı başvurusu e-Devlet üzerinden yapılır.</p>
              <a href={KIMLIK_BASVURU_ADRESI} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-tmg-secondary hover:underline">
                e-Devlet'e git <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Hangi dilekçeyi vermeniz gerektiğinden emin değilseniz bizi arayın.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default BelgelerPage;
