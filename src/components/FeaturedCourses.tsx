import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/use-courses";
import { Clock, ArrowRight } from "lucide-react";

const FeaturedCourses = () => {
  const { data: courses = [] } = useCourses();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Eğitim Programları
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark mb-4">
            Öne Çıkan Kurslarımız
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Profesyonel kariyeriniz için ihtiyaç duyacağınız tüm eğitimler TMG
            güvencesiyle sizleri bekliyor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <div
              key={course.id || course._id}
              className="group bg-white rounded-2xl overflow-hidden card-hover border border-gray-100"
            >
              {/* Image */}
              {course.image && (
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Duration badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-tmg-dark px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {course.duration}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-tmg-dark mb-2 group-hover:text-tmg-primary transition-colors duration-300">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      Ücret
                    </span>
                    <p className="text-lg font-bold text-tmg-primary">
                      {typeof course.price === "number"
                        ? `${course.price.toLocaleString("tr-TR")} TL`
                        : course.price}
                    </p>
                  </div>
                  <Link
                    to="/kurslar"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-tmg-secondary hover:text-tmg-secondary/80 transition-colors group/link"
                  >
                    Detay
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            to="/kurslar"
            className="inline-flex items-center gap-2 text-tmg-primary font-semibold hover:text-tmg-secondary transition-colors duration-300 text-lg group"
          >
            Tüm Kursları Gör
            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
