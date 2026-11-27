import { Plus, Trash2 } from "lucide-react";
import IcerikSayfasi from "@/components/admin/IcerikSayfasi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useTakvim } from "@/hooks/use-icerik";
import { useIcerikForm } from "@/hooks/use-icerik-form";
import { Takvim } from "@/data/icerik";

const TakvimYonetPage = () => {
  const { form, setForm, degisti, kaydediliyor, onKaydet } = useIcerikForm<Takvim>("takvim", useTakvim());

  if (!form) return <IcerikSayfasi baslik="Sınav Takvimi" aciklama="Yükleniyor..." kaydediliyor={false} degisti={false} onKaydet={() => {}}>{null}</IcerikSayfasi>;

  const yillar = form.yillar;
  const guncelle = (yi: number, fn: (y: Takvim["yillar"][number]) => void) => {
    const yeni = JSON.parse(JSON.stringify(form)) as Takvim;
    fn(yeni.yillar[yi]);
    setForm(yeni);
  };

  const yilEkle = () => {
    const enBuyuk = Math.max(new Date().getFullYear() - 1, ...yillar.map((y) => Number(y.yil) || 0));
    setForm({ ...form, yillar: [{ yil: String(enBuyuk + 1), sinavlar: [{ tarih: "", temel: "", yenileme: "" }] }, ...yillar] });
  };

  const temizle = (v: Takvim): Takvim => ({
    ...v,
    yillar: v.yillar
      .map((y) => ({ ...y, yil: y.yil.trim(), sinavlar: y.sinavlar.filter((s) => s.tarih) }))
      .filter((y) => y.yil),
  });

  return (
    <IcerikSayfasi
      baslik="Sınav Takvimi"
      sitedeki="/sinav-takvimi"
      degisti={degisti}
      kaydediliyor={kaydediliyor}
      onKaydet={() => onKaydet(temizle)}
      aciklama={
        <>
          Emniyet yeni yılın takvimini açıklayınca <b>Yeni yıl ekle</b>'ye basıp tarihleri girin ve kaydedin. Geçmiş sınavlar sitede
          "Yapıldı", bugünden sonraki ilk sınav "Sıradaki sınav" olarak kendiliğinden işaretlenir. Eski bir yılı artık göstermek
          istemezseniz o yılı silebilirsiniz.
        </>
      }
    >
      <div className="flex justify-start">
        <Button variant="outline" onClick={yilEkle}>
          <Plus size={16} className="mr-1" /> Yeni yıl ekle
        </Button>
      </div>

      {yillar.map((y, yi) => (
        <Card key={yi}>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-end gap-3">
              <div className="w-32">
                <Label>Yıl</Label>
                <Input value={y.yil} onChange={(e) => guncelle(yi, (x) => (x.yil = e.target.value))} />
              </div>
              <Button
                variant="ghost"
                className="text-red-600 ml-auto"
                onClick={() => {
                  if (confirm(`${y.yil} yılının bütün sınavları silinsin mi?`)) setForm({ ...form, yillar: yillar.filter((_, i) => i !== yi) });
                }}
              >
                <Trash2 size={16} className="mr-1" /> Yılı sil
              </Button>
            </div>
            <div className="hidden sm:grid grid-cols-[10rem_1fr_1fr_2.5rem] gap-2 text-xs text-gray-500 font-medium">
              <span>Sınav tarihi</span>
              <span>Temel sınav adı</span>
              <span>Yenileme sınavı adı</span>
              <span></span>
            </div>
            {y.sinavlar.map((s, si) => (
              <div key={si} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr_1fr_2.5rem] gap-2 border-b sm:border-0 pb-3 sm:pb-0">
                <Input type="date" value={s.tarih} onChange={(e) => guncelle(yi, (x) => (x.sinavlar[si].tarih = e.target.value))} />
                <Input placeholder="örn. 125. Temel" value={s.temel} onChange={(e) => guncelle(yi, (x) => (x.sinavlar[si].temel = e.target.value))} />
                <Input placeholder="örn. 101. Yenileme" value={s.yenileme} onChange={(e) => guncelle(yi, (x) => (x.sinavlar[si].yenileme = e.target.value))} />
                <Button variant="ghost" size="sm" aria-label="Sınavı sil" onClick={() => guncelle(yi, (x) => x.sinavlar.splice(si, 1))}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => guncelle(yi, (x) => x.sinavlar.push({ tarih: "", temel: "", yenileme: "" }))}>
              <Plus size={14} className="mr-1" /> Sınav ekle
            </Button>
          </CardContent>
        </Card>
      ))}

      <div>
        <Label>Sayfanın altındaki not</Label>
        <Textarea rows={2} value={form.not} onChange={(e) => setForm({ ...form, not: e.target.value })} />
      </div>
    </IcerikSayfasi>
  );
};

export default TakvimYonetPage;
