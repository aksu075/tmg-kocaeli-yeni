import { ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import SayfaBaslik, { useSayfa } from "@/components/SayfaBaslik";
import { useSiteBilgileri } from "@/hooks/use-icerik";
import { varsayilanSite } from "@/data/icerik";

const KvkkPage = () => {
  const { data: site = varsayilanSite } = useSiteBilgileri();
  useSayfa("KVKK Aydınlatma Metni", "TMG Güvenlik Eğitim Kurumu kişisel verilerin korunması aydınlatma metni.");
  const adres = [site.adres1, site.adres2, site.adres3].filter(Boolean).join(" ");

  const B = ({ children }: { children: string }) => <h2 className="text-xl font-bold text-tmg-dark mt-8 mb-3">{children}</h2>;

  return (
    <Layout>
      <SayfaBaslik
        ikon={<ShieldCheck size={16} />}
        etiket="6698 sayılı Kanun"
        baslik="KVKK Aydınlatma Metni"
        aciklama="Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca hazırlanmıştır."
      />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
            <B>Veri sorumlusu</B>
            <p>
              Kişisel verileriniz, veri sorumlusu sıfatıyla TMG Güvenlik Eğitim Kurumu ("Kurum") tarafından işlenmektedir.
              Adres: {adres} · Telefon: {site.telefon1} · E-posta: {site.eposta}
            </p>

            <B>İşlenen kişisel veriler</B>
            <ul>
              <li><b>Site üzerinden iletişim:</b> ad, soyad, telefon numarası, isteğe bağlı e-posta adresi, ilgilenilen kurs ve mesaj içeriği.</li>
              <li><b>Kursiyer kaydı sırasında (kurumda):</b> kimlik ve iletişim bilgileri, öğrenim bilgisi, fotoğraf, sağlık kurulu raporu ve mevzuatın gerektirdiği diğer belgeler.</li>
            </ul>

            <B>İşleme amaçları</B>
            <ul>
              <li>Bilgi taleplerinin yanıtlanması ve ön kayıt işlemlerinin yürütülmesi,</li>
              <li>Eğitim kaydının yapılması ve eğitim hizmetinin sunulması,</li>
              <li>5188 sayılı Kanun ve ilgili yönetmelikten doğan yükümlülüklerin yerine getirilmesi (sınav başvurusu, sertifika işlemleri),</li>
              <li>Muhasebe ve faturalama işlemlerinin yürütülmesi.</li>
            </ul>

            <B>Hukuki sebepler</B>
            <p>
              Kişisel verileriniz; Kanun'un 5. maddesinde sayılan "sözleşmenin kurulması veya ifası", "veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi"
              ve "meşru menfaat" hukuki sebeplerine; sağlık raporu gibi özel nitelikli veriler bakımından ise ilgili mevzuatta açıkça öngörülmesine dayanılarak işlenir.
            </p>

            <B>Verilerin saklanması ve aktarılması</B>
            <p>
              İletişim formundan gönderdiğiniz mesajlar, sitenin barındırıldığı bulut sunucularında ve veritabanında saklanır; bu hizmet sağlayıcıların
              sunucuları yurt dışında bulunabilir. Mesajınız ayrıca Kurum'a e-posta ile bildirilebilir. Kişisel verileriniz, mevzuatın zorunlu kıldığı
              hâllerde Emniyet Genel Müdürlüğü, İl Emniyet Müdürlüğü ve Valilik gibi yetkili kamu kurumlarına ve muhasebe hizmeti alınan mali müşavire
              aktarılabilir. Bunun dışında üçüncü kişilerle paylaşılmaz.
            </p>

            <B>Toplama yöntemi</B>
            <p>Verileriniz telefon, e-posta, bu sitedeki iletişim formu ve kurumda doldurulan kayıt belgeleri aracılığıyla toplanır.</p>

            <B>Haklarınız</B>
            <p>Kanun'un 11. maddesi uyarınca Kurum'a başvurarak;</p>
            <ul>
              <li>kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme,</li>
              <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>Kanun'daki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
              <li>işlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
            <p>
              haklarına sahipsiniz. Başvurularınızı yukarıdaki adrese yazılı olarak veya Kurum'un e-posta adresine iletebilirsiniz.
              Başvurular en geç otuz gün içinde sonuçlandırılır.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default KvkkPage;
