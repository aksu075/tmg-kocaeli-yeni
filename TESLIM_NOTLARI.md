# Teslim notları

Bu sürüm, canlıdaki sitenin (tmgkocaeli.com) kodu üzerinde yapılan düzeltme ve eklemeleri içerir. Tasarım aynı kaldı.

## Webmaster: yayına alırken yapılacaklar

1. **Yönetim paneli şifresini değiştirin.** Eski kodda varsayılan şifre açıkça yazılıydı ve hâlâ geçerliydi. Yeni sürümü yayına aldıktan sonra panele girip **Şifre Değiştir** ekranından değiştirin (en az 10 karakter).
2. **Vercel'de `JWT_SECRET` tanımlı olmalı** (en az 32 karakterlik rastgele bir metin). Eski kod bu değişken yoksa herkesin bildiği `"secret"` değerini kullanıyordu; yeni kod bu durumda panele girişi reddeder. Değişkeni değiştirirseniz paneldeki açık oturumlar kapanır, yeniden giriş yapılır.
3. **`SEED_SECRET` artık kullanılmıyor**, Vercel'den silinebilir.
4. **Yeni mesaj bildirimi için (isteğe bağlı):**
   - resend.com'da ücretsiz hesap açın; bildirimin gideceği e-posta adresiyle açılması en kolayı.
   - **API Keys** bölümünden bir anahtar oluşturun.
   - Vercel'e iki değişken ekleyin: `RESEND_API_KEY` (anahtar) ve `BILDIRIM_EPOSTA` (bildirimin gideceği adres).
   - Alan adı Resend'de doğrulanmadıkça bildirim yalnızca Resend hesabını açan adrese gider.
   - Değişkenler boşsa sistem çalışmaya devam eder; mesajlar yalnızca panelde görünür.
5. Yayından sonra `https://www.tmgkocaeli.com/api/test` adresi 404 vermeli.

Sunucu fonksiyonu sayısı 10'dur (Vercel ücretsiz planında sınır 12).

## Webmaster: panelden bir kez yapılacak düzeltmeler

Kurs bilgileri veritabanındadır; panelde **Kurslar** ekranından düzeltilir.

| Kurs | Şu an | Olması gereken |
|---|---|---|
| Silahlı | Temel Silahli Ozel Guvenlik Eğitimi | Temel Silahlı Özel Güvenlik Eğitimi |
| Silahsız | Silahsiz Temel Eğitim Kursu | Temel Silahsız Özel Güvenlik Eğitimi |
| Silahlı yenileme | SİLAHLI YENİLEME EĞİTİMİ | Silahlı Yenileme Eğitimi |
| Silahsız yenileme | Silahsız Yenileme Eğitimi Kursu | Silahsız Yenileme Eğitimi |

- **Silahsız yenileme süresi:** "50" yerine "50 saat".
- **Silahsız temel eğitim, öğrenim şartı:** "En az ilkokul mezunu olmak" yerine "En az sekiz yıllık ilköğretim (ortaokul) mezunu olmak" (5188 sayılı Kanun md. 10/b).
- **Açıklamalar ve ders adları:** Türkçe karakterler eksik ("Ozel Guvenlik Hukuku", "Ilk Yardim" vb.). Doğru yazımlar `src/data/courses.ts` içinde.
- **Yenileme eğitimlerinin belge listesi:** Şu an "Başvuru Koşulları" alanında duruyor. Bu maddeler yeni **Kayıt İçin Gerekli Belgeler** alanına taşınmalı.
- **Temel eğitimlerin belge listesi:** Kurumdan alınıp aynı alana girilmeli.
- **Silah fark eğitimi:** Kurs olarak eklenmeli (süre, ücret, şartlar ve belgeler kurumdan).
- **Silahlı kurs görseli:** Üzerinde "YALOVA" yazıyor; istenirse değiştirilir.

## Kodda yapılan değişiklikler

**Güvenlik**
- `api/test.ts` ve `api/seed.ts` kaldırıldı.
- `JWT_SECRET || "secret"` yedeği kaldırıldı.
- Panele şifre değiştirme ekranı eklendi.
- Mesaj güncellemesinde yalnızca "okundu" bilgisi değiştirilebiliyor.

**İletişim formu**
- E-posta yazılmayan mesajlar artık kaybolmuyor (önceden sunucu reddediyor, ziyaretçiye yine de "gönderildi" deniyordu).
- Seçilen kurs kaydediliyor.
- Hata olursa ziyaretçiye söyleniyor ve yazdıkları silinmiyor.
- İsteğe bağlı e-posta bildirimi eklendi; forma KVKK bilgilendirmesi eklendi.

