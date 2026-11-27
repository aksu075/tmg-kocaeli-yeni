
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "TMG Güvenlik Eğitim Kurumu'nda aldığım eğitim sayesinde sektörün önde gelen bir firmasında iş buldum. Eğitmenler çok profesyoneldi.",
    name: "Ahmet Yılmaz",
    role: "Özel Güvenlik Görevlisi",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    quote: "Yenileme eğitimimi TMG'de aldım ve çok memnun kaldım. Modern tesisleri ve uzman kadrosuyla kesinlikle tavsiye ediyorum.",
    name: "Ayşe Demir",
    role: "Özel Güvenlik Amiri",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    quote: "İş bulma konusunda büyük destek aldım. Eğitim sonrası hemen iş görüşmelerine yönlendirildim ve şu anda harika bir işim var.",
    name: "Mehmet Kaya",
    role: "Site Güvenlik Görevlisi",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-tmg-dark mb-4">Öğrenci Görüşleri</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mezunlarımızın TMG Güvenlik Eğitim Kurumu hakkındaki düşünceleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-600 mb-4 italic">{testimonial.quote}</p>
                  <h4 className="font-semibold text-tmg-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
