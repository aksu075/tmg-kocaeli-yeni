import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import IcerikSayfasi from "@/components/admin/IcerikSayfasi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useSSS } from "@/hooks/use-icerik";
import { useIcerikForm } from "@/hooks/use-icerik-form";
import { SSS } from "@/data/icerik";

const SSSYonetPage = () => {
  const { form, setForm, degisti, kaydediliyor, onKaydet } = useIcerikForm<SSS>("sss", useSSS());

  if (!form) return <IcerikSayfasi baslik="Sık Sorulan Sorular" aciklama="Yükleniyor..." kaydediliyor={false} degisti={false} onKaydet={() => {}}>{null}</IcerikSayfasi>;

  const s = form.sorular;
  const degistir = (i: number, alan: "soru" | "cevap", v: string) =>
    setForm({ sorular: s.map((x, j) => (j === i ? { ...x, [alan]: v } : x)) });
  const tasi = (i: number, yon: -1 | 1) => {
    const yeni = [...s];
    [yeni[i], yeni[i + yon]] = [yeni[i + yon], yeni[i]];
    setForm({ sorular: yeni });
  };

  return (
    <IcerikSayfasi
      baslik="Sık Sorulan Sorular"
      sitedeki="/sss"
      degisti={degisti}
      kaydediliyor={kaydediliyor}
      onKaydet={() => onKaydet((v) => ({ sorular: v.sorular.filter((x) => x.soru.trim() && x.cevap.trim()) }))}
      aciklama={<>Soruları ekleyin, düzenleyin ya da oklarla sırasını değiştirin. Sitede bu sırayla görünür. Cevapta yeni paragraf için Enter'a basın.</>}
    >
      {s.map((x, i) => (
        <Card key={i}>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-400 w-6">{i + 1}.</span>
              <Input value={x.soru} placeholder="Soru" onChange={(e) => degistir(i, "soru", e.target.value)} />
              <Button variant="ghost" size="sm" aria-label="Yukarı taşı" disabled={i === 0} onClick={() => tasi(i, -1)}>
                <ArrowUp size={16} />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Aşağı taşı" disabled={i === s.length - 1} onClick={() => tasi(i, 1)}>
                <ArrowDown size={16} />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Soruyu sil" className="text-red-600" onClick={() => setForm({ sorular: s.filter((_, j) => j !== i) })}>
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="pl-8">
              <Label className="sr-only">Cevap</Label>
              <Textarea rows={3} value={x.cevap} placeholder="Cevap" onChange={(e) => degistir(i, "cevap", e.target.value)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" onClick={() => setForm({ sorular: [...s, { soru: "", cevap: "" }] })}>
        <Plus size={16} className="mr-1" /> Soru ekle
      </Button>
    </IcerikSayfasi>
  );
};

export default SSSYonetPage;
