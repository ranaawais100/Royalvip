import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ExternalLink, Navigation as NavigationIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    preferredContact: ""
  });

  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required to send your inquiry.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: `Thank you ${formData.name}! We'll get back to you within 24 hours via ${formData.preferredContact || 'email'}.`,
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      preferredContact: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: [
        "+971585859944",
        "+971585859944"
      ],
      description: "Available 24/7 for immediate assistance"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: [
        "inforoyalviplimos@gmail.com",
        "inforoyalviplimos@gmail.com"
      ],
      description: "We respond within 2 hours"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      details: [
        "Business DAMAC Tower",
        "Business Bay, Dubai"
      ],
      description: "Visit our showroom and fleet"
    },

  ];

  const offices = [
    {
      city: "Dubai",
      address: "Business DAMAC Tower, Business Bay",
      phone: "+971585859944",
      email: "inforoyalviplimos@gmail.com"
    }
  ];

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 24 hours in advance for regular services and 1 week for special events to ensure availability."
    },
    {
      question: "Do you provide airport transfers?",
      answer: "Yes, we offer 24/7 airport transfer services with flight monitoring and meet & greet options."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Free cancellation up to 24 hours before service. Cancellations within 24 hours may incur a 50% charge."
    },
    {
      question: "Are your drivers licensed and insured?",
      answer: "All our chauffeurs are professionally licensed, insured, and undergo regular training and background checks."
    },
    {
      question: "Do you offer corporate accounts?",
      answer: "Yes, we provide corporate billing solutions with monthly invoicing and dedicated account management for business clients."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, bank transfers, and corporate accounts. Payment is processed securely through our encrypted system."
    },
    {
      question: "Can I modify my booking?",
      answer: "Yes, you can modify your booking up to 2 hours before the scheduled service time. Changes may affect pricing based on availability."
    },
    {
      question: "Do you provide child car seats?",
      answer: "Yes, we offer complimentary child car seats and booster seats. Please specify your requirements when booking to ensure availability."
    }
  ];

  const displayedFAQs = showAllFAQs ? faqs : faqs.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-r from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Get In</span>{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to experience luxury transportation? Contact us today for bookings, 
              inquiries, or to learn more about our premium services.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center bg-card border-border hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full text-primary mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-foreground font-medium">
                        {info.title === "Phone" ? (
                          <a href={`tel:${detail}`} className="hover:text-primary transition-colors cursor-pointer">
                            {detail}
                          </a>
                        ) : info.title === "Email" ? (
                          <a href={`mailto:${detail}`} className="hover:text-primary transition-colors cursor-pointer">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card border-border shadow-luxury">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-foreground">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="bg-background border-border"
                      />
                    </div>

                  </div>



                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Message *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your transportation needs..."
                      rows={5}
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="space-y-8">


              {/* Office Locations */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Our Locations</h3>
                  <div className="space-y-4">
                    {offices.map((office, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h4 className="font-bold text-foreground">{office.city}</h4>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                        <p className="text-sm text-muted-foreground">
                          <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors cursor-pointer">
                            {office.phone}
                          </a>
                        </p>
                        <p className="text-sm text-primary">
                          <a href={`mailto:${office.email}`} className="hover:text-accent transition-colors cursor-pointer">
                            {office.email}
                          </a>
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Booking */}
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Quick Booking</h3>
                  <p className="text-muted-foreground mb-4">
                    Ready to book now? Call us directly for immediate assistance.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                    onClick={() => window.open('tel:+15551234567', '_self')}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Find Us on the Map
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Visit our luxury showroom or use our interactive map to plan your route to any of our locations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Embedded Google Map */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border shadow-luxury overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-96 lg:h-[500px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5c!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1647834539283!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Luxury Car Rental Location"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Actions & Info */}
            <div className="space-y-6">
              {/* Open in Google Maps */}
              <Card className="bg-card border-border hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full text-primary mb-4">
                      <NavigationIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Get Directions</h3>
                    <p className="text-muted-foreground mb-4">
                      Open in Google Maps for turn-by-turn navigation to our showroom.
                    </p>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                      onClick={() => window.open('https://maps.google.com/?q=123+Luxury+Boulevard,+New+York,+NY+10001', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Location Details */}
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full text-accent mb-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Main Showroom</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p className="font-medium">123 Luxury Boulevard</p>
                      <p>Downtown District</p>
                      <p>New York, NY 10001</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Parking Available</p>
                      <p className="text-sm text-muted-foreground">Valet Service Included</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-2 text-foreground">Need Help Finding Us?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Call us for assistance with directions or parking.
                    </p>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open('tel:+15551234567', '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find quick answers to common questions about our services, booking process, and policies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedFAQs.map((faq, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-luxury transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-foreground flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground ml-7">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {showAllFAQs ? "Showing all frequently asked questions" : "Don't see your question answered?"}
            </p>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => setShowAllFAQs(!showAllFAQs)}
            >
              {showAllFAQs ? "Show Less" : "View All FAQs"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;