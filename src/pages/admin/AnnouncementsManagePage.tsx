import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Pin } from "lucide-react";
import { toast } from "sonner";
import { announcementsApi } from "@/lib/api";
import { baslangicDuyurulari } from "@/data/duyurular";

interface AnnouncementFormData {
  title: string;
  content: string;
  summary: string;
  image: string;
  link: string;
  isPinned: boolean;
  isPublished: boolean;
  publishDate: string;
}

const emptyAnnouncement: AnnouncementFormData = {
  title: "",
  content: "",
  summary: "",
  image: "",
  link: "",
  isPinned: false,
  isPublished: false,
  publishDate: new Date().toISOString().split("T")[0],
};

const AnnouncementsManagePage = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AnnouncementFormData>(emptyAnnouncement);
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementsApi.getAll();
      setAnnouncements(data);
    } catch {
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleEdit = (announcement: any) => {
    setEditingId(announcement._id);
    setForm({
      title: announcement.title,
      content: announcement.content,
      summary: announcement.summary || "",
      image: announcement.image || "",
      link: announcement.link || "",
      isPinned: announcement.isPinned,
      isPublished: announcement.isPublished,
      publishDate: announcement.publishDate
        ? new Date(announcement.publishDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm(emptyAnnouncement);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast.error("Başlık ve içerik zorunludur");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await announcementsApi.update(editingId, form);
        toast.success("Duyuru güncellendi");
      } else {
        await announcementsApi.create(form);
        toast.success("Duyuru oluşturuldu");
      }
      setDialogOpen(false);
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message || "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) return;
    try {
      await announcementsApi.delete(id);
      toast.success("Duyuru silindi");
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message || "Silme başarısız");
    }
  };

  // Veritabanı boşken sitede görünen EGM duyurularını kalıcı kayda çevirir
  const egmDuyurulariniEkle = async () => {
    setSaving(true);
    try {
      for (const d of [...baslangicDuyurulari].reverse()) {
        const { _id, ...veri } = d;
        await announcementsApi.create(veri);
      }
      toast.success("EGM duyuruları eklendi");
      fetchAnnouncements();
    } catch {
      toast.error("Duyurular eklenemedi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Duyuru Yönetimi</h1>
          <Button onClick={handleNew} className="bg-tmg-primary">
            <Plus size={18} className="mr-1" /> Yeni Duyuru
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : announcements.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500 space-y-4">
              <p>
                Henüz duyuru eklenmemiş. Sitede şu an EGM'nin son {baslangicDuyurulari.length} duyurusu gösteriliyor.
                Bunları düzenleyip silebilmek için panele ekleyebilir ya da yukarıdaki butonla kendi duyurunuzu yazabilirsiniz.
              </p>
              <Button variant="outline" onClick={egmDuyurulariniEkle} disabled={saving}>
                {saving ? "Ekleniyor..." : "EGM duyurularını panele ekle"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {announcements.map((announcement) => (
              <Card key={announcement._id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {announcement.image && (
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {announcement.isPinned && (
                          <Pin size={14} className="text-tmg-secondary" />
                        )}
                        <h3 className="font-semibold text-lg">
                          {announcement.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            announcement.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {announcement.isPublished ? "Yayında" : "Taslak"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {announcement.summary || announcement.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(announcement.publishDate).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(announcement)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(announcement._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Announcement Form Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Başlık</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Duyuru başlığı"
                />
              </div>

              <div>
                <Label>Özet (Opsiyonel)</Label>
                <Input
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  placeholder="Kısa özet (liste görünümünde gösterilir)"
                />
              </div>

              <div>
                <Label>İçerik</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Duyuru içeriği..."
                  rows={8}
                />
              </div>

              <div>
                <Label>Bağlantı (Opsiyonel)</Label>
                <Input
                  value={form.link}
                  onChange={(e) =>
                    setForm({ ...form, link: e.target.value })
                  }
                  placeholder="https://www.egm.gov.tr/... (doluysa duyuruya basan bu sayfaya gider)"
                />
              </div>

              <div>
                <Label>Yayın Tarihi</Label>
                <Input
                  type="date"
                  value={form.publishDate}
                  onChange={(e) =>
                    setForm({ ...form, publishDate: e.target.value })
                  }
                />
              </div>

              <ImageUploader
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Duyuru Görseli (Opsiyonel)"
              />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.isPublished}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, isPublished: checked })
                    }
                  />
                  <Label>Yayınla</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.isPinned}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, isPinned: checked })
                    }
                  />
                  <Label>Sabitle</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-tmg-primary"
                  disabled={saving}
                >
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AnnouncementsManagePage;
