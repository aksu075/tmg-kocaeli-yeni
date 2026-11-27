import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import IcerikSayfasi from "@/components/admin/IcerikSayfasi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useBelgeler } from "@/hooks/use-icerik";
import { useIcerikForm } from "@/hooks/use-icerik-form";
import { Belgeler, Dilekce } from "@/data/icerik";

const gecerliAdres = (a: string) => /^https?:\/\/\S+$/i.test(a.trim());

const BelgelerYonetPage = () => {
  const { form, setForm, degisti, kaydediliyor, onKaydet } = useIcerikForm<Belgeler>("belgeler", useBelgeler());

  if (!form)
    return (
      <IcerikSayfasi baslik="Belge ve Dilekçeler" aciklama="Yükleniyor..." kaydediliyor={false} degisti={false} onKaydet={() => {}}>
        {null}
      </IcerikSayfasi>
    );

  const d = form.dilekceler;
  const degistir = (i: number, alan: keyof Dilekce, v: string) =>
    setForm({ dilekceler: d.map((x, j) => (j === i ? { ...x, [alan]: v } : x)) });
  const tasi = (i: number, yon: -1 | 1) => {
    const yeni = [...d];
    [yeni[i], yeni[i + yon]] = [yeni[i + yon], yeni[i]];
    setForm({ dilekceler: yeni });
  };

  return (
    <IcerikSayfasi
      baslik="Belge ve Dilekçeler"
      sitedeki="/belge-ve-dilekceler"
      degisti={degisti}
      kaydediliyor={kaydediliyor}
      onKaydet={() =>
        onKaydet((v) => ({
          dilekceler: v.dilekceler
            .map((x) => ({ baslik: x.baslik.trim(), aciklama: x.aciklama.trim(), adres: x.adres.trim() }))
            .filter((x) => x.baslik && gecerliAdres(x.adres)),
        }))
      }
      aciklama={
        <>
          Sitede listelenen dilekçe örnekleri. Bağlantı, dosyanın tam adresi olmalıdır (https:// ile başlar). Emniyet dosyanın adını
          değiştirirse bağlantıyı buradan güncelleyin. Bağlantısı geçersiz satırlar kaydedilmez.
        </>
      }
    >
      {d.map((x, i) => (
        <Card key={i}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-400 w-6">{i + 1}.</span>
              <Input value={x.baslik} placeholder="Başlık (örn. Yenileme eğitimi dilekçesi)" onChange={(e) => degistir(i, "baslik", e.target.value)} />
              <Button variant="ghost" size="sm" aria-label="Yukarı taşı" disabled={i === 0} onClick={() => tasi(i, -1)}>
                <ArrowUp size={16} />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Aşağı taşı" disabled={i === d.length - 1} onClick={() => tasi(i, 1)}>
                <ArrowDown size={16} />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Sil" className="text-red-600" onClick={() => setForm({ dilekceler: d.filter((_, j) => j !== i) })}>
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="pl-8 space-y-3">
              <div>
                <Label className="text-xs text-gray-500">Kısa açıklama</Label>
                <Input value={x.aciklama} placeholder="Kimin için olduğu" onChange={(e) => degistir(i, "aciklama", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Dosyanın bağlantısı</Label>
                <Input value={x.adres} placeholder="https://..." onChange={(e) => degistir(i, "adres", e.target.value)} />
                {x.adres && !gecerliAdres(x.adres) && <p className="text-xs text-red-600 mt-1">Bağlantı https:// ile başlamalı.</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={() => setForm({ dilekceler: [...d, { baslik: "", aciklama: "", adres: "" }] })}>
        <Plus size={16} className="mr-1" /> Dilekçe ekle
      </Button>
    </IcerikSayfasi>
  );
};

export default BelgelerYonetPage;
