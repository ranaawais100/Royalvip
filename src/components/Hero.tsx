import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Star, Shield, Clock } from "lucide-react";

import heroImage1 from "@/assets/hero/hero-1.jpg";
import heroImage2 from "@/assets/hero/hero-2.jpg";
import heroImage3 from "@/assets/hero/q.jpg";
import heroImage4 from "@/assets/hero/hero-4.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Premium hero slides with luxury vehicles
  const heroSlides = [
    {
      id: 2,
      image: heroImage1,
      title: "UAE Skyline Views",
      subtitle: "Luxury Transportation Across UAE",
      description: "Discover the beauty of the UAE while traveling in our premium fleet. Experience luxury transportation with stunning skyline views.",
      features: ["Scenic Routes", "Premium Comfort", "Professional Service"],
      mobileObjectPosition: "object-center",
    },
    {
      id: 3,
      image: heroImage2,
      title: "Dubai City Experience",
      subtitle: "Iconic Dubai Transportation",
      description: "Explore Dubai's magnificent cityscape with our luxury vehicle service. Perfect for business trips and sightseeing tours.",
      features: ["City Tours", "Business Travel", "Luxury Fleet"],
      mobileObjectPosition: "object-center",
    },
    {
      id: 4,
      image: heroImage3,
      title: "Mercedes S-Class",
      subtitle: "Executive Elegance",
      description: "Travel in sophisticated style with our Mercedes S-Class fleet. The perfect choice for discerning clients seeking luxury.",
      features: ["Luxury Interior", "Smooth Performance", "Premium Service"],
      mobileObjectPosition: "object-bottom",
    },
    {
        id: 5,
        image: heroImage4,
        title: "Architectural Marvels",
        subtitle: "A Journey Through Modern Wonders",
        description: "Witness Dubai's stunning architecture from the comfort of our luxury vehicles. A perfect blend of comfort and discovery.",
        features: ["Sightseeing", "Photo Opportunities", "Guided Tours"],
        mobileObjectPosition: "object-center",
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 7000);
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
    <section className="relative h-screen w-full overflow-hidden">
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover ${slide.mobileObjectPosition} lg:object-center`}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full h-2 ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center lg:text-left">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-white space-y-4 md:space-y-6">
            <div className="overflow-hidden">
              <div
                className={`transition-transform duration-1000 transform ${
                  currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mx-auto lg:mx-0">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs md:text-sm font-medium">Premium Luxury Service</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <h1
                className={`text-4xl md:text-5xl font-bold leading-tight transition-transform duration-1000 delay-100 transform ${
                  currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                <span className="block">{heroSlides[currentSlide]?.title}</span>
                <span className="block text-2xl md:text-3xl text-yellow-400">{
                  heroSlides[currentSlide]?.subtitle
                }</span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p
                className={`text-base md:text-lg max-w-2xl leading-relaxed transition-transform duration-1000 delay-200 transform mx-auto lg:mx-0 ${
                  currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
              >
                {heroSlides[currentSlide]?.description}
              </p>
            </div>

            <div
              className={`flex flex-wrap gap-3 transition-transform duration-1000 delay-300 transform justify-center lg:justify-start ${
                currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {heroSlides[currentSlide]?.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 md:px-4 py-2"
                >
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs md:text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transition-transform duration-1000 delay-400 transform justify-center lg:justify-start ${
                currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <Button
                onClick={handleBookNow}
                size="lg"
                className="bg-yellow-400 text-black font-bold px-6 md:px-8 py-3 text-base md:text-lg hover:bg-yellow-300 transition-colors"
              >
                Book Now
              </Button>
              <Button
                onClick={() => navigate('/fleet')}
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white/20 px-6 md:px-8 py-3 text-base md:text-lg transition-colors"
              >
                View Fleet
              </Button>
            </div>

            <div
              className={`flex items-center flex-wrap gap-4 pt-6 transition-transform duration-1000 delay-500 transform justify-center lg:justify-start ${
                currentSlide >= 0 ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span>Fully Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>24/7 Premium Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>5-Star Rated Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
