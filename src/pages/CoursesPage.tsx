import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/use-courses";
import {
  Clock,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Shield,
  FileText,
} from "lucide-react";

const CoursesPage = () => {
  const { data: courses = [], isLoading } = useCourses();

  useEffect(() => {
    document.title = "Kurslarımız | TMG Güvenlik Eğitim Kurumu";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 'Temel silahlı, temel silahsız ve yenileme eğitimleri: süreler, ücretler, başvuru koşulları ve kayıt için gerekli belgeler.');
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
              <GraduationCap size={16} className="text-tmg-accent" />
              <span className="text-sm font-medium text-white/90">
                İçişleri Bakanlığı Onaylı
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Kurslarımız
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              TMG Güvenlik Eğitim Kurumu olarak, kariyeriniz için ihtiyaç
              duyduğunuz tüm özel güvenlik eğitimlerini sunuyoruz.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Courses Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-tmg-primary"></div>
                <span className="text-sm text-gray-400">Yükleniyor...</span>
              </div>
            </div>
          ) : (
            <Tabs
              defaultValue={courses[0]?.slug || courses[0]?.id || "silahli"}
              className="max-w-5xl mx-auto"
            >
              {/* Tab Navigation */}
              <TabsList className="w-full h-auto mb-10 grid grid-cols-2 gap-1 md:flex bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
                {courses.map((course) => (
                  <TabsTrigger
                    key={course._id || course.id}
                    value={course.slug || course.id || ""}
                    className="text-sm font-medium md:flex-1 min-w-0 whitespace-normal text-center leading-snug rounded-lg py-3 px-3 data-[state=active]:bg-tmg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300"
                  >
                    <span>{course.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content */}
              {courses.map((course) => (
                <TabsContent
                  key={course._id || course.id}
                  value={course.slug || course.id || ""}
                  className="animate-fade-in"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    {/* Top: Image + Quick Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                      {/* Image */}
                      <div className="lg:col-span-2 relative">
                        {course.image && (
                          <div className="h-72 lg:h-full min-h-[280px]">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r"></div>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="lg:col-span-3 p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-tmg-dark mb-3">
                          {course.title}
                        </h2>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                          {course.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <div className="flex items-center gap-2.5 bg-tmg-primary/5 border border-tmg-primary/10 text-tmg-primary px-4 py-3 rounded-xl">
                            <Clock size={18} />
                            <div>
                              <span className="text-xs text-tmg-primary/60 block">
                                Süre
                              </span>
                              <p className="font-bold text-sm">
                                {course.duration}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 bg-tmg-secondary/5 border border-tmg-secondary/10 text-tmg-secondary px-4 py-3 rounded-xl">
                            <Shield size={18} />
                            <div>
                              <span className="text-xs text-tmg-secondary/60 block">
                                Ücret
                              </span>
                              <p className="font-bold text-sm">
                                {typeof course.price === "number"
                                  ? `${course.price.toLocaleString("tr-TR")} TL`
                                  : course.price}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          asChild
                          className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white rounded-lg shadow-md shadow-tmg-secondary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                          <Link
                            to="/iletisim"
                            className="inline-flex items-center gap-2"
                          >
                            Hemen Başvur{" "}
                            <ChevronRight size={18} />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Alt kısım: içerik, koşullar ve gerekli belgeler (boş olan bölüm gösterilmez) */}
                    {(() => {
                      const bolumler = [
                        { baslik: "Eğitim İçeriği", ikon: <BookOpen size={18} />, renk: "bg-blue-50 text-blue-600", liste: course.curriculum || [], numarali: true },
                        { baslik: "Başvuru Koşulları", ikon: <CheckCircle2 size={18} />, renk: "bg-emerald-50 text-emerald-600", liste: course.requirements || [], numarali: false },
                        { baslik: "Kayıt İçin Gerekli Belgeler", ikon: <FileText size={18} />, renk: "bg-amber-50 text-amber-600", liste: course.documents || [], numarali: false },
                      ].filter((b) => b.liste.filter(Boolean).length > 0);
                      if (bolumler.length === 0) return null;
                      const sutun = bolumler.length === 3 ? "lg:grid-cols-3" : bolumler.length === 2 ? "lg:grid-cols-2" : "";
                      return (
                        <div className={`border-t border-gray-100 grid grid-cols-1 ${sutun} gap-0`}>
                          {bolumler.map((b, bi) => (
                            <div key={b.baslik} className={`p-8 border-gray-100 ${bi > 0 ? "border-t lg:border-t-0 lg:border-l" : ""}`}>
                              <div className="flex items-center gap-2.5 mb-5">
                                <div className={`w-9 h-9 ${b.renk} rounded-lg flex items-center justify-center`}>{b.ikon}</div>
                                <h3 className="text-lg font-bold text-tmg-dark">{b.baslik}</h3>
                              </div>
                              <ul className="space-y-3">
                                {b.liste.filter(Boolean).map((item: string, index: number) => (
                                  <li key={index} className="flex items-start gap-3">
                                    {b.numarali ? (
                                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tmg-primary/10 text-tmg-primary flex items-center justify-center text-xs font-bold mt-0.5">
                                        {index + 1}
                                      </span>
                                    ) : (
                                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                                    )}
                                    <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Custom Training CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark via-tmg-primary to-tmg-dark"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">
            Özel Eğitim Talebi
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
            Kurumunuza özel güvenlik eğitimi mi arıyorsunuz? İhtiyaçlarınıza
            uygun özel eğitim programları hazırlayabiliriz.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-tmg-secondary/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Link to="/iletisim" className="inline-flex items-center gap-2">
                Teklif Alın <ChevronRight size={20} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/15 px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              <Link to="/hakkimizda">Hakkımızda</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CoursesPage;
