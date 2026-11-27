import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pin, Calendar, Megaphone, ArrowRight } from "lucide-react";
import { announcementsApi } from "@/lib/api";
import { baslangicDuyurulari } from "@/data/duyurular";

// Duyuruda bağlantı varsa (örn. EGM duyurusu) kart o sayfayı yeni sekmede açar
const disBaglanti = (a: any) => (typeof a?.link === "string" && /^https?:\/\//i.test(a.link) ? a.link : "");

const AnnouncementsPage = () => {
  useEffect(() => {
    document.title = "Duyurular | TMG Güvenlik Eğitim Kurumu";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 'Özel güvenlik sınavları, sonuçlar ve yeni dönem duyuruları.');
  }, []);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await announcementsApi.getAll();
        // Veritabanında duyuru yoksa EGM'nin son duyuruları gösterilir
        setAnnouncements(data.length ? data : baslangicDuyurulari);
      } catch {
        setAnnouncements(baslangicDuyurulari);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <section className="relative bg-tmg-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark/95 via-tmg-primary/90 to-tmg-dark/85"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-5">
              <Megaphone size={16} className="text-tmg-accent" />
              <span className="text-sm font-medium text-white/90">
                Güncel Haberler
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Duyurular
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              TMG Güvenlik Eğitim Kurumu'nun en güncel duyuru ve haberlerini
              buradan takip edebilirsiniz.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Announcements List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-tmg-primary"></div>
                <span className="text-sm text-gray-400">Yükleniyor...</span>
              </div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Megaphone size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-lg">
                Henüz duyuru bulunmamaktadır.
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-5">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 cursor-pointer"
                  onClick={() => {
                    const l = disBaglanti(announcement);
                    if (l) window.open(l, "_blank", "noopener,noreferrer");
                    else setSelected(announcement);
                  }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    {announcement.image && (
                      <div className="sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {announcement.isPinned && (
                          <span className="inline-flex items-center gap-1 text-xs bg-tmg-secondary/10 text-tmg-secondary px-2.5 py-1 rounded-full font-medium">
                            <Pin size={10} /> Sabitlenmiş
                          </span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1.5">
                          <Calendar size={12} />
                          {new Date(
                            announcement.publishDate
                          ).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-tmg-dark mb-2 group-hover:text-tmg-primary transition-colors duration-300">
                        {announcement.title}
                      </h2>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-3">
                        {announcement.summary || announcement.content}
                      </p>

                      <span className="inline-flex items-center gap-1.5 text-sm text-tmg-secondary font-semibold group/link">
                        {disBaglanti(announcement) ? "Duyuruya Git" : "Devamını Oku"}
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Announcement Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              {selected?.isPinned && (
                <span className="inline-flex items-center gap-1 text-xs bg-tmg-secondary/10 text-tmg-secondary px-2 py-0.5 rounded-full font-medium">
                  <Pin size={10} /> Sabitlenmiş
                </span>
              )}
              <span className="text-xs text-gray-400">
                {selected &&
                  new Date(selected.publishDate).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </span>
            </div>
            <DialogTitle className="text-2xl font-bold text-tmg-dark">
              {selected?.title}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="mt-3">
              {selected.image && (
                <div className="rounded-xl overflow-hidden mb-5">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              <div className="space-y-3">
                {selected.content
                  .split("\n")
                  .map((paragraph: string, i: number) => (
                    <p
                      key={i}
                      className="text-gray-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AnnouncementsPage;
