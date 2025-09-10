import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Shield, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceTiers = () => {
  const navigate = useNavigate();
  const tiers = [
    {
      name: "Silver Class",
      price: 90,
      description: "Great for city tours and airport transfers.",
      icon: <Shield className="h-8 w-8" />,
      features: [
        "Professional Chauffeurs",
        "Always On Time",
        "Door-To-Door Service",
        "VIP Experience",
        "Private & Secure",
      ],
      popular: false,
    },
    {
      name: "Gold Elite",
      price: 130,
      description: "Perfect for events and business travel.",
      icon: <Crown className="h-8 w-8" />,
      features: [
        "Professional Chauffeurs",
        "Always On Time",
        "Door-To-Door Service",
        "VIP Experience",
        "Private & Secure",
        "Premium Refreshments",
      ],
      popular: true,
    },
    {
      name: "Platinum VIP",
      price: 180,
      description: "Premium experience for VIP clients.",
      icon: <Star className="h-8 w-8" />,
      features: [
        "Professional Chauffeurs",
        "Always On Time",
        "Door-To-Door Service",
        "VIP Experience",
        "Private & Secure",
        "Premium Refreshments",
        "Concierge Service",
      ],
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 uppercase">
            OUR PRICING TIERS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Luxury Within Reach
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className="relative transition-all duration-300 rounded-2xl bg-card border border-border hover:border-yellow-400 hover:-translate-y-2"
            >
              {tier.popular && (
                <Badge className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <div className="mx-auto mb-4 p-3 rounded-full bg-secondary">
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {tier.name}
                </h3>
                <p className="text-muted-foreground">{tier.description}</p>
              </CardHeader>

              <CardContent>
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-foreground">
                      ${tier.price}
                    </span>
                    <span className="text-muted-foreground">/Hr</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => navigate('/fleet')}
                  className="w-full"
                >
                  Ride In Luxury
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;
