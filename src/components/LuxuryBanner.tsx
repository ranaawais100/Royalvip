import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Star, Shield } from "lucide-react";
import limousineImage from "@/assets/luxary chaffaur/IMG-20250906-WA0122.jpg";

const LuxuryBanner = () => {
  const navigate = useNavigate();

  const handleCallNow = () => {
    window.open('tel:+971585859944', '_self');
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={limousineImage}
          alt="Luxury Limousine"
          className="w-full h-full object-cover scale-105"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/90"></div>
        {/* Golden Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-accent rounded-full animate-ping"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-8">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Premium Luxury Service</span>
            <Star className="h-4 w-4 text-primary fill-primary" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-foreground mb-2">Experience</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              Luxury Travel
            </span>
            <span className="block text-foreground text-4xl md:text-5xl lg:text-6xl mt-4">
              Across UAE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover the pinnacle of luxury transportation with our premium fleet and 
            professional chauffeur services. Every journey becomes an unforgettable experience.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-foreground font-semibold">Fully Licensed & Insured</span>
            </div>
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <span className="text-foreground font-semibold">5-Star Rated Service</span>
            </div>
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-foreground font-semibold">24/7 Availability</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={() => navigate('/booking')}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold px-8 py-4 text-lg shadow-luxury hover:shadow-2xl transition-all duration-300 group"
            >
              Book Your Luxury Ride
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              onClick={handleCallNow}
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 text-lg backdrop-blur-sm bg-background/80 hover:shadow-luxury transition-all duration-300"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +971585859944
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-muted-foreground mb-6 text-lg">
              Trusted by over 5,000+ satisfied customers across the UAE
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                <span className="text-primary font-semibold">Dubai • Abu Dhabi • Other Emirates</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                <span className="text-primary font-semibold">Airport Transfers • Events • Corporate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                <span className="text-primary font-semibold">Weddings • VIP Services • Tours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 fill-background"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
          opacity=".25"
        />
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
          opacity=".5"
        />
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
        />
      </svg>
      </div>
    </section>
  );
};

export default LuxuryBanner;