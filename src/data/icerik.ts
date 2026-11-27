// ==========================================
// Yönetim panelinden düzenlenen içeriklerin varsayılanları
// Panelde bir içerik hiç kaydedilmediyse site bu değerleri gösterir.
// Panelde "Kaydet"e basıldığı anda veritabanındaki değer geçerli olur.
// ==========================================

export const SINAV_SONUC_ADRESI = "https://onlineislemler.egm.gov.tr/ozelguvenlik/Sayfalar/sinavsonuc.aspx";
export const KIMLIK_BASVURU_ADRESI = "https://www.turkiye.gov.tr/emniyet-ozel-guvenlik-kimlik-karti-basvurulari";
// Kocaeli İl Emniyet Müdürlüğü özel güvenlik işlemleri randevusu
export const RANDEVU_ADRESI = "https://onlineislemler.egm.gov.tr/Kocaeli/Sayfalar/ozelguvenlikrandevu.aspx";

// Kocaeli İl Emniyet Müdürlüğü'nün yayımladığı dilekçe örnekleri (Word dosyası)
const KOCAELI_EMNIYET = "https://www.kocaeli.pol.tr/kurumlar/kocaeli.pol.tr/Ozel-Guvenlik/";
export const dilekceler = [
  { baslik: "Temel eğitim başvuru dilekçesi", aciklama: "Silahlı ya da silahsız temel eğitime ilk kez başlayacaklar için.", adres: KOCAELI_EMNIYET + "1-Temel-Egitim-Dilekce-Ornegi-_Yeni_.docx" },
  { baslik: "Yenileme eğitimi dilekçesi", aciklama: "Kimlik kartının süresi dolmak üzere olanlar için.", adres: KOCAELI_EMNIYET + "2-Yenileme-Egitim-Dilekce-Ornegi-_Yeni_.docx" },
  { baslik: "Kimlik kartını silahlıya yükseltme dilekçesi", aciklama: "Silahsız kimlik kartını silahlıya çevirmek isteyenler için.", adres: KOCAELI_EMNIYET + "5-Kimlik--Yukseltmek-Icin-Dilekce-Ornegi.docx" },
  { baslik: "Güvenlik meslek yüksekokulu mezunları dilekçesi", aciklama: "Güvenlik bölümü mezunlarının kimlik kartı başvurusu için.", adres: KOCAELI_EMNIYET + "4-Guvenlik-MesYuk-Okulu-Dilekcesi_Yeni_.docx" },
];

// ---- Site bilgileri
export interface SiteBilgileri {
  telefon1: string;
  telefon2: string;
  eposta: string;
  adres1: string;
  adres2: string;
  adres3: string;
  saat: string;
  kapali: string;
  mezun: string;
  basari: string;
  ortaklik: string;
}

export const varsayilanSite: SiteBilgileri = {
  telefon1: "0262 325 20 30",
  telefon2: "0533 968 01 21",
  eposta: "tmgguvenlik@hotmail.com.tr",
  adres1: "Ömerağa Mah. Şabettin Bilgisu Cad.",
  adres2: "Koruma İşhanı No:35 Kat:1/7-8-9-10-11-12",
  adres3: "İzmit, Kocaeli",
  saat: "Pazartesi - Cumartesi: 09:00 - 18:00",
  kapali: "Pazar: Kapalı",
  mezun: "5000+",
  basari: "%95",
  ortaklik: "50+",
};

// "0262 325 20 30" -> "tel:+902623252030"
export const telBaglanti = (no: string) => {
  const r = no.replace(/\D/g, "");
  if (!r) return "";
  return "tel:+90" + (r.startsWith("90") ? r.slice(2) : r.startsWith("0") ? r.slice(1) : r);
};

// ---- Devlet harçları
export interface HarcKalemi {
  ad: string;
  nereye: string;
  aciklama: string;
  silahsiz: number;
  silahli: number;
  yenilemede: boolean;
}

export interface Harclar {
  yil: string;
  gecerlilik: string;
  not: string;
  kalemler: HarcKalemi[];
}

