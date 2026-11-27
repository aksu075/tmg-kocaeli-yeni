import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { icerikApi } from "@/lib/api";
import {
  varsayilanSite, varsayilanHarclar, varsayilanTakvim, varsayilanSSS, varsayilanBelgeler,
  SiteBilgileri, Harclar, Takvim, SSS, Belgeler,
} from "@/data/icerik";

const VARSAYILAN = { site: varsayilanSite, harclar: varsayilanHarclar, takvim: varsayilanTakvim, sss: varsayilanSSS, belgeler: varsayilanBelgeler };
type Anahtar = keyof typeof VARSAYILAN;

// Panelde kayıt yoksa ya da sunucuya ulaşılamazsa varsayılan içerik gösterilir.
function useIcerik<T>(anahtar: Anahtar) {
  const varsayilan = VARSAYILAN[anahtar] as unknown as T;
  return useQuery<T>({
    queryKey: ["icerik", anahtar],
    queryFn: async () => {
      try {
        const r = await icerikApi.get(anahtar);
        return (r.veri ? { ...varsayilan, ...r.veri } : varsayilan) as T;
      } catch {
        return varsayilan;
      }
    },
    placeholderData: varsayilan as any,
    staleTime: 60 * 1000,
  });
}

export const useSiteBilgileri = () => useIcerik<SiteBilgileri>("site");
export const useHarclar = () => useIcerik<Harclar>("harclar");
export const useTakvim = () => useIcerik<Takvim>("takvim");
export const useSSS = () => useIcerik<SSS>("sss");
export const useBelgeler = () => useIcerik<Belgeler>("belgeler");

export const useIcerikKaydet = (anahtar: Anahtar) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (veri: any) => icerikApi.save(anahtar, veri),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["icerik", anahtar] }),
  });
};
