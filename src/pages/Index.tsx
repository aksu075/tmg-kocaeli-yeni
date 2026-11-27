import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedCourses from "@/components/FeaturedCourses";
import Features from "@/components/Features";
import LatestAnnouncements from "@/components/LatestAnnouncements";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <FeaturedCourses />
      <LatestAnnouncements />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
