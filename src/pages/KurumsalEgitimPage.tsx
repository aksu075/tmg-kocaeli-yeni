import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  RefreshCw,
  ShieldCheck,
  Handshake,
  GraduationCap,
  Phone,
  ClipboardList,
  CalendarDays,
  BookOpen,
  IdCard,
  ChevronRight,
  Factory,
  Hospital,
  ShoppingBag,
  Home,
  Briefcase,
  School,
} from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { Button } from "@/components/ui/button";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite, telBaglanti } from "@/data/icerik";

const egitimler = [
  {
    ikon: <Users size={24} />,
    baslik: "Toplu temel eğitim",
    metin:
      "İşe alacağınız güvenlik görevlisi adayları için grup hâlinde silahlı ya da silahsız temel eğitim. Adaylarınız eğitimin sonunda EGM'nin yazılı sınavına girer.",
    maddeler: ["Silahsız temel eğitim (100 saat)", "Silahlı temel eğitim (120 saat, atış dahil)", "Grubunuza uygun dönem planı"],
  },
  {
    ikon: <RefreshCw size={24} />,
    baslik: "Toplu yenileme eğitimi",
    metin:
      "Kimlik kartının süresi dolmak üzere olan personeliniz için yenileme eğitimi. Eğitimi kartın süresi dolmadan planlamak, personelinizin görevine ara vermemesini sağlar.",
    maddeler: ["Silahsız yenileme eğitimi", "Silahlı yenileme eğitimi", "Süresi yaklaşan personel için dönem önerisi"],
  },
];

const adimlar = [
  { ikon: <Phone size={20} />, baslik: "Görüşme", metin: "Personel sayısını, hangi eğitimin gerektiğini ve zamanlamanızı konuşuruz." },
  { ikon: <ClipboardList size={20} />, baslik: "Planlama ve teklif", metin: "Grubunuza uygun dönemi ve ücreti belirleyip yazılı teklif iletiriz." },
  { ikon: <BookOpen size={20} />, baslik: "Eğitim", metin: "Personeliniz İçişleri Bakanlığı onaylı müfredatla eğitimini kurumumuzda tamamlar." },
  { ikon: <IdCard size={20} />, baslik: "Sınav ve kimlik kartı", metin: "EGM sınavı ve sonrasında e-Devlet'ten kimlik kartı başvurusu için yol gösteririz." },
];

const kimler = [
  { ikon: <ShieldCheck size={18} />, ad: "Özel güvenlik şirketleri" },
  { ikon: <Factory size={18} />, ad: "Fabrika ve üretim tesisleri" },
  { ikon: <Hospital size={18} />, ad: "Hastaneler" },
  { ikon: <ShoppingBag size={18} />, ad: "AVM ve mağazalar" },
  { ikon: <Home size={18} />, ad: "Site ve rezidans yönetimleri" },
  { ikon: <Briefcase size={18} />, ad: "Plaza ve iş merkezleri" },
  { ikon: <School size={18} />, ad: "Okullar ve kamu kurumları" },
  { ikon: <Building2 size={18} />, ad: "Kendi güvenlik birimini kuran kurumlar" },
];

const KurumsalEgitimPage = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();
  useSayfa(
    "Kurumsal Eğitim",
    "Kurum ve firmalar için toplu özel güvenlik eğitimi: personeliniz için grup hâlinde temel ve yenileme eğitimi. İzmit, Kocaeli."
  );

  const nedenler = [
    { ikon: <GraduationCap size={22} />, baslik: "Bakanlık onaylı eğitim", metin: "Eğitimler İçişleri Bakanlığı'nın belirlediği müfredat ve sürelerle verilir." },
    { ikon: <Handshake size={22} />, baslik: `${site.ortaklik || "50+"} kurumsal iş birliği`, metin: "Kocaeli'deki kurum ve firmaların güvenlik personelini yetiştiriyoruz." },
    { ikon: <Users size={22} />, baslik: `${site.mezun || "5000+"} mezun`, metin: "Binlerce kursiyeri özel güvenlik kimlik kartına hazırladık." },
    { ikon: <CalendarDays size={22} />, baslik: "Size uygun dönem", metin: "Grubunuzun büyüklüğüne ve işe başlama tarihine göre dönem planlarız." },
  ];

  return (
    <Layout>
      <SayfaBaslik
        ikon={<Building2 size={16} />}
        etiket="Kurum ve firmalar için"
        baslik="Kurumsal Eğitim"
        aciklama="Güvenlik personelinizin temel ve yenileme eğitimini tek elden planlayalım. Personel sayınızı söyleyin, size uygun dönemi ve teklifi hazırlayalım."
      />

      {/* Neden biz */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Neden TMG?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">Personeliniz için güvenilir eğitim</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {nedenler.map((n) => (
              <div key={n.baslik} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <div className="w-11 h-11 rounded-xl bg-tmg-primary/10 text-tmg-primary flex items-center justify-center mb-4">{n.ikon}</div>
                <h3 className="font-bold text-tmg-dark mb-1.5">{n.baslik}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{n.metin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eğitimler */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Eğitimlerimiz</span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">Kurumlara verdiğimiz eğitimler</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {egitimler.map((e) => (
              <div key={e.baslik} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-tmg-secondary/10 text-tmg-secondary flex items-center justify-center mb-4">{e.ikon}</div>
                <h3 className="text-xl font-bold text-tmg-dark mb-2">{e.baslik}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{e.metin}</p>
                <ul className="space-y-2">
                  {e.maddeler.map((m) => (
                    <li key={m} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <ShieldCheck size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Süre, ders içeriği ve kişi başı ücretler için{" "}
            <Link to="/kurslar" className="text-tmg-secondary font-semibold hover:underline">Kurslar</Link> ve{" "}
            <Link to="/ucretler" className="text-tmg-secondary font-semibold hover:underline">Ücretler</Link> sayfalarına bakabilirsiniz.
          </p>
        </div>
      </section>

      {/* Süreç */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Süreç</span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">Kurumsal eğitim nasıl işler?</h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {adimlar.map((a, i) => (
              <li key={a.baslik} className="relative rounded-2xl border border-gray-100 p-6">
                <span className="absolute top-5 right-5 text-3xl font-bold text-gray-100">{i + 1}</span>
                <div className="w-10 h-10 rounded-lg bg-tmg-primary text-white flex items-center justify-center mb-4">{a.ikon}</div>
                <h3 className="font-bold text-tmg-dark mb-1.5">{a.baslik}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a.metin}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kimler için */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="inline-block text-tmg-secondary font-semibold text-sm uppercase tracking-wider mb-3">Kimler için?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-tmg-dark">Güvenlik personeli çalıştıran her kurum</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {kimler.map((k) => (
              <span key={k.ad} className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2.5 text-sm font-medium text-tmg-dark shadow-sm">
                <span className="text-tmg-primary">{k.ikon}</span>
                {k.ad}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Teklif */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tmg-dark via-tmg-primary to-tmg-dark"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">Personeliniz için teklif alın</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-white/80 leading-relaxed">
            Kaç kişiye, hangi eğitimin gerektiğini yazın ya da arayın; size uygun dönemi ve fiyatı iletelim.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-tmg-secondary hover:bg-tmg-secondary/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg">
              <Link to="/iletisim?konu=Kurumsal%20e%C4%9Fitim%20teklifi" className="inline-flex items-center gap-2">
                Teklif İsteyin <ChevronRight size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/15 px-8 py-6 text-lg rounded-lg">
              <a href={telBaglanti(site.telefon1)} className="inline-flex items-center gap-2">
                <Phone size={18} /> {site.telefon1}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KurumsalEgitimPage;
