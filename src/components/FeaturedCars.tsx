import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Fuel, Zap, ChevronLeft, ChevronRight, Eye, Calendar } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroCarImage from "@/assets/streatch limos/IMG-20250906-WA0108.jpg";
import sportsCarImage from "@/assets/streatch limos/IMG-20250906-WA0113.jpg";
import suvCarImage from "@/assets/luxary chaffaur/IMG-20250906-WA0118.jpg";
import limousineImage from "@/assets/luxary chaffaur/IMG-20250906-WA0122.jpg";

const FeaturedCars = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const featuredCars = [
    {
      id: 1,
      name: "Mercedes S-Class",
      category: "Luxury Sedan",
      image: heroCarImage,
      price: 150,
      rating: 5.0,
      features: ["4 Seats", "Gasoline", "Automatic", "GPS", "AC", "Bluetooth"],
      specs: {
        engine: "3.0L V6 Turbo",
        power: "429 HP",
        transmission: "9-Speed Automatic",
        fuelType: "Premium Gasoline"
      },
      description: "Experience ultimate luxury with our flagship Mercedes S-Class. Perfect for business meetings and special occasions."
    },
    {
      id: 2,
      name: "Ferrari 488 Spider",
      category: "Sports Car",
      image: sportsCarImage,
      price: 500,
      rating: 4.9,
      features: ["2 Seats", "Gasoline", "Automatic", "GPS", "Premium Audio"],
      specs: {
        engine: "3.9L V8 Twin-Turbo",
        power: "661 HP",
        transmission: "7-Speed Dual-Clutch",
        fuelType: "Premium Gasoline"
      },
      description: "Feel the thrill of Italian engineering with this stunning Ferrari 488 Spider convertible."
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      category: "Luxury SUV",
      image: suvCarImage,
      price: 200,
      rating: 4.8,
      features: ["8 Seats", "Gasoline", "Automatic", "4WD", "Entertainment System"],
      specs: {
        engine: "6.2L V8",
        power: "420 HP",
        transmission: "10-Speed Automatic",
        fuelType: "Premium Gasoline"
      },
      description: "Spacious and luxurious SUV perfect for family trips and group transportation."
    },
    {
      id: 4,
      name: "Rolls-Royce Phantom",
      category: "Ultra Luxury",
      image: limousineImage,
      price: 800,
      rating: 5.0,
      features: ["4 Seats", "Gasoline", "Automatic", "Champagne Bar", "Massage Seats"],
      specs: {
        engine: "6.75L V12 Twin-Turbo",
        power: "563 HP",
        transmission: "8-Speed Automatic",
        fuelType: "Premium Gasoline"
      },
      description: "The pinnacle of luxury automotive excellence. Reserved for the most special occasions."
    },
    {
      id: 5,
      name: "BMW i8 Roadster",
      category: "Hybrid Sports",
      image: sportsCarImage,
      price: 400,
      rating: 4.7,
      features: ["2 Seats", "Hybrid", "Automatic", "GPS", "Sport Mode"],
      specs: {
        engine: "1.5L Turbo + Electric",
        power: "369 HP",
        transmission: "6-Speed Automatic",
        fuelType: "Hybrid"
      },
      description: "Revolutionary hybrid sports car that combines performance with environmental consciousness."
    },
    {
      id: 6,
      name: "Lincoln Navigator",
      category: "Premium SUV",
      image: suvCarImage,
      price: 180,
      rating: 4.6,
      features: ["8 Seats", "Gasoline", "Automatic", "GPS", "Premium Audio"],
      specs: {
        engine: "3.5L V6 Twin-Turbo",
        power: "450 HP",
        transmission: "10-Speed Automatic",
        fuelType: "Premium Gasoline"
      },
      description: "American luxury SUV with commanding presence and premium comfort features."
    }
  ];

  const getIcon = (feature: string) => {
    if (feature.includes("Seats")) return <Users className="h-4 w-4" />;
    if (feature.includes("Gasoline") || feature.includes("Hybrid")) return <Fuel className="h-4 w-4" />;
    return <Zap className="h-4 w-4" />;
  };

  return (
    <section id="fleet" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase">RIDE IN ELEGANCE</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Exquisite Car Rental Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Indulge in luxury with our premium car rental services, designed for those who 
            appreciate elegance and exceptional experiences.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollLeft}
            className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </Button>
          <p className="text-sm text-muted-foreground">Scroll to explore our premium collection</p>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollRight}
            className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </Button>
        </div>
        
        {/* Featured Cars Horizontal Scroll */}
        <div ref={scrollContainerRef} className="flex flex-row gap-8 overflow-x-auto pb-4 scroll-smooth">
          {featuredCars.map((car) => (
            <div 
              key={car.id} 
              className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all duration-500 transform hover:scale-[1.02] cursor-pointer overflow-hidden border border-gray-700/50 backdrop-blur-sm flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px]"
            >
              {/* Image Container */}
              <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden rounded-t-xl">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                

                
                {/* Photos Badge */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-full">
                  <span className="text-white text-xs font-medium">5 Photos</span>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-[#d4af37]/90 to-[#f5e79e]/90 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 text-black fill-current" />
                  <span className="text-black text-xs font-bold">{car.rating}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#d4af37] mb-2 group-hover:text-[#f5e79e] transition-colors duration-200">
                  {car.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-full text-[#d4af37] text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Price & CTA */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#d4af37]">${car.price}</span>
                    <span className="text-gray-400 text-sm">/day</span>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/booking', { state: { selectedCar: car } })}
                    className="w-full py-2 px-3 bg-gradient-to-r from-[#d4af37] to-[#f5e79e] hover:from-[#f5e79e] hover:to-[#d4af37] text-black rounded-lg transition-all duration-300 font-medium text-sm hover:shadow-lg hover:shadow-yellow-400/30"
                  >
                    View Details & Book
                  </button>
                  <button 
                    onClick={() => navigate(`/fleet/${car.id}`)}
                    className="w-full py-2 px-3 bg-transparent border border-[#d4af37] text-white hover:bg-[#d4af37]/10 rounded-lg transition-all duration-300 font-medium text-sm"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => navigate('/fleet')}
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;