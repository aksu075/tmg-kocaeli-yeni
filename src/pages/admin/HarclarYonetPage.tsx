import { Plus, Trash2 } from "lucide-react";
import IcerikSayfasi from "@/components/admin/IcerikSayfasi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useHarclar } from "@/hooks/use-icerik";
import { useIcerikForm } from "@/hooks/use-icerik-form";
import { Harclar, HarcKalemi } from "@/data/icerik";

const bos: HarcKalemi = { ad: "", nereye: "", aciklama: "", silahsiz: 0, silahli: 0, yenilemede: false };

const HarclarYonetPage = () => {
  const { form, setForm, degisti, kaydediliyor, onKaydet } = useIcerikForm<Harclar>("harclar", useHarclar());

  if (!form) return <IcerikSayfasi baslik="Harçlar" aciklama="Yükleniyor..." kaydediliyor={false} degisti={false} onKaydet={() => {}}>{null}</IcerikSayfasi>;

  const kalem = (i: number, alan: keyof HarcKalemi, deger: any) => {
    const kalemler = form.kalemler.map((k, j) => (j === i ? { ...k, [alan]: deger } : k));
    setForm({ ...form, kalemler });
  };
  const sayi = (s: string) => Number(s.replace(/\D/g, "")) || 0;

  return (
    <IcerikSayfasi
      baslik="Devlet Harçları"
      sitedeki="/ucretler"
      degisti={degisti}
      kaydediliyor={kaydediliyor}
      onKaydet={() => onKaydet((v) => ({ ...v, kalemler: v.kalemler.filter((k) => k.ad.trim()) }))}
      aciklama={
        <>
          Devlete ödenen tutarlar her yıl değişir. Yeni yılın tutarları açıklanınca yılı, geçerlilik tarihini ve tutarları değiştirip kaydedin.
          Kurs ücretleri burada değil, <b>Kurslar</b> ekranında değiştirilir. "Yenilemede de ödenir" açık olan kalemler, Ücretler sayfasında
          yenileme maliyeti olarak ayrıca gösterilir.
        </>
      }
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Yıl</Label>
          <Input value={form.yil} onChange={(e) => setForm({ ...form, yil: e.target.value })} />
        </div>
        <div>
          <Label>Geçerlilik tarihi (yazıyla)</Label>
          <Input value={form.gecerlilik} placeholder="örn. 31 Aralık 2027" onChange={(e) => setForm({ ...form, gecerlilik: e.target.value })} />
        </div>
      </div>

      {form.kalemler.map((k, i) => (
        <Card key={i}>
          <CardContent className="p-4 grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Kalem</Label>
              <Input value={k.ad} placeholder="örn. Sınav ücreti" onChange={(e) => kalem(i, "ad", e.target.value)} />
            </div>
            <div>
              <Label>Nereye ödenir</Label>
              <Input value={k.nereye} placeholder="örn. Halkbank" onChange={(e) => kalem(i, "nereye", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <Label>Açıklama</Label>
              <Input value={k.aciklama} onChange={(e) => kalem(i, "aciklama", e.target.value)} />
            </div>
            <div>
              <Label>Silahsız (TL)</Label>
              <Input inputMode="numeric" value={k.silahsiz ? String(k.silahsiz) : ""} onChange={(e) => kalem(i, "silahsiz", sayi(e.target.value))} />
            </div>
            <div>
              <Label>Silahlı (TL)</Label>
              <Input inputMode="numeric" value={k.silahli ? String(k.silahli) : ""} onChange={(e) => kalem(i, "silahli", sayi(e.target.value))} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={k.yenilemede} onCheckedChange={(c) => kalem(i, "yenilemede", c)} />
              <Label>Yenilemede de ödenir</Label>
            </div>
            <div className="flex justify-end">
              <Button variant="ghost" className="text-red-600" onClick={() => setForm({ ...form, kalemler: form.kalemler.filter((_, j) => j !== i) })}>
                <Trash2 size={16} className="mr-1" /> Kalemi sil
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={() => setForm({ ...form, kalemler: [...form.kalemler, { ...bos }] })}>
        <Plus size={16} className="mr-1" /> Kalem ekle
      </Button>

      <div>
        <Label>Tablonun üstündeki açıklama</Label>
        <Textarea rows={2} value={form.not} onChange={(e) => setForm({ ...form, not: e.target.value })} />
      </div>
    </IcerikSayfasi>
  );
};

export default HarclarYonetPage;
