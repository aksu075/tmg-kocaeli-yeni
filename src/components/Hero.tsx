import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite } from "@/data/icerik";
import { Shield, ChevronRight, GraduationCap, Users, Award } from "lucide-react";

const FOUNDING_YEAR = 2008;
const yearsOfExperience = new Date().getFullYear() - FOUNDING_YEAR;



const Hero = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();
  const stats = [
    { icon: <GraduationCap size={22} />, value: site.mezun, label: "Mezun" },
    { icon: <Users size={22} />, value: `${yearsOfExperience}+`, label: "Yıl Deneyim" },
    { icon: <Award size={22} />, value: site.basari, label: "Başarı Oranı" },
  ];
  return (
    <section className="relative bg-tmg-dark text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069&auto=format&fit=crop')]"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark/95 via-tmg-primary/90 to-tmg-dark/80"></div>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Shield size={16} className="text-tmg-accent" />
            <span className="text-sm font-medium text-white/90">
              İçişleri Bakanlığı Onaylı Eğitim Kurumu
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up delay-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Geleceğin Güvenlik
            <span className="block text-tmg-accent mt-1">
              Profesyonelleri İçin Eğitim
            </span>
          </h1>

          {/* Description */}
          <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
            TMG Güvenlik Eğitim Kurumu ile profesyonel özel güvenlik
            kariyerinize başlayın. Sektörün lider kurumundan kaliteli eğitim
            alın.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              asChild
              className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white text-lg px-8 py-6 rounded-lg shadow-lg shadow-tmg-secondary/25 transition-all duration-300 hover:shadow-xl hover:shadow-tmg-secondary/30 hover:-translate-y-0.5"
            >
              <Link to="/kurslar" className="inline-flex items-center gap-2">
                Kursları İncele <ChevronRight size={20} />
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/15 text-lg px-8 py-6 rounded-lg transition-all duration-300"
            >
              <Link to="/iletisim">Bize Ulaşın</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-500 flex flex-wrap gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3"
              >
                <div className="text-tmg-accent">{stat.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/75 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
