import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Shield, Clock } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Premium hero slides with luxury vehicles
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Luxury Range Rover",
      subtitle: "Premium SUV Collection",
      description: "Experience the ultimate in luxury with our Range Rover fleet. Perfect for executive travel and special occasions.",
      features: ["Premium Interior", "Advanced Safety", "Executive Comfort"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "UAE Skyline Views",
      subtitle: "Luxury Transportation Across UAE",
      description: "Discover the beauty of the UAE while traveling in our premium fleet. Experience luxury transportation with stunning skyline views.",
      features: ["Scenic Routes", "Premium Comfort", "Professional Service"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Dubai City Experience",
      subtitle: "Iconic Dubai Transportation",
      description: "Explore Dubai's magnificent cityscape with our luxury vehicle service. Perfect for business trips and sightseeing tours.",
      features: ["City Tours", "Business Travel", "Luxury Fleet"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Mercedes S-Class",
      subtitle: "Executive Elegance",
      description: "Travel in sophisticated style with our Mercedes S-Class fleet. The perfect choice for discerning clients seeking luxury.",
      features: ["Luxury Interior", "Smooth Performance", "Premium Service"]
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Carousel Container */}
      <div className="relative w-full h-full">
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1500 ease-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-110'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform transition-transform duration-1500 ease-out"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Enhanced Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            {/* Luxury Gold Accent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          </div>
        ))}

        {/* Enhanced Navigation Controls */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30 flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button
            onClick={togglePlayPause}
            className="p-2 sm:p-2.5 lg:p-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all duration-500 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
          <button
            onClick={prevSlide}
            className="p-2 sm:p-2.5 lg:p-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all duration-500 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-2.5 lg:p-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 transition-all duration-500 text-white border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full border-2 ${
                index === currentSlide
                  ? 'w-8 h-2 sm:w-10 sm:h-2.5 lg:w-12 lg:h-3 bg-gradient-to-r from-primary to-accent border-white/60 shadow-lg'
                  : 'w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 bg-white/40 border-white/30 hover:bg-white/60 hover:border-white/50 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl sm:max-w-3xl lg:max-w-5xl">
              {/* Animated Content */}
              <div className="text-white space-y-8">
                {/* Premium Badge */}
                <div className="overflow-hidden">
                  <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 transform transition-all duration-1000 delay-100 ${
                    currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-white/90">Premium Luxury Service</span>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight transform transition-all duration-1200 delay-300 ${
                    currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}>
                    <span className="block text-white drop-shadow-2xl text-xl sm:text-2xl md:text-3xl lg:text-5xl">{heroSlides[currentSlide]?.title}</span>
                    <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg text-lg sm:text-xl md:text-2xl lg:text-4xl">
                      {heroSlides[currentSlide]?.subtitle}
                    </span>
                  </h1>
                </div>

                <div className="overflow-hidden">
                  <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 max-w-xl sm:max-w-2xl lg:max-w-3xl leading-relaxed font-light transform transition-all duration-1200 delay-500 ${
                    currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {heroSlides[currentSlide]?.description}
                  </p>
                </div>

                {/* Enhanced Features */}
                <div className={`flex flex-wrap gap-2 sm:gap-3 lg:gap-4 transform transition-all duration-1200 delay-700 ${
                  currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {heroSlides[currentSlide]?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                      <span className="text-xs sm:text-xs lg:text-xs font-medium text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 transform transition-all duration-1200 delay-900 ${
                  currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <Button
                    onClick={handleBookNow}
                    size="lg"
                    className="bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 border border-primary/30 backdrop-blur-sm w-full sm:w-auto"
                  >
                    Book Now
                  </Button>
                  <Button
                    onClick={() => navigate('/fleet')}
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-md px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold w-full sm:w-auto"
                  >
                    View Fleet
                  </Button>
                </div>

                {/* Enhanced Trust Indicators */}
                <div className={`flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-8 pt-4 sm:pt-6 lg:pt-8 transform transition-all duration-1200 delay-1100 ${
                  currentSlide >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-white/20">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium hidden sm:inline">Fully Licensed & Insured</span>
                    <span className="font-medium sm:hidden">Licensed</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-white/20">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium hidden sm:inline">24/7 Premium Support</span>
                    <span className="font-medium sm:hidden">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 border border-white/20">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    <span className="font-medium hidden sm:inline">5-Star Rated Service</span>
                    <span className="font-medium sm:hidden">5-Star Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;