export const varsayilanHarclar: Harclar = {
  yil: "2026",
  gecerlilik: "31 Aralık 2026",
  not: "Bu tutarlar devlete ödenir ve hangi kursa giderseniz gidin aynıdır. Kurs ücretine dahil değildir.",
  kalemler: [
    { ad: "Sağlık kurulu raporu", nereye: "Devlet hastanesi", aciklama: "\"Özel güvenlik görevlisi olur\" ibareli rapor", silahsiz: 1750, silahli: 1750, yenilemede: false },
    { ad: "Sınav ücreti", nereye: "Halkbank", aciklama: "Sınav başvurusu sırasında yatırılır", silahsiz: 600, silahli: 750, yenilemede: true },
    { ad: "Vergi dairesi harcı", nereye: "Vergi dairesi", aciklama: "Yalnızca sınavı geçenler, kimlik kartı başvurusunda öder", silahsiz: 8500, silahli: 8500, yenilemede: false },
    { ad: "Kimlik kartı ücreti", nereye: "Emniyet Müdürlüğü", aciklama: "Kart basım bedeli", silahsiz: 550, silahli: 550, yenilemede: true },
  ],
};

// ---- Sınav takvimi
export interface Sinav {
  tarih: string; // YYYY-AA-GG
  temel: string;
  yenileme: string;
}

export interface SinavYili {
  yil: string;
  sinavlar: Sinav[];
}

export interface Takvim {
  not: string;
  yillar: SinavYili[];
}

export const varsayilanTakvim: Takvim = {
  not: "Sınav tarihlerini Emniyet Genel Müdürlüğü belirler; değişiklik olabilir. Sınavdan önce tarihinizi kurumumuzdan teyit edin.",
  yillar: [
    {
      yil: "2026",
      sinavlar: [
        { tarih: "2026-02-22", temel: "119. Temel", yenileme: "95. Yenileme" },
        { tarih: "2026-05-03", temel: "120. Temel", yenileme: "96. Yenileme" },
        { tarih: "2026-07-05", temel: "121. Temel", yenileme: "97. Yenileme" },
        { tarih: "2026-08-29", temel: "122. Temel", yenileme: "98. Yenileme" },
        { tarih: "2026-10-24", temel: "123. Temel", yenileme: "99. Yenileme" },
        { tarih: "2026-12-27", temel: "124. Temel", yenileme: "100. Yenileme" },
      ],
    },
    {
      yil: "2027",
      sinavlar: [
        { tarih: "2027-02-21", temel: "125. Temel", yenileme: "101. Yenileme" },
      ],
    },
  ],
};

// ---- Sık sorulan sorular
export interface Soru {
  soru: string;
  cevap: string;
}

export interface SSS {
  sorular: Soru[];
}

