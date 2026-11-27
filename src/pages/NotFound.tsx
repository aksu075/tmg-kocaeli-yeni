
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
        <h1 className="text-7xl font-bold text-tmg-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-tmg-dark">Sayfa Bulunamadı</h2>
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız sayfa taşınmış, kaldırılmış veya hiç var olmamış olabilir.
        </p>
        <Button asChild className="bg-tmg-primary">
          <Link to="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
