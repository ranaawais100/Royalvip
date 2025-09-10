import React from 'react';
import { DynamicCarShowcase } from './DynamicCarShowcase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Users, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp, generateGeneralInquiryMessage } from '@/utils/whatsapp';

interface CategorizedCarShowcaseProps {
  showAllCategories?: boolean;
  featuredCategories?: string[];
  showHeader?: boolean;
  showViewAllButton?: boolean;
  className?: string;
}

const CategorizedCarShowcase: React.FC<CategorizedCarShowcaseProps> = ({
  showAllCategories = true,
  featuredCategories = [],
  showHeader = true,
  showViewAllButton = true,
  className = ''
}) => {
  const navigate = useNavigate();

  // Dynamic car showcase handles category filtering internally

  const handleViewAllFleet = () => {
    navigate('/fleet');
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  const stats = [
    { icon: <Car className="h-6 w-6" />, number: '200+', label: 'Premium Vehicles' },
    { icon: <Users className="h-6 w-6" />, number: '50K+', label: 'Happy Customers' },
    { icon: <Shield className="h-6 w-6" />, number: '24/7', label: 'Support Available' },
    { icon: <Star className="h-6 w-6" />, number: '4.9', label: 'Average Rating' }
  ];

  return (
    <section className={`py-20 bg-gradient-to-b from-background via-background/95 to-card/5 ${className}`}>
      <div className="container mx-auto px-4">
        {showHeader && (
          <>
            {/* Header Section */}
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Premium Fleet Collection
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-foreground">Discover Our</span>{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Luxury Fleet
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                From intimate luxury sedans to spacious coaches, our diverse fleet caters to every 
                transportation need with uncompromising quality and style.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-card/40 to-secondary/20 backdrop-blur-sm border border-border/20 rounded-full text-primary mb-3">
                      {stat.icon}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <Button 
                  onClick={handleBookNow}
                  size="lg"
                  className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground font-bold px-8 py-4 text-lg hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                >
                  Book Your Ride Now
                </Button>
                
                {showViewAllButton && (
                  <Button 
                    onClick={handleViewAllFleet}
                    variant="outline"
                    size="lg"
                    className="border border-primary/40 text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary hover:border-primary/60 font-bold px-8 py-4 text-lg backdrop-blur-md bg-background/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
                  >
                    View Complete Fleet
                  </Button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Dynamic Car Showcase */}
        <DynamicCarShowcase 
          showAllCategories={showAllCategories}
          maxCarsPerCategory={4}
          className="-mt-8" // Adjust spacing since we have header above
        />

        {/* Bottom CTA Section */}
        {showHeader && (
          <div className="text-center mt-20 p-12 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl border border-primary/20">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Experience Luxury?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose from our premium fleet and let our professional chauffeurs provide you with 
              an unforgettable journey across the UAE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleBookNow}
                size="lg"
                className="bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-primary-foreground font-bold px-8 py-4 text-lg hover:-translate-y-1 hover:scale-105 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              >
                Start Your Journey
              </Button>
              
              <Button 
                onClick={() => openWhatsApp(generateGeneralInquiryMessage())}
                variant="outline"
                size="lg"
                className="border border-primary/40 text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary hover:border-primary/60 font-bold px-8 py-4 text-lg backdrop-blur-md bg-background/40 hover:-translate-y-1 hover:scale-105 transition-all duration-300"
              >
                Contact via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorizedCarShowcase;