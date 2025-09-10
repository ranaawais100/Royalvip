import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const Reviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const reviews = [
    {
      id: 1,
      name: "Ahmed Al-Mansouri",
      location: "Dubai, UAE",
      rating: 5,
      text: "Exceptional service! The limousine was pristine and the chauffeur was incredibly professional. Made our wedding day absolutely perfect.",
      avatar: "AM"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Abu Dhabi, UAE",
      rating: 5,
      text: "Outstanding experience from start to finish. The booking process was seamless and the luxury vehicle exceeded all expectations.",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Mohammed Hassan",
      location: "Sharjah, UAE",
      rating: 5,
      text: "Royal VIP provided the perfect transportation for our corporate event. Punctual, elegant, and truly professional service.",
      avatar: "MH"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      location: "Dubai, UAE",
      rating: 5,
      text: "Amazing service for our anniversary celebration. The attention to detail and luxury amenities made it an unforgettable experience.",
      avatar: "ER"
    },
    {
      id: 5,
      name: "Omar Al-Zahra",
      location: "Abu Dhabi, UAE",
      rating: 5,
      text: "Best limousine service in UAE! Professional drivers, immaculate vehicles, and exceptional customer service. Highly recommended!",
      avatar: "OZ"
    },
    {
      id: 6,
      name: "Lisa Chen",
      location: "Dubai, UAE",
      rating: 5,
      text: "Perfect for our business trip. The chauffeur was knowledgeable about the city and the vehicle was equipped with everything we needed.",
      avatar: "LC"
    },
    {
      id: 7,
      name: "Khalid Al-Rashid",
      location: "Fujairah, UAE",
      rating: 5,
      text: "Incredible luxury experience! From airport pickup to hotel drop-off, everything was handled with utmost professionalism.",
      avatar: "KR"
    },
    {
      id: 8,
      name: "Jennifer Smith",
      location: "Dubai, UAE",
      rating: 5,
      text: "Royal VIP made our special occasion truly memorable. The service quality and attention to detail are simply unmatched.",
      avatar: "JS"
    }
  ];

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through one set of reviews
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 uppercase">
            CLIENT TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover why thousands of clients trust Royal VIP for their luxury transportation needs.
            Read genuine reviews from satisfied customers across the UAE.
          </p>
        </div>

        {/* Auto-scrolling Reviews */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedReviews.map((review, index) => (
              <Card 
                key={`${review.id}-${index}`} 
                className="bg-gradient-to-br from-card/60 via-card/70 to-secondary/20 border-border/30 hover:border-primary/40 backdrop-blur-md hover:from-card/80 hover:via-card/90 hover:to-secondary/30 transition-all duration-500 flex-shrink-0 w-80 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-primary/60" />
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{review.text}"
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  {/* Reviewer Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {review.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;