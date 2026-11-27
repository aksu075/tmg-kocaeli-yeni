import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark via-tmg-primary to-tmg-dark"></div>
      {/* Pattern */}
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
          Güvenlik Kariyerinize İlk Adımı Atın
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
          Profesyonel özel güvenlik sertifikası almak ve sektörde kariyer yapmak
          için hemen başvurun.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg shadow-tmg-secondary/25 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Link to="/iletisim" className="inline-flex items-center gap-2">
              Hemen Başvurun <ChevronRight size={20} />
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
  );
};

export default ContactCTA;