export const varsayilanSSS: SSS = {
  sorular: [
    {
      soru: "Özel güvenlik görevlisi olmak için şartlar neler?",
      cevap:
        "T.C. vatandaşı olmak gerekir. Silahsız görev için 18 yaşını doldurmuş ve en az sekiz yıllık ilköğretim (ortaokul) mezunu olmak; silahlı görev için 21 yaşını doldurmuş ve en az lise mezunu olmak gerekir. Ayrıca kanunda sayılan suçlardan mahkûmiyetiniz bulunmamalı ve \"özel güvenlik görevlisi olur\" ibareli sağlık kurulu raporu almanız gerekir. Adli sicil kaydınız varsa rapora para vermeden önce bizi arayın.",
    },
    {
      soru: "Eğitimler kaç saat sürüyor?",
      cevap:
        "Temel eğitim silahlı için 120 saat (100 saat teorik, 20 saat silah), silahsız için 100 saattir. Yenileme eğitimi silahlı için 60 saat, silahsız için 50 saattir. Ders günleri ve saatleri her dönem için ayrıca belirlenir; yeni dönemin programını bizden öğrenebilirsiniz.",
    },
    {
      soru: "Derslere devam zorunlu mu?",
      cevap:
        "Evet. Eğitim süresince derslere devam zorunludur ve her ders için ayrı yoklama tutulur. Devamsızlık sınırını aşan adaylar sınava gönderilemez.",
    },
    {
      soru: "Emekli polis ve askerler eğitim almak zorunda mı?",
      cevap:
        "Genel kolluktan veya MİT'ten emekli olanlardan temel eğitim şartı aranmaz. Ancak kimlik kartının geçerli kalması için beş yılda bir yenileme eğitimi almaları gerekir.",
    },
    {
      soru: "Üniversitelerin güvenlik bölümü mezunları temel eğitim almak zorunda mı?",
      cevap:
        "Hayır. Üniversitelerin güvenlikle ilgili bölümlerinden mezun olanlardan temel eğitim şartı aranmaz. Silahlı kimlik kartı almak isteyenlerin yalnızca silah eğitimini almaları yeterlidir.",
    },
    {
      soru: "Sınav tarihlerini nereden öğrenebilirim?",
      cevap:
        "Sınav tarihlerini Emniyet Genel Müdürlüğü belirler; yılda altı sınav yapılır. Güncel tarihler Sınav Takvimi sayfamızda yer alır.",
    },
    {
      soru: "Sınavı geçmek için kaç puan gerekir?",
      cevap:
        "Silahsız adayların 100 soruluk sınavdan en az 60 puan alması gerekir. Silahlı adaylarda temel bölümden en az 50, silah bölümünden (yazılı ve atış) en az 50 puan alınmalı ve iki bölümün ortalaması en az 60 olmalıdır. Yanlış cevaplar doğruları götürmez.",
    },
    {
      soru: "Sınavda başarısız olursam kaç hakkım var?",
      cevap:
        "Eğitimi tamamladıktan sonraki ilk altı sınava girme hakkınız vardır. Her sınav için sınav ücreti yeniden yatırılır. Altı sınavda da başarısız olanların yeniden eğitim alması gerekir.",
    },
    {
      soru: "Sınava kaydım yapılıp girmezsem hakkım yanar mı?",
      cevap: "Evet. Kaydınız yapıldığı hâlde sınava girmezseniz o sınav hakkınızı kullanmış sayılırsınız.",
    },
    {
      soru: "Silahlı sınavda başarısız olursam silahsız sertifika alabilir miyim?",
      cevap:
        "Evet. Temel bölümden 60 ve üzeri puan alıp silah bölümünden başarısız olursanız, isterseniz silahsız sertifika alabilirsiniz. Dilerseniz kalan sınav haklarınızla silah bölümüne yeniden girebilirsiniz.",
    },
    {
      soru: "Sınav sonuçları ne zaman ve nereden öğrenilir?",
      cevap:
        "Sonuçların açıklanma tarihi Emniyet Genel Müdürlüğü'nün sınav talimatında yer alır. Sonucunuzu T.C. kimlik numaranızla Emniyet'in sınav sonucu sorgulama sayfasından öğrenebilirsiniz; bağlantı Sınav Takvimi sayfamızdadır.",
    },
    {
      soru: "Sertifika ve kimlik kartı ne kadar geçerli? Kimlik kartına nasıl başvurulur?",
      cevap:
        "Sertifika ve özel güvenlik kimlik kartı beş yıl geçerlidir ve Türkiye genelinde kullanılır. Sınavı geçtikten sonra kimlik kartı başvurusu e-Devlet üzerinden yapılır.",
    },
    {
      soru: "Yenileme eğitimine ne zaman başvurmalıyım?",
      cevap:
        "Kimlik kartınızın süresi dolmadan yenileme eğitimini tamamlamanız gerekir. Sınav ve kart işlemleri zaman aldığı için kartın bitmesine en az altı ay kala başvurmanızı öneririz.",
    },
    {
      soru: "Yenilemede sağlık raporu isteniyor mu? Sınavda kalma var mı?",
      cevap:
        "Yenileme için yeniden sağlık raporu istenmez. Yenileme sınavı seviye tespiti içindir; baraj puanı yoktur. Eğitimi tamamlayıp sınava girmeniz yeterlidir.",
    },
    {
      soru: "Silahsız kimliğimi silahlıya çevirebilir miyim?",
      cevap:
        "Evet. Silah fark eğitimini alıp sınavın silah bölümünden başarılı olursanız kimliğiniz silahlıya çevrilir. Bunun için silahlı görev şartlarını (21 yaş, lise mezuniyeti, silahlı ibareli sağlık raporu) taşımanız gerekir.",
    },
  ],
};
