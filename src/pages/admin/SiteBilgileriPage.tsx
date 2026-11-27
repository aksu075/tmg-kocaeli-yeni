import IcerikSayfasi from "@/components/admin/IcerikSayfasi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { useIcerikForm } from "@/hooks/use-icerik-form";
import { SiteBilgileri } from "@/data/icerik";

const ALANLAR: { grup: string; alanlar: { k: keyof SiteBilgileri; ad: string; ipucu?: string }[] }[] = [
  {
    grup: "İletişim",
    alanlar: [
      { k: "telefon1", ad: "Sabit telefon", ipucu: "örn. 0262 325 20 30" },
      { k: "telefon2", ad: "Cep telefonu", ipucu: "Boş bırakılırsa gösterilmez" },
      { k: "eposta", ad: "E-posta" },
    ],
  },
  {
    grup: "Adres",
    alanlar: [
      { k: "adres1", ad: "Adres 1. satır" },
      { k: "adres2", ad: "Adres 2. satır" },
      { k: "adres3", ad: "İlçe, il" },
    ],
  },
  {
    grup: "Çalışma saatleri",
    alanlar: [
      { k: "saat", ad: "Açık olduğu günler ve saatler" },
      { k: "kapali", ad: "Kapalı olduğu gün" },
    ],
  },
  {
    grup: "Ana sayfa ve Hakkımızda rakamları",
    alanlar: [
      { k: "mezun", ad: "Mezun sayısı", ipucu: "örn. 5000+" },
      { k: "basari", ad: "Başarı oranı", ipucu: "örn. %95" },
      { k: "ortaklik", ad: "Kurumsal ortaklık", ipucu: "örn. 50+" },
    ],
  },
];

const SiteBilgileriPage = () => {
  const { form, setForm, degisti, kaydediliyor, onKaydet } = useIcerikForm<SiteBilgileri>("site", useSiteBilgileri());

  if (!form) return <IcerikSayfasi baslik="Site Bilgileri" aciklama="Yükleniyor..." kaydediliyor={false} degisti={false} onKaydet={() => {}}>{null}</IcerikSayfasi>;

  return (
    <IcerikSayfasi
      baslik="Site Bilgileri"
      sitedeki="/iletisim"
      degisti={degisti}
      kaydediliyor={kaydediliyor}
      onKaydet={() => onKaydet()}
      aciklama={<>Burada yaptığınız değişiklik sitenin her yerinde (üst şerit, alt bilgi, iletişim sayfası, ana sayfa rakamları) aynı anda güncellenir.</>}
    >
      {ALANLAR.map((g) => (
        <Card key={g.grup}>
          <CardContent className="p-4">
            <h2 className="font-semibold text-gray-900 mb-3">{g.grup}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {g.alanlar.map((a) => (
                <div key={a.k}>
                  <Label>{a.ad}</Label>
                  <Input value={form[a.k]} placeholder={a.ipucu} onChange={(e) => setForm({ ...form, [a.k]: e.target.value })} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </IcerikSayfasi>
  );
};

export default SiteBilgileriPage;
