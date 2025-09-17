import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HorizontalCarShowcase from "@/components/HorizontalCarShowcase";
import HolidayPackages from "@/components/HolidayPackages";
import MapSection from "@/components/MapSection";
import Reviews from "@/components/Reviews";
import LuxuryBanner from "@/components/LuxuryBanner";
import LatestBlogs from "@/components/LatestBlogs";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      <HorizontalCarShowcase 
        title="Our Premium Fleet"
        subtitle="Discover our collection of luxury vehicles, each meticulously maintained and ready for your journey."
        maxCars={20}
        showAll={true}
      />
      <HolidayPackages />
      <MapSection />
      <Reviews />
      <LuxuryBanner />
      <LatestBlogs count={3} showTitle={true} variant="homepage" />
      <Footer />
    </div>
  );
};

export default Index;
