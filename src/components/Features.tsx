import { Shield, Award, Users, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Sertifikalı Eğitimler",
    description:
      "İçişleri Bakanlığı onaylı resmi sertifikalarla güvenlik sektöründe kariyer yapın.",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    hoverColor: "from-blue-500 to-blue-600",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Uzman Eğitmenler",
    description:
      "Alanında uzman eğitmenlerimizle teorik ve pratik bilgileri öğrenin.",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    hoverColor: "from-emerald-500 to-emerald-600",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "İş İmkanları",
    description:
      "Sektörün önde gelen firmalarında iş bulma fırsatları ve kariyer danışmanlığı.",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    hoverColor: "from-amber-500 to-amber-600",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Kaliteli Eğitim",
    description:
      "Modern tesislerimizde yüksek kalitede eğitim ve uygulama imkanları.",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    hoverColor: "from-rose-500 to-rose-600",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Avantajlarımız
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">
            Neden TMG Güvenlik?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Güvenlik eğitiminde {new Date().getFullYear() - 2008} yılı aşkın deneyimimizle sektörün lider
            kurumuyuz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-7 border border-gray-100 card-hover cursor-default"
            >
              {/* Icon */}
              <div
                className={`${feature.bgLight} ${feature.textColor} w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2 text-tmg-dark group-hover:text-tmg-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.hoverColor} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
