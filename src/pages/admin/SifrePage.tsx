import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { authApi } from "@/lib/api";

const SifrePage = () => {
  const [mevcut, setMevcut] = useState("");
  const [yeni, setYeni] = useState("");
  const [tekrar, setTekrar] = useState("");
  const [gonderiliyor, setGonderiliyor] = useState(false);

  const gonder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (yeni.length < 10) return toast.error("Yeni şifre en az 10 karakter olmalı");
    if (yeni !== tekrar) return toast.error("Yeni şifreler birbirini tutmuyor");
    setGonderiliyor(true);
    try {
      await authApi.sifreDegistir(mevcut, yeni);
      toast.success("Şifreniz değiştirildi");
      setMevcut("");
      setYeni("");
      setTekrar("");
    } catch (err: any) {
      toast.error(err?.message || "Şifre değiştirilemedi");
    } finally {
      setGonderiliyor(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Şifre Değiştir</h1>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={gonder} className="space-y-4">
              <div>
                <Label htmlFor="mevcut">Mevcut şifre</Label>
                <Input id="mevcut" type="password" autoComplete="current-password" value={mevcut} onChange={(e) => setMevcut(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="yeni">Yeni şifre</Label>
                <Input id="yeni" type="password" autoComplete="new-password" value={yeni} onChange={(e) => setYeni(e.target.value)} required />
                <p className="text-xs text-gray-500 mt-1">En az 10 karakter. Harf, rakam ve işaret karıştırın.</p>
              </div>
              <div>
                <Label htmlFor="tekrar">Yeni şifre (tekrar)</Label>
                <Input id="tekrar" type="password" autoComplete="new-password" value={tekrar} onChange={(e) => setTekrar(e.target.value)} required />
              </div>
              <Button type="submit" disabled={gonderiliyor} className="w-full bg-tmg-primary">
                {gonderiliyor ? "Değiştiriliyor..." : "Şifreyi değiştir"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SifrePage;