**Yeni sayfalar**
- `/ucretler`: kurs ücretleri ve devlet harçları, toplam maliyet ve yenilemede ödenenler.
- `/sinav-takvimi`: yıla göre sınavlar, sonuç sorgulama ve e-Devlet kimlik kartı bağlantıları.
- **Sık Sorulan Sorular** ana sayfada ayrı bir bölüm: ilk 5 soru görünür, "Tüm soruları gör" ile hepsi açılır. Hızlı erişimdeki ve alt bilgideki SSS bağlantısı bu bölüme götürür; eski `/sss` adresi de buraya yönlenir. Google için soru-cevap işaretlemesi var.
- `/kvkk`: aydınlatma metni.
- `/puan-hesaplama`: silahsız, silahlı ve silah fark sınavı için puan hesaplama aracı.
- `/basvuru-sartlari`: yaş, öğrenim, sağlık raporu ve adli sicil engelleri.
- `/belge-ve-dilekceler`: Kocaeli İl Emniyet Müdürlüğü'nün dilekçe örnekleri (dosyalar emniyetin sitesinden iner) ve emniyet randevu bağlantısı. Dilekçe listesi panelden düzenlenir.
- `/kurumsal-egitim`: kurum ve firmalara toplu temel ve yenileme eğitimi; süreç, kimler için ve teklif. Kurslar sayfasındaki "Özel Eğitim Talebi" bölümünden ve alt bilgiden bağlanır. "Teklif İsteyin" iletişim formunu "Kurumsal eğitim teklifi" konusuyla açar.
- Ana sayfada **Hızlı Erişim** kutuları: sınav sonuçları, puan hesaplama, başvuru şartları, sınav takvimi, belge ve dilekçeler, emniyet randevusu, e-Devlet kimlik kartı, ücretler ve SSS.

**Yeni panel ekranları**
- **Sınav Takvimi:** "Yeni yıl ekle" ile yeni yılın tarihleri girilir.
- **Harçlar**
- **Sık Sorulan Sorular:** sıra oklarla değiştirilir.
- **Site Bilgileri:** telefon, adres, saatler ve ana sayfa rakamları.
- **Belge ve Dilekçeler:** dilekçe başlığı, açıklaması ve dosya bağlantısı. Emniyet dosyanın adını değiştirirse bağlantı buradan güncellenir.
- **Şifre Değiştir**
- Panelde bir içerik hiç kaydedilmediyse site `src/data/icerik.ts` içindeki başlangıç içeriğini gösterir.

**Mevcut ekranlara eklenenler**
- **Kurslar:** "Kayıt İçin Gerekli Belgeler" alanı. Kurs sayfasında boş bölümler artık görünmüyor.
- **Duyurular:** "Bağlantı" alanı. Doluysa duyuruya basan ziyaretçi o sayfaya gider (EGM duyuruları için).

**Duyurular**
- Veritabanında hiç duyuru yoksa sitede EGM'nin son 6 duyurusu gösterilir (`src/data/duyurular.ts`); her biri EGM'deki asıl sayfaya gider.
- Panelde **Duyurular** ekranı boşken çıkan **EGM duyurularını panele ekle** düğmesi bunları veritabanına kaydeder; sonra panelden düzenlenir ya da silinir.
- Sınav takvimine 2027'nin ilk sınavı (21 Şubat 2027, 125. Temel ve 101. Yenileme) eklendi.

**Görünüm**
- Menüye Ücretler ve Sınav Takvimi eklendi (SSS menüde değil, hızlı erişimde); menü 1024 piksel ve üzerinde tek satır, altında açılır menü.
- Telefonda kurs sekmeleri tam okunuyor.
- İletişim sayfasında telefon ve e-posta tıklanabilir.

**Google**
- Gebze ifadeleri kaldırıldı.
- Her sayfaya kendi açıklaması verildi.
- `sitemap.xml` eklendi ve `robots.txt` içine yazıldı.

**Yedek veri**
- Veritabanına ulaşılamazsa gösterilen eski bilgiler (2.500 TL vb.) güncellendi.

## Açık kalanlar

- **Logo:** Artık sitenin kendi dosyası (`public/logo.png`); başka siteden yüklenmiyor. Şube adı olmayan bir logo istenirse aynı adla değiştirmek yeterli.
- **KVKK metni:** Bir hukukçunun gözden geçirmesi önerilir.
- **Facebook sayfası:** `index.html` içinde Google'a bildirilen `facebook.com/tmgyozelguvenlikegitimkurumu` adresinin kurumun kendi sayfası olduğu teyit edilmeli; değilse `sameAs` satırı silinmeli.
