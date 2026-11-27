import { ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  baslik: string;
  aciklama: ReactNode;
  sitedeki?: string; // sitede hangi sayfada göründüğü
  kaydediliyor: boolean;
  degisti: boolean;
  onKaydet: () => void;
  children: ReactNode;
}

// Panelde içerik düzenleme ekranlarının ortak çerçevesi: başlık, açıklama, kaydet düğmesi.
const IcerikSayfasi = ({ baslik, aciklama, sitedeki, kaydediliyor, degisti, onKaydet, children }: Props) => (
  <AdminLayout>
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{baslik}</h1>
          {sitedeki && (
            <a href={sitedeki} target="_blank" rel="noopener noreferrer" className="text-sm text-tmg-primary hover:underline">
              Sitede gör →
            </a>
          )}
        </div>
        <Button onClick={onKaydet} disabled={kaydediliyor || !degisti} className="bg-tmg-primary">
          {kaydediliyor ? "Kaydediliyor..." : degisti ? "Kaydet" : "Kaydedildi"}
        </Button>
      </div>
      <Card>
        <CardContent className="p-4 text-sm text-gray-600 leading-relaxed">{aciklama}</CardContent>
      </Card>
      {children}
      <div className="flex justify-end">
        <Button onClick={onKaydet} disabled={kaydediliyor || !degisti} className="bg-tmg-primary">
          {kaydediliyor ? "Kaydediliyor..." : degisti ? "Kaydet" : "Kaydedildi"}
        </Button>
      </div>
    </div>
  </AdminLayout>
);

export default IcerikSayfasi;
