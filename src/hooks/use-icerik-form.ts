import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useIcerikKaydet } from "@/hooks/use-icerik";

// Panel ekranları için: sunucudaki (ya da varsayılan) içeriği forma yükler, değişikliği izler, kaydeder.
export function useIcerikForm<T>(anahtar: "site" | "harclar" | "takvim" | "sss" | "belgeler", sorgu: { data?: T; isPlaceholderData?: boolean; isFetching?: boolean }) {
  const [form, setForm] = useState<T | null>(null);
  const [ilk, setIlk] = useState<string>("");
  const kaydet = useIcerikKaydet(anahtar);

  useEffect(() => {
    // Sunucudan gerçek cevap gelince (yer tutucu değil) bir kez yükle
    if (form === null && sorgu.data && !sorgu.isPlaceholderData && !sorgu.isFetching) {
      setForm(JSON.parse(JSON.stringify(sorgu.data)));
      setIlk(JSON.stringify(sorgu.data));
    }
  }, [sorgu.data, sorgu.isPlaceholderData, sorgu.isFetching, form]);

  const degisti = form !== null && JSON.stringify(form) !== ilk;

  const onKaydet = async (temizle?: (v: T) => T) => {
    if (!form) return;
    const veri = temizle ? temizle(form) : form;
    try {
      await kaydet.mutateAsync(veri);
      setForm(JSON.parse(JSON.stringify(veri)));
      setIlk(JSON.stringify(veri));
      toast.success("Kaydedildi. Sitede hemen görünür.");
    } catch (e: any) {
      toast.error(e?.message || "Kaydedilemedi");
    }
  };

  return { form, setForm, degisti, kaydediliyor: kaydet.isPending, onKaydet };
}
