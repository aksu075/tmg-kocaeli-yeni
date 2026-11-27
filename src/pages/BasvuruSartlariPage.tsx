import { Link } from "react-router-dom";
import { ClipboardCheck, CheckCircle2, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";

const kartlar = [
  { baslik: "Yaş", silahsiz: "18", silahli: "21", not: "Belirtilen yaşı doldurmuş olmak gerekir. Üst yaş sınırı yoktur." },
  { baslik: "Öğrenim", silahsiz: "Ortaokul", silahli: "Lise", not: "Ortaokul, sekiz yıllık ilköğretim demektir. Lise dengi okullar da geçerlidir." },
];

const digerSartlar = [
  "Türkiye Cumhuriyeti vatandaşı olmak",
  "Devlet hastanesinden alınmış, özel güvenlik görevlisi olmaya engel bulunmadığını gösteren sağlık kurulu raporu",
  "Adli sicil engeli bulunmamak (ayrıntı aşağıda)",
  "Güvenlik soruşturmasının olumlu sonuçlanması",
];

const engelSuclar = [
  "Devletin güvenliğine karşı suçlar",
  "Anayasal düzene ve bu düzenin işleyişine karşı suçlar",
  "Özel hayata ve hayatın gizli alanına karşı suçlar",
  "Cinsel dokunulmazlığa karşı suçlar",
  "Uyuşturucu veya uyarıcı madde suçları",
  "Zimmet, irtikâp, rüşvet",
  "Hırsızlık, dolandırıcılık, sahtecilik",
  "Güveni kötüye kullanma, hileli iflas",
  "İhaleye fesat karıştırma, edimin ifasına fesat karıştırma",
  "Suçtan kaynaklanan malvarlığı değerlerini aklama",
  "Kaçakçılık",
];

const BasvuruSartlariPage = () => {
  useSayfa(
    "Başvuru Şartları",
    "Özel güvenlik görevlisi olma şartları: yaş, öğrenim durumu, sağlık raporu ve adli sicil engelleri. Silahlı ve silahsız farkları."
  );

  return (
    <Layout>
      <SayfaBaslik
        ikon={<ClipboardCheck size={16} />}
        etiket="5188 sayılı Kanun'a göre"
        baslik="Başvuru Şartları"
        aciklama="Özel güvenlik görevlisi olmak için aranan şartlar. Silahsız için 18 yaş ve ortaokul, silahlı için 21 yaş ve lise."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kartlar.map((k) => (
              <div key={k.baslik} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-tmg-dark mb-4">{k.baslik}</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl bg-tmg-primary/5 p-3 text-center">
                    <p className="text-2xl font-bold text-tmg-primary">{k.silahsiz}</p>
                    <p className="text-xs text-gray-500">Silahsız</p>
                  </div>
                  <div className="rounded-xl bg-tmg-secondary/5 p-3 text-center">
                    <p className="text-2xl font-bold text-tmg-secondary">{k.silahli}</p>
                    <p className="text-xs text-gray-500">Silahlı</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{k.not}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-tmg-dark mb-5">Diğer şartlar</h2>
            <ul className="space-y-3">
              {digerSartlar.map((s) => (
                <li key={s} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-tmg-dark mb-2">Hangi durumlar engel olur?</h2>
            <p className="text-gray-600 mb-5">
              Her sabıka kaydı engel değildir. Kasten işlenen bir suçtan bir yıl veya daha fazla hapis cezası almak engeldir.
              Aşağıdaki suçlar ise affa uğramış olsa bile engel sayılır:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {engelSuclar.map((s) => (
                <li key={s} className="flex items-start gap-3 text-gray-600 text-sm">
                  <XCircle size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 mt-5">
              Emin değilseniz adli sicil kaydınızı e-Devlet'ten alıp bizi arayın; sağlık raporuna para vermeden önce başvurup başvuramayacağınızı birlikte bakalım.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Bu bilgiler 5188 sayılı Özel Güvenlik Hizmetlerine Dair Kanun esas alınarak hazırlanmıştır. Mevzuat değişebileceği için başvurudan önce kurumumuzdan teyit edin.
            Eğitimlerin süre ve ücretleri için <Link to="/kurslar" className="text-tmg-secondary font-semibold hover:underline">Kurslar</Link> sayfasına bakın.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default BasvuruSartlariPage;
