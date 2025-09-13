import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Trophy, Shield, Clock, Star, Target, Heart, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  // Handle smooth scrolling to timeline section
  const handleLearnMore = () => {
    const timelineSection = document.getElementById('timeline-section');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle navigation to booking page
  const handleBookExperience = () => {
    navigate('/booking');
  };

  // Handle navigation to contact page
  const handleContactTeam = () => {
    navigate('/contact');
  };

  const stats = [
    { number: "15+", label: "Years of Excellence", icon: <Trophy className="h-8 w-8" /> },
    { number: "50,000+", label: "Happy Clients", icon: <Users className="h-8 w-8" /> },
    { number: "200+", label: "Luxury Vehicles", icon: <Car className="h-8 w-8" /> },
    { number: "24/7", label: "Customer Support", icon: <Clock className="h-8 w-8" /> }
  ];

  const values = [
    {
      icon: <Star className="h-12 w-12" />,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service, from vehicle maintenance to customer care."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Safety",
      description: "Your safety is our top priority with regular vehicle inspections and professionally trained chauffeurs."
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Service",
      description: "We go above and beyond to ensure every journey exceeds your expectations."
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Reliability",
      description: "Count on us for punctual, consistent service that adapts to your schedule."
    }
  ];



  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Started with a vision to redefine luxury transportation"
    },
    {
      year: "2017",
      title: "Fleet Expansion",
      description: "Expanded to 50+ vehicles and introduced exotic car rentals"
    },
    {
      year: "2019",
      title: "Technology Integration",
      description: "Launched mobile app and GPS tracking for enhanced service"
    },
    {
      year: "2021",
      title: "Sustainability Initiative",
      description: "Introduced hybrid and electric vehicles to our fleet"
    },
    {
      year: "2023",
      title: "Industry Leader",
      description: "Recognized as the premier luxury car rental service"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">About</span>{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Royal VIP Limos
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              For over 15 years, we've been setting the standard for luxury transportation services. 
              Our commitment to excellence, safety, and customer satisfaction has made us the 
              preferred choice for discerning clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Royal VIP Limos was born from a simple belief: transportation should be more than just getting 
                from point A to point B. It should be an experience that reflects your style, values, 
                and aspirations.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2015, Royal VIP Limos started with just five premium cars and a vision to create 
                the most exclusive car rental experience in the industry.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Today, we've grown into a premier luxury transportation company with a fleet of over 
                200 meticulously maintained vehicles, serving clients across major cities and 
                continuing to set new standards for excellence in the industry.
              </p>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                onClick={handleLearnMore}
              >
                Learn More About Our Journey
              </Button>
            </div>
            <div className="relative">
              <Card className="overflow-hidden bg-card border-border shadow-luxury">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground mb-6">
                    To provide unparalleled luxury transportation experiences that exceed expectations 
                    through exceptional service, premium vehicles, and unwavering attention to detail.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">Exceptional Service Quality</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">Premium Vehicle Fleet</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-foreground">Customer-Centric Approach</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These fundamental principles guide everything we do and ensure we deliver 
              consistent excellence in every interaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="text-center bg-card border-border hover:shadow-luxury transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-primary mb-6 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Company Timeline */}
      <section id="timeline-section" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones that have shaped our company and defined our commitment to excellence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right pr-8">
                  <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2 mr-8"></div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Experience the Royal VIP Limos Difference
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have made Royal VIP Limos their preferred choice 
            for luxury transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              onClick={handleBookExperience}
            >
              Book Your Experience
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;