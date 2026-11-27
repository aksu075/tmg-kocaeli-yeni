import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Pin, ArrowRight } from "lucide-react";
import { announcementsApi } from "@/lib/api";
import { baslangicDuyurulari } from "@/data/duyurular";

const LatestAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await announcementsApi.getAll();
        // Veritabanında duyuru yoksa EGM'nin son duyuruları gösterilir
        setAnnouncements((data.length ? data : baslangicDuyurulari).slice(0, 3));
      } catch {
        setAnnouncements(baslangicDuyurulari.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Don't render if no announcements
  if (!loading && announcements.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Haberler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">
            Son Duyurular
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            En güncel gelişmeler ve duyurularımızı takip edin
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tmg-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100"
                >
                  {announcement.image && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {announcement.isPinned && (
                        <span className="inline-flex items-center gap-1 text-xs bg-tmg-secondary/10 text-tmg-secondary px-2 py-0.5 rounded-full font-medium">
                          <Pin size={10} /> Sabitlenmiş
                        </span>
                      )}
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(
                          announcement.publishDate
                        ).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-bold text-tmg-dark mb-2 group-hover:text-tmg-primary transition-colors duration-300">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {announcement.summary || announcement.content}
                    </p>
                    {typeof announcement.link === "string" && /^https?:\/\//i.test(announcement.link) ? (
                      <a
                        href={announcement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-tmg-secondary font-semibold mt-3 hover:underline"
                      >
                        Duyuruya Git <ArrowRight size={14} />
                      </a>
                    ) : (
                      <Link
                        to="/duyurular"
                        className="inline-flex items-center gap-1.5 text-sm text-tmg-secondary font-semibold mt-3 hover:underline"
                      >
                        Devamını Oku <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/duyurular"
                className="inline-flex items-center gap-2 text-tmg-primary font-semibold hover:text-tmg-secondary transition-colors duration-300 text-lg group"
              >
                Tüm Duyurular
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestAnnouncements;
