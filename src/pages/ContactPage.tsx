import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { contactApi } from "@/lib/api";
import { useCourses } from "@/hooks/use-courses";
import { Link } from "react-router-dom";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite, telBaglanti } from "@/data/icerik";

const ContactPage = () => {
  const { data: courses = [] } = useCourses();
  const { data: site = varsayilanSite } = useSiteBilgileri();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    course: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "İletişim | TMG Güvenlik Eğitim Kurumu";
    document.querySelector('meta[name="description"]')?.setAttribute("content", 'TMG Güvenlik Eğitim Kurumu İzmit adresi, telefon numaraları, çalışma saatleri ve iletişim formu.');
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Lütfen zorunlu alanları doldurun");
      return;
    }

    setIsSubmitting(true);
    try {
      await contactApi.send(formData);
      toast.success("Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.");
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        course: "",
        subject: "",
        message: "",
      });
    } catch {
      // Mesaj kaydedilemediyse ziyaretçiye söylenir; yazdıkları silinmez.
      toast.error(`Mesajınız gönderilemedi. Lütfen ${site.telefon1} numarasından bizi arayın.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-tmg-primary mb-4">
              İletişim
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Sorularınız mı var? Bizimle iletişime geçebilir, ofisimizi ziyaret
              edebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-tmg-dark mb-6">
                Bize Ulaşın
              </h2>
              <p className="text-gray-600 mb-8">
                Kurslarımız, eğitimlerimiz veya başvuru süreci hakkında
                sorularınız için bize ulaşabilirsiniz. En kısa sürede size dönüş
                yapacağız.
              </p>

              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-tmg-primary/10 text-tmg-primary rounded-full flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tmg-dark mb-1">
                      Telefon
                    </h3>
                    {[site.telefon1, site.telefon2].filter(Boolean).map((no) => (
                      <p key={no}><a href={telBaglanti(no)} className="text-gray-600 hover:text-tmg-primary">{no}</a></p>
                    ))}
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-tmg-primary/10 text-tmg-primary rounded-full flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tmg-dark mb-1">
                      E-posta
                    </h3>
                    <p><a href={`mailto:${site.eposta}`} className="text-gray-600 hover:text-tmg-primary break-all">{site.eposta}</a></p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-tmg-primary/10 text-tmg-primary rounded-full flex items-center justify-center">
                      <MapPin size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tmg-dark mb-1">
                      Adres
                    </h3>
                    <p className="text-gray-600">
                      {[site.adres1, site.adres2, site.adres3].filter(Boolean).map((s, i) => (
                        <span key={i} className="block">{s}</span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-tmg-primary/10 text-tmg-primary rounded-full flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-tmg-dark mb-1">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600">{site.saat}</p>
                    {site.kapali && <p className="text-gray-600">{site.kapali}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-tmg-dark mb-6">
                  Mesaj Gönder
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        Adınız <span className="text-tmg-secondary">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Adınız"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname">
                        Soyadınız <span className="text-tmg-secondary">*</span>
                      </Label>
                      <Input
                        id="surname"
                        type="text"
                        placeholder="Soyadınız"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-posta</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="E-posta adresiniz"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        Telefon <span className="text-tmg-secondary">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Telefon numaranız"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="course">İlgilendiğiniz Kurs</Label>
                    <select
                      id="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Kurs seçiniz (opsiyonel)</option>
                      {courses.map((course) => (
                        <option
                          key={course.id || course._id}
                          value={course.title}
                        >
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="subject">
                      Konu <span className="text-tmg-secondary">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Mesajınızın konusu"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">
                      Mesaj <span className="text-tmg-secondary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Mesajınızı buraya yazın..."
                      className="resize-none"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-tmg-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                  </Button>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Gönderdiğiniz bilgiler yalnızca size dönüş yapmak için kullanılır:{" "}
                    <Link to="/kvkk" className="underline hover:text-tmg-primary">KVKK Aydınlatma Metni</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-tmg-dark">Lokasyonumuz</h2>
          </div>
          <div className="rounded-lg overflow-hidden shadow-md h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9924388553327!2d29.92737567623226!3d40.762191034541075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb457f1789d2c3%3A0x8f028411a8a758fa!2sTMG%20Ozel%20Guvenlik!5e0!3m2!1sen!2str!4v1745873193586!5m2!1sen!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TMG Güvenlik Eğitim Kurumu Lokasyonu"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
