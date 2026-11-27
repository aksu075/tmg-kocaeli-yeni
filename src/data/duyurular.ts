// Başlangıç duyuruları: Emniyet Genel Müdürlüğü'nün (Özel Güvenlik Denetleme Daire Başkanlığı)
// kendi duyuruları. Her biri EGM'deki asıl sayfaya bağlanır.
// Veritabanında hiç duyuru yoksa sitede bunlar gösterilir. Yönetim panelindeki
// "EGM duyurularını ekle" düğmesi bunları veritabanına kaydeder; sonra panelden
// düzenlenip silinebilir.

const EGM = "https://www.egm.gov.tr/ozelguvenlik/";

export const baslangicDuyurulari = [
  {
    title: "Tüm Adayların ve Eğitim Kurumlarının Dikkatine: 2027'nin İlk Sınavı",
    summary:
      "EGM, 125. Temel ve 101. Yenileme Eğitimi Sınavı'nın 21 Şubat 2027 Pazar günü yapılacağını duyurdu. Eğitimlerin bitiş tarihi 15 Ocak 2027.",
    link: EGM + "tum-adaylarin-ve-egitim-kurumlarinin-dikkatine-2411",
    publishDate: "2026-11-24",
  },
  {
    title: "123. Temel Eğitim Sınavı Sonuçlarına İtirazların Sonuçları Açıklandı",
    summary: "123. Temel Eğitim Sınavı'na yapılan itirazların sonuçları EGM tarafından açıklandı.",
    link: EGM + "ozel-guvenlik-123-temel-egitim-sinav-sonuclarina-itiraz-sonuclari-aciklanmistir",
    publishDate: "2026-11-19",
  },
  {
    title: "123. Temel ve 99. Yenileme Eğitimi Sınav Sonuçları Açıklandı",
    summary: "123. Temel ve 99. Yenileme Eğitimi Sınavı'nın sonuçları EGM tarafından açıklandı.",
    link: EGM + "ozel-guvenlik-123-temel-egitim-ve-99-yenileme-egitimi-sinav-sonuclari-aciklanmistir",
    publishDate: "2026-11-13",
  },
  {
    title: "123. Temel ve 99. Yenileme Eğitimi Sınavı Başarı İstatistikleri Yayımlandı",
    summary: "Sınavın başarı istatistikleri EGM tarafından yayımlandı.",
    link: EGM + "ozel-guvenlik-123-temel-egitim-ve-99-yenileme-egitimi-sinavi-basari-istatistikleri-yayimlanmistir",
    publishDate: "2026-11-13",
  },
  {
    title: "124. Temel ve 100. Yenileme Eğitimi Sınav Kılavuzu Yayımlandı",
    summary: "27 Aralık 2026'da yapılacak sınavın kılavuzu yayımlandı.",
    link: EGM + "ozel-guvenlik-124-temel-egitim-ve-100-yenileme-egitimi-sinavina-ait-sinav-kilavuzu-yayimlanmistir",
    publishDate: "2026-11-13",
  },
  {
    title: "123. Temel ve 99. Yenileme Eğitimi Sınavı Soru Kitapçıkları ve Cevap Anahtarları Yayımlandı",
    summary: "Sınavın soru kitapçıkları ve cevap anahtarları EGM'nin sayfasından incelenebilir.",
    link: EGM + "ozel-guvenlik-123-temel-egitim-ve-99-yenileme-egitimi-sinavina-ait-soru-kitapciklari-ve-cevap-anahtarlari-yayimlanmistir",
    publishDate: "2026-10-27",
  },
].map((d, i) => ({
  ...d,
  _id: `egm-${i + 1}`,
  content: d.summary,
  image: "",
  isPinned: false,
  isPublished: true,
}));
