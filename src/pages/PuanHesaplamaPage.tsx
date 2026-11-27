import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, CheckCircle2, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SINAV_SONUC_ADRESI } from "@/data/icerik";

type Tur = "silahsiz" | "silahli" | "fark";

const turler: { deger: Tur; ad: string }[] = [
  { deger: "silahsiz", ad: "Silahsız" },
  { deger: "silahli", ad: "Silahlı" },
  { deger: "fark", ad: "Silah fark" },
];

// Boşsa ya da aralık dışındaysa null döner
const sayi = (v: string, ust: number) => {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 0 && n <= ust ? n : null;
};
const yaz = (n: number) => String(n).replace(".", ",");

interface Sonuc {
  gecti: boolean;
  satirlar: string[];
  nedenler: string[];
  ek?: string;
}

const PuanHesaplamaPage = () => {
  useSayfa(
    "Puan Hesaplama",
    "Özel güvenlik sınavı puan hesaplama: silahsız, silahlı ve silah fark sınavında doğru sayınızı yazın, puanınızı ve geçip geçmediğinizi görün."
  );
  const [tur, setTur] = useState<Tur>("silahsiz");
  const [alan, setAlan] = useState({ temel: "", onceki: "", silah: "", atis: "" });
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);
  const [hata, setHata] = useState(false);

  const degistir = (ad: keyof typeof alan) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlan({ ...alan, [ad]: e.target.value });
    setSonuc(null);
  };

  const hesapla = (e: React.FormEvent) => {
    e.preventDefault();
    setHata(false);
    if (tur === "silahsiz") {
      const p = sayi(alan.temel, 100);
      if (p === null) return setHata(true);
      setSonuc({
        gecti: p >= 60,
        satirlar: [`Puanınız: ${p} (baraj 60).`],
        nedenler: p >= 60 ? [] : [`60 puan için ${60 - p} doğru daha gerekiyordu.`],
      });
      return;
    }
    const temel = sayi(tur === "silahli" ? alan.temel : alan.onceki, 100);
    const sd = sayi(alan.silah, 25);
    const at = sayi(alan.atis, 5);
    if (temel === null || sd === null || at === null) return setHata(true);
    const sp = sd * 2 + at * 10;
    const ort = (temel + sp) / 2;
    const nedenler: string[] = [];
    if (tur === "silahli" && temel < 50) nedenler.push("Temel puan 50'nin altında.");
    if (sp < 50) nedenler.push("Silah puanı 50'nin altında.");
    if (ort < 60) nedenler.push("Ortalama 60'ın altında.");
    const gecti = nedenler.length === 0;
    let ek: string | undefined;
    if (!gecti && tur === "silahli" && temel >= 60)
      ek = "Temel puanınız 60 ve üzeri olduğu için silahsız sertifika alma hakkınız olabilir; kurumumuza danışın.";
    if (!gecti && tur === "fark")
      ek = "Mevcut silahsız kimlik kartınız bundan etkilenmez; silah sınavına yeniden girebilirsiniz.";
    setSonuc({
      gecti,
      satirlar: [
        `${tur === "silahli" ? "Temel puan" : "Önceki temel puan"}: ${temel}.`,
        `Silah puanı: ${sp} (yazılı ${sd * 2} + atış ${at * 10}).`,
        `Ortalama: ${yaz(ort)}.`,
      ],
      nedenler,
      ek,
    });
  };

  const goster = (hangi: Tur[]) => hangi.includes(tur);

  return (
    <Layout>
      <SayfaBaslik
        ikon={<Calculator size={16} />}
        etiket="Sonuç açıklanmadan önce"
        baslik="Puan Hesaplama"
        aciklama="Kaç soruyu doğru yaptığınızı yazın; puanınızı ve sınavı geçip geçmediğinizi hemen görün."
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <form onSubmit={hesapla} className="space-y-5" noValidate>
              <div>
                <p className="text-sm font-medium mb-2">Hangi sınava girdiniz?</p>
                <div className="grid grid-cols-3 gap-2">
                  {turler.map((t) => (
                    <button
                      type="button"
                      key={t.deger}
                      onClick={() => {
                        setTur(t.deger);
                        setSonuc(null);
                        setHata(false);
                      }}
                      className={`rounded-lg border py-2.5 text-sm font-semibold transition-colors ${
                        tur === t.deger
                          ? "bg-tmg-primary text-white border-tmg-primary"
                          : "bg-white text-tmg-dark border-gray-200 hover:border-tmg-primary"
                      }`}
                      aria-pressed={tur === t.deger}
                    >
                      {t.ad}
                    </button>
                  ))}
                </div>
              </div>

              {goster(["silahsiz", "silahli"]) && (
                <div>
                  <Label htmlFor="temel">Temel sınavda doğru sayınız (0–100)</Label>
                  <Input id="temel" type="number" inputMode="numeric" min={0} max={100} value={alan.temel} onChange={degistir("temel")} />
                </div>
              )}
              {goster(["fark"]) && (
                <div>
                  <Label htmlFor="onceki">Önceki temel sınav puanınız (0–100)</Label>
                  <Input id="onceki" type="number" inputMode="numeric" min={0} max={100} value={alan.onceki} onChange={degistir("onceki")} />
                </div>
              )}
              {goster(["silahli", "fark"]) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="silah">Silah sorularında doğru sayınız (0–25)</Label>
                    <Input id="silah" type="number" inputMode="numeric" min={0} max={25} value={alan.silah} onChange={degistir("silah")} />
                  </div>
                  <div>
                    <Label htmlFor="atis">Atışta isabet sayınız (0–5)</Label>
                    <Input id="atis" type="number" inputMode="numeric" min={0} max={5} value={alan.atis} onChange={degistir("atis")} />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-tmg-primary">
                Sonucu göster
              </Button>
              <p className="text-xs text-gray-500">
                Soru alanlarına puanınızı değil, doğru sayınızı yazın. Yazdıklarınız hiçbir yere gönderilmez.
              </p>
            </form>

            <div aria-live="polite">
              {hata && (
                <p className="mt-5 rounded-lg bg-red-50 text-red-700 p-4 text-sm">
                  Lütfen görünen bütün alanlara, belirtilen aralıkta tam sayı yazın.
                </p>
              )}
              {sonuc && (
                <div className={`mt-5 rounded-xl p-5 ${sonuc.gecti ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
                  <p className="flex items-center gap-2 font-bold text-lg mb-2">
                    {sonuc.gecti ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                    {sonuc.gecti ? "Bu sonuçla sınavı geçiyorsunuz." : "Bu sonuçla sınavı geçemiyorsunuz."}
                  </p>
                  {sonuc.satirlar.map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                  {sonuc.nedenler.length > 0 && (
                    <ul className="list-disc pl-5 mt-2">
                      {sonuc.nedenler.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                  {sonuc.ek && <p className="mt-2">{sonuc.ek}</p>}
                  <p className="text-xs opacity-75 mt-3">
                    Bu hesap yazdığınız sayılara göre yapılır; kesin sonuç Emniyet Genel Müdürlüğü'nün açıkladığı sonuçtur.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-tmg-dark mb-5">Puan nasıl hesaplanır?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-tmg-dark">
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4">Sınav</th>
                    <th className="py-2 pr-4">Sorular</th>
                    <th className="py-2">Geçme şartı</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 align-top">
                  <tr className="border-b border-gray-100">
                    <th className="py-3 pr-4 text-tmg-dark">Silahsız</th>
                    <td className="py-3 pr-4">100 soru; her doğru 1 puan</td>
                    <td className="py-3">En az 60 puan</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="py-3 pr-4 text-tmg-dark">Silahlı</th>
                    <td className="py-3 pr-4">Temel: 100 soru, her doğru 1 puan. Silah: 25 soru, her doğru 2 puan; 5 atış, her isabet 10 puan</td>
                    <td className="py-3">Temel en az 50, silah en az 50 ve ikisinin ortalaması en az 60</td>
                  </tr>
                  <tr>
                    <th className="py-3 pr-4 text-tmg-dark">Silah fark</th>
                    <td className="py-3 pr-4">Yalnızca silah kısmı: 25 soru ve 5 atış. Temel puan olarak önceki sınav puanınız alınır</td>
                    <td className="py-3">Silah en az 50 ve önceki temel puanla ortalaması en az 60</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mt-4">
              Yanlış cevaplar doğruları götürmez. Yenileme sınavında baraj yoktur; eğitimi tamamlayıp sınava girmek kimlik kartını yenilemek için yeterlidir.
            </p>
            <div className="flex flex-wrap gap-4 mt-6 text-sm font-semibold">
              <a href={SINAV_SONUC_ADRESI} target="_blank" rel="noopener noreferrer" className="text-tmg-secondary hover:underline">
                Resmi sonucu sorgulayın →
              </a>
              <Link to="/sinav-takvimi" className="text-tmg-secondary hover:underline">
                Sınav takvimi →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PuanHesaplamaPage;
