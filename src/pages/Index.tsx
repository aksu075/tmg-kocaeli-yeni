import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import LatestAnnouncements from "@/components/LatestAnnouncements";
import ContactCTA from "@/components/ContactCTA";
import SikSorulanlar from "@/components/SikSorulanlar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { hash } = useLocation();

  // Başka sayfadan dönünce sekme başlığı ve açıklama ana sayfanınkine döner
  useEffect(() => {
    document.title = "TMG Güvenlik Eğitim Kurumu | Özel Güvenlik Eğitimi - Kocaeli";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "TMG Güvenlik Eğitim Kurumu - İzmit'te silahlı ve silahsız özel güvenlik eğitimi, yenileme eğitimi. İçişleri Bakanlığı onaylı sertifika programları.");
  }, []);

  // Menüden "SSS"ye basılınca (/#sss) ilgili bölüme kaydır
  useEffect(() => {
    if (!hash) return;
    const git = () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    // Üstteki bölümler (kurslar, duyurular) yüklenince sayfa uzar; konum bir kez daha düzeltilir
    const duzelt = () => {
      const el = document.getElementById(hash.slice(1));
      if (el && Math.abs(el.getBoundingClientRect().top - 80) > 40) el.scrollIntoView({ behavior: "auto" });
    };
    const t1 = setTimeout(git, 300);
    const t2 = setTimeout(duzelt, 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [hash]);

  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedCourses />
      <LatestAnnouncements />
      <SikSorulanlar />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
