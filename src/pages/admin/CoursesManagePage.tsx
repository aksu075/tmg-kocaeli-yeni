import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { coursesApi } from "@/lib/api";
import { defaultCourses } from "@/data/courses";

interface CourseFormData {
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  curriculum: string[];
  requirements: string[];
  documents: string[];
  isActive: boolean;
  order: number;
}

const emptyCourse: CourseFormData = {
  title: "",
  slug: "",
  description: "",
  duration: "",
  price: 0,
  image: "",
  curriculum: [""],
  requirements: [""],
  documents: [""],
  isActive: true,
  order: 0,
};

const CoursesManagePage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CourseFormData>(emptyCourse);
  const [saving, setSaving] = useState(false);

  const fetchCourses = async () => {
    try {
      const data = await coursesApi.getAll();
      setCourses(data);
    } catch {
      setCourses(defaultCourses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const handleEdit = (course: any) => {
    setEditingId(course._id || course.id);
    setForm({
      title: course.title,
      slug: course.slug,
      description: course.description,
      duration: course.duration,
      price: course.price,
      image: course.image || "",
      curriculum: course.curriculum?.length ? course.curriculum : [""],
      requirements: course.requirements?.length ? course.requirements : [""],
      documents: course.documents?.length ? course.documents : [""],
      isActive: course.isActive ?? true,
      order: course.order || 0,
    });
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setForm({ ...emptyCourse, order: courses.length + 1 });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.duration) {
      toast.error("Başlık, açıklama ve süre zorunludur");
      return;
    }

    setSaving(true);
    try {
      const data = {
        ...form,
        slug: form.slug || generateSlug(form.title),
        curriculum: form.curriculum.filter((c) => c.trim()),
        requirements: form.requirements.filter((r) => r.trim()),
        documents: form.documents.filter((d) => d.trim()),
      };

      if (editingId) {
        await coursesApi.update(editingId, data);
        toast.success("Kurs güncellendi");
      } else {
        await coursesApi.create(data);
        toast.success("Kurs oluşturuldu");
      }
      setDialogOpen(false);
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message || "İşlem başarısız");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu kursu silmek istediğinize emin misiniz?")) return;
    try {
      await coursesApi.delete(id);
      toast.success("Kurs silindi");
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message || "Silme başarısız");
    }
  };

  const addListItem = (field: "curriculum" | "requirements" | "documents") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const updateListItem = (
    field: "curriculum" | "requirements" | "documents",
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const removeListItem = (field: "curriculum" | "requirements" | "documents", index: number) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated.length ? updated : [""] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Kurs Yönetimi</h1>
          <Button onClick={handleNew} className="bg-tmg-primary">
            <Plus size={18} className="mr-1" /> Yeni Kurs
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => (
              <Card key={course._id || course.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {course.image && (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            course.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {course.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {course.duration} | {typeof course.price === "number" ? `${course.price.toLocaleString("tr-TR")} TL` : course.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(course._id || course.id)}
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

        {/* Course Form Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Kursu Düzenle" : "Yeni Kurs Ekle"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Başlık</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                        slug: generateSlug(e.target.value),
                      })
                    }
                    placeholder="Kurs adı"
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="kurs-adi"
                  />
                </div>
              </div>

              <div>
                <Label>Açıklama</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Kurs açıklaması"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label>Süre</Label>
                  <Input
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    placeholder="120 saat"
                  />
                </div>
                <div>
                  <Label>Fiyat (TL)  </Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label>Sıralama</Label>
                  <Input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm({ ...form, order: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <ImageUploader
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Kurs Görseli"
              />

              <div className="flex items-center gap-2">
                <Switch
                  checked={form.isActive}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, isActive: checked })
                  }
                />
                <Label>Aktif</Label>
              </div>

              {/* Curriculum */}
              <div>
                <Label className="mb-2 block">Eğitim İçeriği</Label>
                {form.curriculum.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateListItem("curriculum", i, e.target.value)
                      }
                      placeholder={`İçerik ${i + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeListItem("curriculum", i)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("curriculum")}
                >
                  <Plus size={14} className="mr-1" /> İçerik Ekle
                </Button>
              </div>

              {/* Requirements */}
              <div>
                <Label className="mb-2 block">Başvuru Koşulları</Label>
                {form.requirements.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateListItem("requirements", i, e.target.value)
                      }
                      placeholder={`Koşul ${i + 1}`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeListItem("requirements", i)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("requirements")}
                >
                  <Plus size={14} className="mr-1" /> Koşul Ekle
                </Button>
              </div>

              {/* Gerekli belgeler */}
              <div>
                <Label className="mb-2 block">Kayıt İçin Gerekli Belgeler</Label>
                {form.documents.map((item, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        updateListItem("documents", i, e.target.value)
                      }
                      placeholder={`Belge ${i + 1} (örn. 2 adet vesikalık fotoğraf)`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeListItem("documents", i)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem("documents")}
                >
                  <Plus size={14} className="mr-1" /> Belge Ekle
                </Button>
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

export default CoursesManagePage;
