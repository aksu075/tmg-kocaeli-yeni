import { Link } from "react-router-dom";
import { Wallet, Info } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { useCourses } from "@/hooks/use-courses";
import { useHarclar } from "@/hooks/use-icerik";
import { varsayilanHarclar } from "@/data/icerik";

const tl = (n: number) => `${Number(n || 0).toLocaleString("tr-TR")} TL`;

const UcretlerPage = () => {
  const { data: courses = [] } = useCourses();
  const { data: harclar = varsayilanHarclar } = useHarclar();
  useSayfa(
    "Kurs Ücretleri ve Harçlar",
    `Özel güvenlik kurs ücretleri ve ${harclar.yil} yılı devlet harçları: sağlık raporu, sınav ücreti, vergi dairesi harcı ve kimlik kartı ücreti.`
  );

  const kalemler = harclar.kalemler || [];
  const toplamSZ = kalemler.reduce((t, k) => t + Number(k.silahsiz || 0), 0);
  const toplamSL = kalemler.reduce((t, k) => t + Number(k.silahli || 0), 0);
  const yenileme = kalemler.filter((k) => k.yenilemede);

  return (
    <Layout>
      <SayfaBaslik
        ikon={<Wallet size={16} />}
        etiket={`${harclar.yil} yılı tutarları`}
        baslik="Ücretler ve Harçlar"
        aciklama="Kurs ücreti kurumumuza, harçlar devlete ödenir. Özel güvenlik görevlisi olmanın toplam maliyetini aşağıda görebilirsiniz."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          {/* Kurs ücretleri */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-tmg-dark mb-1">Kurs ücretleri</h2>
            <p className="text-gray-500 text-sm mb-6">Eğitim için kurumumuza ödenen tutar. Devlet harçları dahil değildir.</p>
            <ul className="divide-y divide-gray-100">
              {courses.map((c) => (
                <li key={c._id || c.id} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-semibold text-tmg-dark">{c.title}</p>
                    <p className="text-sm text-gray-500">{c.duration}</p>
                  </div>
                  <p className="text-lg font-bold text-tmg-primary whitespace-nowrap">
                    {typeof c.price === "number" ? tl(c.price) : c.price}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Eğitimlerin ayrıntıları için <Link to="/kurslar" className="text-tmg-secondary font-semibold hover:underline">Kurslar</Link> sayfasına bakın.
            </p>
          </div>

          {/* Devlet harçları */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-tmg-dark mb-1">Devlete ödenen harç ve ücretler ({harclar.yil})</h2>
            <p className="text-gray-500 text-sm mb-6">{harclar.not}</p>

            <div className="hidden md:grid grid-cols-[1fr_8rem_8rem] gap-4 pb-2 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 font-semibold">
              <span>Kalem</span>
              <span className="text-right">Silahsız</span>
              <span className="text-right">Silahlı</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {kalemler.map((k, i) => (
                <li key={i} className="py-4 md:grid md:grid-cols-[1fr_8rem_8rem] md:gap-4 md:items-start">
                  <div>
                    <p className="font-semibold text-tmg-dark">{k.ad}</p>
                    <p className="text-sm text-gray-500">
                      {k.nereye}
                      {k.aciklama ? ` · ${k.aciklama}` : ""}
                    </p>
                  </div>
                  <p className="mt-2 md:mt-0 md:text-right text-sm md:text-base">
                    <span className="md:hidden text-gray-400">Silahsız: </span>
                    <b className="text-tmg-dark">{tl(k.silahsiz)}</b>
                  </p>
                  <p className="md:text-right text-sm md:text-base">
                    <span className="md:hidden text-gray-400">Silahlı: </span>
                    <b className="text-tmg-dark">{tl(k.silahli)}</b>
                  </p>
                </li>
              ))}
              <li className="py-4 md:grid md:grid-cols-[1fr_8rem_8rem] md:gap-4 bg-tmg-primary/5 -mx-3 px-3 rounded-lg">
                <p className="font-bold text-tmg-dark">Devlete ödenen toplam</p>
                <p className="mt-2 md:mt-0 md:text-right">
                  <span className="md:hidden text-gray-500">Silahsız: </span>
                  <b className="text-tmg-primary">{tl(toplamSZ)}</b>
                </p>
                <p className="md:text-right">
                  <span className="md:hidden text-gray-500">Silahlı: </span>
                  <b className="text-tmg-primary">{tl(toplamSL)}</b>
                </p>
              </li>
            </ul>

            {yenileme.length > 0 && (
              <div className="mt-6 flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-gray-700">
                <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p>
                  <b>Yenileme eğitiminde</b> yalnızca {yenileme.map((k) => k.ad.toLocaleLowerCase("tr-TR")).join(" ve ")} ödenir: silahsız{" "}
                  {tl(yenileme.reduce((t, k) => t + Number(k.silahsiz || 0), 0))}, silahlı{" "}
                  {tl(yenileme.reduce((t, k) => t + Number(k.silahli || 0), 0))}.
                </p>
              </div>
            )}

            {harclar.gecerlilik && (
              <p className="text-sm text-gray-500 mt-4">
                Bu tutarlar <b>{harclar.gecerlilik}</b> tarihine kadar geçerlidir. Güncel tutarı kayıt sırasında kurumumuzdan teyit edin.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UcretlerPage;
