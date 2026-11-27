import { CalendarDays, ExternalLink, Search } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { useTakvim } from "@/hooks/use-icerik";
import { varsayilanTakvim, SINAV_SONUC_ADRESI, KIMLIK_BASVURU_ADRESI } from "@/data/icerik";
import { cn } from "@/lib/utils";

const tarihYaz = (t: string) => {
  const d = new Date(t + "T12:00:00");
  return isNaN(d.getTime()) ? t : d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" });
};

const SinavTakvimiPage = () => {
  const { data: takvim = varsayilanTakvim } = useTakvim();
  const yillar = [...(takvim.yillar || [])].sort((a, b) => b.yil.localeCompare(a.yil));
  useSayfa(
    "Özel Güvenlik Sınav Takvimi",
    "Özel güvenlik temel eğitim ve yenileme sınavlarının tarihleri, sınav sonucu sorgulama ve sınavdan sonra yapılacaklar."
  );

  // Bugünden sonraki ilk sınav
  const bugun = new Date().toISOString().slice(0, 10);
  const siradaki = yillar
    .flatMap((y) => y.sinavlar || [])
    .map((s) => s.tarih)
    .filter((t) => t >= bugun)
    .sort()[0];

  return (
    <Layout>
      <SayfaBaslik
        ikon={<CalendarDays size={16} />}
        etiket="Emniyet Genel Müdürlüğü takvimi"
        baslik="Sınav Takvimi"
        aciklama="Temel eğitim ve yenileme sınavları aynı gün yapılır. Tarihleri Emniyet Genel Müdürlüğü belirler."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          {yillar.map((y) => (
            <div key={y.yil} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-tmg-dark mb-6">{y.yil} sınav tarihleri</h2>
              {!(y.sinavlar || []).length && (
                <p className="text-gray-600">
                  {y.yil} sınav takvimi Emniyet Genel Müdürlüğü tarafından henüz açıklanmadı. Açıklandığında tarihleri burada
                  yayınlayacağız.
                </p>
              )}
              <ul className="divide-y divide-gray-100">
                {[...(y.sinavlar || [])]
                  .sort((a, b) => a.tarih.localeCompare(b.tarih))
                  .map((s, i) => {
                    const gecti = s.tarih < bugun;
                    const sira = s.tarih === siradaki;
                    return (
                      <li
                        key={i}
                        className={cn(
                          "py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4",
                          sira && "bg-tmg-primary/5 -mx-3 px-3 rounded-lg",
                          gecti && "text-gray-400"
                        )}
                      >
                        <div>
                          <p className={cn("font-semibold", gecti ? "text-gray-400" : "text-tmg-dark")}>{tarihYaz(s.tarih)}</p>
                          <p className="text-sm">{[s.temel, s.yenileme].filter(Boolean).join(" ve ")} sınavı</p>
                        </div>
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider",
                            sira ? "text-tmg-secondary" : gecti ? "text-gray-400" : "text-gray-500"
                          )}
                        >
                          {sira ? "Sıradaki sınav" : gecti ? "Yapıldı" : ""}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
          {takvim.not && <p className="text-sm text-gray-500 -mt-4">{takvim.not}</p>}

          {/* Sonuç sorgulama */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <Search size={18} />
              </div>
              <h2 className="text-2xl font-bold text-tmg-dark">Sınav sonucu ve sonrası</h2>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600 mb-6">
              <li>Sonucunuzu T.C. kimlik numaranızla Emniyet'in sınav sonucu sorgulama sayfasından öğrenin.</li>
              <li>Geçtiyseniz kimlik kartı başvurunuzu e-Devlet üzerinden yapın.</li>
              <li>Kalırsanız bir sonraki sınava yeniden başvurabilirsiniz; eğitimi tamamladıktan sonraki ilk altı sınava girme hakkınız vardır.</li>
            </ol>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={SINAV_SONUC_ADRESI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-tmg-secondary text-white px-5 py-3 rounded-lg font-medium hover:bg-tmg-secondary/90 transition-colors"
              >
                Sınav sonucu sorgula <ExternalLink size={16} />
              </a>
              <a
                href={KIMLIK_BASVURU_ADRESI}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-tmg-dark px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                e-Devlet kimlik kartı başvurusu <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SinavTakvimiPage;
