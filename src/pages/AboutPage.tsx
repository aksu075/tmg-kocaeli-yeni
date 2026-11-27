import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite } from "@/data/icerik";
import {
  Shield,
  Users,
  Award,
  Target,
  Eye,
  ChevronRight,
  GraduationCap,
  Building2,
  Clock,
} from "lucide-react";

const FOUNDING_YEAR = 2008;
const yearsOfExperience = new Date().getFullYear() - FOUNDING_YEAR;



const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Güvenilirlik",
    description: "İçişleri Bakanlığı onaylı, sektörün güvendiği kurum.",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Profesyonellik",
    description: "Uzman kadro ile sektöre hazır personel yetiştiriyoruz.",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Kalite",
    description: "Modern tesisler ve güncel müfredat ile eğitim veriyoruz.",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

const AboutPage = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();
  const stats = [
    { icon: <GraduationCap size={24} />, value: site.mezun, label: "Mezun Sayısı" },
    { icon: <Clock size={24} />, value: `${yearsOfExperience}+`, label: "Yıl Deneyim" },
    { icon: <Award size={24} />, value: site.basari, label: "Başarı Oranı" },
    { icon: <Building2 size={24} />, value: site.ortaklik, label: "Kurumsal Ortaklık" },
  ];
  useEffect(() => {
    document.title = "Hakkımızda | TMG Güvenlik Eğitim Kurumu";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "TMG Güvenlik Eğitim Kurumu 2008'den beri İzmit'te silahlı ve silahsız özel güvenlik eğitimi veriyor.");
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
              <Building2 size={16} className="text-tmg-accent" />
              <span className="text-sm font-medium text-white/90">
                2008'den Beri Hizmetinizdeyiz
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Hakkımızda
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              {yearsOfExperience} yıllık tecrübemizle Türkiye'nin en güvenilir özel güvenlik
              eğitim kurumuyuz.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-tmg-primary/5 text-tmg-primary rounded-xl mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-tmg-dark">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
                Kurumsal
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-6">
                Kurumsal Tarihçemiz
              </h2>
              <div className="space-y-4">
                <p className="text-gray-500 leading-relaxed">
                  TMG Güvenlik Eğitim Kurumu, 2008 yılında Kocaeli'de kurulmuş
                  olup, özel güvenlik sektöründe eğitim veren lider kurumlardan
                  biridir. İçişleri Bakanlığı tarafından onaylı sertifikalarla,
                  profesyonel güvenlik personeli yetiştirmek amacıyla hizmet
                  vermektedir.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Kurulduğu günden bu yana binlerce öğrenciyi sektöre kazandıran
                  kurumumuz, yüksek başarı oranı ve kaliteli eğitim anlayışıyla
                  öne çıkmaktadır. Modern eğitim tesislerimiz ve uzman kadromuzla
                  özel güvenlik sektörüne nitelikli eleman yetiştirmeye devam
                  etmekteyiz.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  TMG olarak, teorik bilginin yanında pratik eğitime de önem
                  veriyor, simülasyon alanlarımızda gerçek hayat senaryolarıyla
                  öğrencilerimizi mesleğe hazırlıyoruz.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
                  alt="TMG Güvenlik Eğitim Kurumu"
                  width={2074}
                  height={1383}
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-tmg-secondary/10 rounded-2xl -z-10"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-tmg-primary/10 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
              Değerlerimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">
              Temel Değerlerimiz
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-7 border border-gray-100 card-hover text-center"
              >
                <div
                  className={`${value.bgLight} ${value.textColor} w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto transition-transform duration-300 group-hover:scale-110`}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-tmg-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
              Hedeflerimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">
              Misyonumuz ve Vizyonumuz
            </h2>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto">
              Güvenlik sektörüne değer katmak ve profesyonel standartları
              yükseltmek için çalışıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tmg-primary to-blue-400"></div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tmg-primary/10 text-tmg-primary rounded-xl flex items-center justify-center">
                  <Target size={22} />
                </div>
                <h3 className="text-2xl font-bold text-tmg-primary">
                  Misyonumuz
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Özel güvenlik sektöründe en güncel bilgi ve tekniklerle
                donatılmış, mesleğin etik değerlerini benimsemiş, topluma ve
                çevresine duyarlı güvenlik profesyonelleri yetiştirmek.
                Eğitimlerimizde teorik bilginin yanında pratik uygulamalara da
                ağırlık vererek, mezunlarımızın iş hayatına tam donanımlı
                başlamalarını sağlamak.
              </p>
            </div>

            {/* Vision */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-100 card-hover relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tmg-secondary to-rose-400"></div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-tmg-secondary/10 text-tmg-secondary rounded-xl flex items-center justify-center">
                  <Eye size={22} />
                </div>
                <h3 className="text-2xl font-bold text-tmg-secondary">
                  Vizyonumuz
                </h3>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Türkiye'nin özel güvenlik eğitiminde lider kurumu olmak,
                uluslararası standartlarda eğitim vererek sektörün gelişimine
                katkıda bulunmak. Teknolojik gelişmeleri yakından takip ederek,
                güvenlik alanındaki yenilikleri eğitim programlarımıza entegre
                etmek ve sürekli kendini yenileyen bir eğitim kurumu olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
            TMG Güvenlik ile Kariyerinizi Başlatın
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Profesyonel özel güvenlik eğitimi alarak sektörde güçlü bir kariyer
            inşa edin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-tmg-secondary/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Link to="/iletisim" className="inline-flex items-center gap-2">
                Bize Ulaşın <ChevronRight size={20} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/15 px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              <Link to="/kurslar">Kursları İncele</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
