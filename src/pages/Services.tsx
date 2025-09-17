import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Shield, Clock, Users, Star, Phone, CheckCircle, Award, Globe, X, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PricingTier {
  type: string;
  price: string;
  capacity: string;
}

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
  detailedDescription: string;
  benefits: string[];
  pricingTiers: PricingTier[];
  duration: string;
  availability: string;
}

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const handleLearnMore = (serviceIndex: number) => {
    setExpandedServices(prev => 
      prev.includes(serviceIndex) 
        ? prev.filter(index => index !== serviceIndex)
        : [...prev, serviceIndex]
    );
  };

  const handleReadDetails = (service: Service) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  const handleContactUs = (service: Service) => {
    // Create a more interactive contact experience
    const phoneNumber = "+971585859944";
    const email = "inforoyalviplimos@gmail.com";
    const message = `Hi, I'm interested in learning more about your ${service.title} service. Could you please provide more information?`;
    
    // Show contact options
    const contactChoice = window.confirm(
      `Contact us about ${service.title}:\n\n` +
      `📞 Call: ${phoneNumber}\n` +
      `📧 Email: ${email}\n\n` +
      `Click OK to call now, or Cancel to send an email.`
    );
    
    if (contactChoice) {
      // Open phone dialer
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // Open email client with pre-filled message
      window.location.href = `mailto:${email}?subject=Inquiry about ${encodeURIComponent(service.title)}&body=${encodeURIComponent(message)}`;
    }
  };

  const handleGetQuote = (serviceTitle?: string) => {
    if (serviceTitle) {
      setQuoteForm(prev => ({ ...prev, serviceType: serviceTitle }));
    }
    setIsQuoteModalOpen(true);
  };

  const handleBookNow = () => {
    navigate('/booking');
  };

  const handleQuoteFormChange = (field: string, value: string) => {
    setQuoteForm(prev => ({ ...prev, [field]: value }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the quote request to your backend
    console.log('Quote request submitted:', quoteForm);
    
    // Show success message
    alert('Thank you for your quote request! We will contact you within 24 hours.');
    
    // Reset form and close modal
    setQuoteForm({ name: '', email: '', phone: '', serviceType: '', message: '' });
    setIsQuoteModalOpen(false);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setIsDetailModalOpen(false);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteForm({ name: '', email: '', phone: '', serviceType: '', message: '' });
  };
  const services = [
    {
      icon: <Car className="h-12 w-12" />,
      title: "Airport Transfers",
      description: "Professional airport pickup and drop-off services with flight monitoring and meet & greet service.",
      features: ["Flight Monitoring", "Meet & Greet", "Luggage Assistance", "Professional Chauffeurs"],
      price: "From AED 300",
      detailedDescription: "Our airport transfer service ensures a seamless travel experience from start to finish. We monitor your flight status in real-time and adjust pickup times accordingly, so you never have to worry about delays or early arrivals.",
      benefits: [
        "Real-time flight tracking and automatic schedule adjustments",
        "Professional meet & greet service at arrivals",
        "Complimentary luggage assistance and handling",
        "Licensed and experienced chauffeurs",
        "Clean, luxury vehicles with climate control",
        "24/7 customer support and communication"
      ],
      pricingTiers: [
        { type: "Standard Sedan", price: "AED 300-450", capacity: "Up to 3 passengers" },
          { type: "Luxury SUV", price: "AED 450-650", capacity: "Up to 6 passengers" },
          { type: "Executive Van", price: "AED 650-900", capacity: "Up to 12 passengers" }
      ],
      duration: "Point-to-point transfer",
      availability: "24/7"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Corporate Travel",
      description: "Reliable business transportation solutions for executives, clients, and corporate events.",
      features: ["Executive Vehicles", "Account Management", "Flexible Billing", "Priority Service"],
      price: "Custom Pricing",
      detailedDescription: "Elevate your business image with our corporate travel solutions. We understand the importance of punctuality, professionalism, and discretion in business transportation.",
      benefits: [
        "Dedicated account manager for personalized service",
        "Priority booking and last-minute availability",
        "Flexible billing options and corporate accounts",
        "Executive-level vehicles with business amenities",
        "Confidential and discreet service",
        "Detailed trip reporting and expense tracking"
      ],
      pricingTiers: [
        { type: "Executive Sedan", price: "AED 350-550/hr", capacity: "Up to 3 passengers" },
          { type: "Luxury SUV", price: "AED 550-750/hr", capacity: "Up to 6 passengers" },
          { type: "Corporate Van", price: "AED 750-1100/hr", capacity: "Up to 12 passengers" }
      ],
      duration: "Hourly or daily rates",
      availability: "24/7 with advance booking"
    },
    {
      icon: <Star className="h-12 w-12" />,
      title: "Special Events",
      description: "Make your special occasions memorable with our luxury vehicles and premium service.",
      features: ["Wedding Packages", "Prom Services", "Anniversary Specials", "Custom Decorations"],
      price: "From AED 750",
      detailedDescription: "Transform your special day into an unforgettable experience with our luxury event transportation. From weddings to proms, we add elegance and style to your celebration.",
      benefits: [
        "Custom decoration packages available",
        "Red carpet service for grand entrances",
        "Professional photography coordination",
        "Champagne service and refreshments",
        "Flexible scheduling for multiple stops",
        "Backup vehicle guarantee for peace of mind"
      ],
      pricingTiers: [
        { type: "Wedding Package", price: "AED 1100-1850", capacity: "Bridal party up to 8" },
          { type: "Prom Special", price: "AED 750-1300", capacity: "Up to 6 students" },
          { type: "Anniversary Luxury", price: "AED 900-1500", capacity: "Couple + 2 guests" }
      ],
      duration: "3-8 hour packages",
      availability: "Advance booking required"
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Hourly Rentals",
      description: "Flexible hourly rental options for shopping trips, business meetings, or city tours.",
      features: ["Flexible Hours", "Wait Time Included", "Multiple Stops", "Local Expertise"],
      price: "From AED 330/hr",
      detailedDescription: "Perfect for when you need flexible transportation throughout the day. Our hourly rental service provides the freedom to make multiple stops while enjoying luxury comfort.",
      benefits: [
        "Minimum 2-hour booking with flexible extensions",
        "Complimentary wait time at each stop",
        "Local area expertise and recommendations",
        "Climate-controlled luxury vehicles",
        "Professional chauffeur at your disposal",
        "Real-time communication and updates"
      ],
      pricingTiers: [
        { type: "Luxury Sedan", price: "AED 330-450/hr", capacity: "Up to 3 passengers" },
          { type: "Premium SUV", price: "AED 450-600/hr", capacity: "Up to 6 passengers" },
          { type: "Executive Van", price: "AED 600-800/hr", capacity: "Up to 12 passengers" }
      ],
      duration: "2-hour minimum",
      availability: "Daily 6 AM - 12 AM"
    },
    
    {
      icon: <Globe className="h-12 w-12" />,
      title: "City Tours",
      description: "Explore the city in style with our guided luxury tours and local expertise.",
      features: ["Local Guides", "Custom Routes", "Historical Sites", "Photo Stops"],
      price: "From AED 550",
      detailedDescription: "Discover the city's hidden gems and iconic landmarks with our luxury guided tours. Our knowledgeable local guides provide insider access and fascinating stories.",
      benefits: [
        "Expert local guides with historical knowledge",
        "Customizable routes based on your interests",
        "VIP access to exclusive locations",
        "Professional photography assistance",
        "Refreshments and local delicacies included",
        "Flexible timing and personalized pace"
      ],
      pricingTiers: [
        { type: "Classic City Tour", price: "AED 550-750", capacity: "Up to 4 passengers, 3 hours" },
          { type: "Premium Experience", price: "AED 900-1300", capacity: "Up to 6 passengers, 5 hours" },
          { type: "VIP Full Day", price: "AED 1500-2200", capacity: "Up to 8 passengers, 8 hours" }
      ],
      duration: "3-8 hour options",
      availability: "Daily tours available"
    }
  ];

  const whyChooseUs = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Industry Leading",
      description: "Over 15 years of excellence in luxury transportation"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Fully Licensed",
      description: "All vehicles and drivers are fully licensed and insured"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Round-the-clock service for your convenience"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "5-Star Rated",
      description: "Consistently rated 5 stars by our satisfied clients"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Book Your Service",
      description: "Choose your vehicle and service type through our website or phone"
    },
    {
      step: "02",
      title: "Confirmation",
      description: "Receive instant confirmation with driver and vehicle details"
    },
    {
      step: "03",
      title: "Professional Service",
      description: "Enjoy punctual, professional service with our experienced chauffeurs"
    },
    {
      step: "04",
      title: "Safe Arrival",
      description: "Arrive at your destination safely and in style"
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
              <span className="text-foreground">Premium Transportation</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From airport transfers to special events, we provide comprehensive luxury transportation 
              solutions tailored to your needs with unmatched professionalism and style.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              onClick={handleBookNow}
            >
              <Phone className="h-5 w-5 mr-2" />
              Book Your Service
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer a full range of luxury transportation services to meet every need, 
              from business travel to special celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group overflow-hidden bg-card border-border hover:shadow-luxury transition-all duration-500 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{service.price}</span>
                      <Button 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleLearnMore(index)}
                      >
                        {expandedServices.includes(index) ? 'Show Less' : 'Learn More'}
                      </Button>
                    </div>
                    
                    {/* Expanded Buttons */}
                    {expandedServices.includes(index) && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border animate-in slide-in-from-top-2 duration-300">
                        <Button 
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex-1"
                          onClick={() => handleReadDetails(service)}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Read Details
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                          onClick={() => handleContactUs(service)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Us
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to providing the highest level of service with attention to detail 
              that sets us apart in the luxury transportation industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process ensures a seamless experience from booking to arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full text-primary-foreground text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform translate-x-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to book your premium transportation service and experience 
            the difference of true luxury travel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              onClick={handleBookNow}
            >
              <Phone className="h-5 w-5 mr-2" />
              Book Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleGetQuote()}
            >
              Get Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div className="text-primary">{selectedService.icon}</div>
                  {selectedService.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Detailed Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Service Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedService.detailedDescription}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Key Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.benefits?.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Pricing Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedService.pricingTiers?.map((tier: PricingTier, index: number) => (
                      <Card key={index} className="border-border">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-foreground mb-2">{tier.type}</h4>
                          <p className="text-2xl font-bold text-primary mb-2">{tier.price}</p>
                          <p className="text-sm text-muted-foreground">{tier.capacity}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Duration
                    </h4>
                    <p className="text-muted-foreground">{selectedService.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      Availability
                    </h4>
                    <p className="text-muted-foreground">{selectedService.availability}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <Button 
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex-1"
                    onClick={() => {
                      handleCloseModal();
                      handleBookNow();
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Book This Service
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                    onClick={() => {
                      handleCloseModal();
                      handleGetQuote(selectedService?.title);
                    }}
                  >
                    Get Custom Quote
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quote Request Modal */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Mail className="h-6 w-6 text-primary" />
              Request a Custom Quote
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleQuoteSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={quoteForm.name}
                    onChange={(e) => handleQuoteFormChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={quoteForm.email}
                    onChange={(e) => handleQuoteFormChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={quoteForm.phone}
                    onChange={(e) => handleQuoteFormChange('phone', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-sm font-medium">
                  Service Type *
                </Label>
                <Select
                  value={quoteForm.serviceType}
                  onValueChange={(value) => handleQuoteFormChange('serviceType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Airport Transfer">Airport Transfer</SelectItem>
                    <SelectItem value="Corporate Travel">Corporate Travel</SelectItem>
                    <SelectItem value="Wedding Transportation">Wedding Transportation</SelectItem>
                    <SelectItem value="Special Events">Special Events</SelectItem>
                    <SelectItem value="City Tours">City Tours</SelectItem>
                    <SelectItem value="Long Distance Travel">Long Distance Travel</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Additional Details
              </Label>
              <Textarea
                id="message"
                placeholder="Please provide details about your transportation needs, date, time, pickup/drop-off locations, number of passengers, etc."
                value={quoteForm.message}
                onChange={(e) => handleQuoteFormChange('message', e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Submit Quote Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseQuoteModal}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Services;