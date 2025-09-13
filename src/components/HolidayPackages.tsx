import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, Clock, Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

interface HolidayPackage {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  rating: number;
  highlights: string[];
  description: string;
}

const HolidayPackages = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const holidayPackages = [
    {
      id: 1,
      name: "Luxury Dhow Cruise",
      category: "Premium Experience",
      image: "https://images.unsplash.com/photo-1622465414896-fc4dc182adef?w=400&h=300&fit=crop&crop=center",
      price: 899,
      duration: "4 hours",
      groupSize: "Up to 8 people",
      rating: 4.9,
      highlights: ["5-Star Dinner Buffet", "Traditional Entertainment", "Marina Skyline Views", "Private VIP Seating"],
      description: "Experience Dubai's enchanting waterways aboard our luxury dhow, featuring gourmet dining and spectacular views of the illuminated skyline."
    },
    {
      id: 2,
      name: "Desert Dune Buggy Adventure",
      category: "Thrill Experience",
      image: "https://images.unsplash.com/photo-1625126590345-1acb66b89ff6?w=400&h=300&fit=crop&crop=center",
      price: 1299,
      duration: "6 hours",
      groupSize: "Up to 4 people",
      rating: 4.8,
      highlights: ["Professional Buggy Guide", "Desert Photography", "Sunset Views", "Safety Equipment"],
      description: "Navigate the majestic desert dunes in state-of-the-art buggies, combining adrenaline-pumping adventure with breathtaking desert landscapes."
    },
    {
      id: 3,
      name: "Abu Dhabi City Tour",
      category: "Cultural Experience",
      image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400&h=300&fit=crop&crop=center",
      price: 1099,
      duration: "8 hours",
      groupSize: "Up to 6 people",
      rating: 4.9,
      highlights: ["Sheikh Zayed Grand Mosque", "Emirates Palace", "Louvre Abu Dhabi", "Corniche Beach"],
      description: "Explore the capital's magnificent architecture, cultural landmarks, and luxury destinations with our premium guided tour."
    },
    {
      id: 2,
      name: "Dubai Creek Heritage",
      category: "Historical Journey",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop&crop=center",
      price: 729,
      duration: "6 hours",
      groupSize: "Up to 8 people",
      rating: 4.8,
      highlights: ["Traditional Dhow Cruise", "Gold & Spice Souks", "Al Fahidi District", "Dubai Museum"],
      description: "Journey through Dubai's rich heritage along the historic creek, experiencing traditional markets and cultural sites."
    },
    {
      id: 3,
      name: "Dubai Aquarium & Underwater Zoo",
      category: "Family Adventure",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center",
      price: 549,
      duration: "4 hours",
      groupSize: "Up to 10 people",
      rating: 4.7,
      highlights: ["Underwater Tunnel", "Shark Encounter", "Ray Lagoon", "Penguin Cove"],
      description: "Dive into an underwater world at one of the largest suspended aquariums, perfect for families and marine enthusiasts."
    },
    {
      id: 4,
      name: "Desert Safari Adventure",
      category: "Thrilling Experience",
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&h=300&fit=crop&crop=center",
      price: 919,
      duration: "7 hours",
      groupSize: "Up to 6 people",
      rating: 5.0,
      highlights: ["Dune Bashing", "Camel Riding", "Bedouin Camp", "Traditional BBQ Dinner"],
      description: "Experience the thrill of the Arabian desert with dune bashing, cultural activities, and a magical sunset dinner."
    },
    {
      id: 5,
      name: "Burj Khalifa & Dubai Mall",
      category: "Luxury Shopping",
      image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=300&fit=crop&crop=center",
      price: 659,
      duration: "5 hours",
      groupSize: "Up to 8 people",
      rating: 4.8,
      highlights: ["Burj Khalifa At The Top", "Dubai Mall Shopping", "Dubai Fountain Show", "Luxury Dining"],
      description: "Ascend the world's tallest building and enjoy premium shopping at Dubai Mall with VIP access and luxury experiences."
    },
    {
      id: 6,
      name: "Palm Jumeirah & Atlantis",
      category: "Island Paradise",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center",
      price: 1209,
      duration: "9 hours",
      groupSize: "Up to 6 people",
      rating: 4.9,
      highlights: ["Atlantis Resort", "Aquaventure Waterpark", "The Lost Chambers", "Luxury Beach Access"],
      description: "Discover the man-made wonder of Palm Jumeirah with exclusive access to Atlantis resort and its world-class attractions."
    },
    {
      id: 7,
      name: "Sharjah Cultural Tour",
      category: "Cultural Heritage",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      price: 699,
      duration: "6 hours",
      groupSize: "Up to 8 people",
      rating: 4.6,
      highlights: ["Sharjah Museum", "Al Noor Mosque", "Blue Souk", "Sharjah Art Foundation"],
      description: "Discover the cultural capital of UAE with its rich Islamic heritage, traditional architecture, and vibrant art scene."
    },
    {
      id: 8,
      name: "Fujairah Mountain & Beach",
      category: "Nature Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      price: 949,
      duration: "8 hours",
      groupSize: "Up to 6 people",
      rating: 4.7,
      highlights: ["Hajar Mountains", "Fujairah Fort", "Al Bidyah Mosque", "Khor Fakkan Beach"],
      description: "Experience the natural beauty of UAE's eastern coast with stunning mountains, pristine beaches, and historical sites."
    },
    {
      id: 9,
      name: "Ras Al Khaimah Adventure",
      category: "Adventure Sports",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop&crop=center",
      price: 1279,
      duration: "10 hours",
      groupSize: "Up to 4 people",
      rating: 4.8,
      highlights: ["Jebel Jais Zipline", "Via Ferrata", "RAK National Museum", "Dhayah Fort"],
      description: "Thrill-seekers paradise with the world's longest zipline, mountain adventures, and rich Emirati heritage."
    },
    {
      id: 10,
      name: "Ajman & Umm Al Quwain",
      category: "Hidden Gems",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      price: 619,
      duration: "5 hours",
      groupSize: "Up to 8 people",
      rating: 4.5,
      highlights: ["Ajman Museum", "UAQ Marine Club", "Dreamland Aqua Park", "Traditional Fishing Villages"],
      description: "Explore the lesser-known emirates with their authentic charm, traditional lifestyle, and peaceful coastal beauty."
    },
    {
      id: 11,
      name: "Al Ain Oasis City",
      category: "UNESCO Heritage",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      price: 1029,
      duration: "9 hours",
      groupSize: "Up to 6 people",
      rating: 4.8,
      highlights: ["Al Ain Oasis", "Jebel Hafeet", "Al Ain Zoo", "Hili Archaeological Park"],
      description: "Journey to UAE's garden city, a UNESCO World Heritage site with ancient oases, archaeological wonders, and natural springs."
    },
    {
      id: 12,
      name: "Dubai Marina & JBR",
      category: "Modern Luxury",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop&crop=center",
      price: 729,
      duration: "6 hours",
      groupSize: "Up to 8 people",
      rating: 4.7,
      highlights: ["Dubai Marina Walk", "JBR Beach", "Ain Dubai", "Marina Mall"],
      description: "Experience Dubai's modern waterfront lifestyle with luxury yachts, pristine beaches, and world-class dining."
    },
    {
      id: 13,
      name: "Hatta Mountain Retreat",
      category: "Mountain Escape",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
      price: 229,
      duration: "7 hours",
      groupSize: "Up to 6 people",
      rating: 4.6,
      highlights: ["Hatta Dam", "Heritage Village", "Mountain Biking", "Kayaking"],
      description: "Escape to the tranquil Hajar Mountains with outdoor adventures, cultural heritage, and breathtaking landscapes."
    },
    {
      id: 14,
      name: "Dubai Frame & Downtown",
      category: "Architectural Marvel",
      image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=300&fit=crop&crop=center",
      price: 159,
      duration: "4 hours",
      groupSize: "Up to 10 people",
      rating: 4.5,
      highlights: ["Dubai Frame", "DIFC", "Opera District", "City Walk"],
      description: "Marvel at Dubai's architectural evolution from the iconic Dubai Frame, showcasing old and new Dubai in one spectacular view."
    },
    {
      id: 15,
      name: "Liwa Oasis Desert",
      category: "Desert Expedition",
      image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=400&h=300&fit=crop&crop=center",
      price: 399,
      duration: "12 hours",
      groupSize: "Up to 4 people",
      rating: 4.9,
      highlights: ["Moreeb Dune", "Liwa Oasis", "Qasr Al Sarab", "Fossil Rock"],
      description: "Venture into the legendary Empty Quarter with towering sand dunes, ancient oases, and luxury desert experiences."
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleBookNow = (packageItem: HolidayPackage) => {
    navigate('/booking', { state: { selectedPackage: packageItem } });
  };

  // Duplicate packages for seamless infinite scroll
  const duplicatedPackages = [...holidayPackages, ...holidayPackages];

  // Perfect infinite auto-scroll from right to left
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let isPaused = false;
    const scrollSpeed = 1.5; // Smooth scrolling speed

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Calculate when to reset for seamless loop
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const resetPoint = maxScrollLeft / 2; // Reset at halfway point (end of first set)
        
        if (scrollContainer.scrollLeft >= resetPoint) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation with a small delay to ensure DOM is ready
    const startAnimation = () => {
      animationId = requestAnimationFrame(animate);
    };
    
    setTimeout(startAnimation, 100);

    // Pause animation on hover for better UX
    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    // Pause on touch for mobile
    const handleTouchStart = () => {
      isPaused = true;
    };

    const handleTouchEnd = () => {
      isPaused = false;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase text-sm">
            EXCLUSIVE EXPERIENCES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Plan Your Perfect
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Holiday
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover UAE's most spectacular destinations with our curated holiday packages, 
            combining luxury transportation with unforgettable experiences.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollLeft}
            className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </Button>
          <p className="text-sm text-muted-foreground font-medium">
            ✨ Auto-scrolling • Hover or touch to pause
          </p>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={scrollRight}
            className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </Button>
        </div>

        {/* Holiday Packages Carousel */}
        <div className="relative">

          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{ 
              scrollBehavior: 'auto',
              width: '100%',
              minWidth: '100%'
            }}
          >
            {duplicatedPackages.map((pkg, index) => (
            <Card 
              key={`${pkg.id}-${index}`}
              className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] xl:w-[360px] group overflow-hidden bg-card border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/30"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.name}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  {pkg.category}
                </Badge>
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs font-medium">{pkg.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>
                
                {/* Package Details */}
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{pkg.duration}</span>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Highlights:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {pkg.highlights.slice(0, 4).map((highlight, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-accent flex-shrink-0" />
                        <span className="text-xs text-muted-foreground truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-primary">د.إ</span>
                    <span className="text-muted-foreground text-sm ml-1">per person</span>
                  </div>
                  <Button 
                    onClick={() => handleBookNow(pkg)}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 text-sm sm:text-base px-3 sm:px-4"
                  >
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Book Now</span>
                    <span className="sm:hidden">Book</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Can't find the perfect package? We create custom experiences tailored to your preferences.
          </p>
          <Button 
            variant="outline"
            onClick={() => navigate('/contact')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Create Custom Package
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HolidayPackages;