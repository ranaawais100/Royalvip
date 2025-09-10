import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AfraaLogo from "@/assets/afaa5426-a4f0-4ba4-aa1c-dfedb79c594a_removalai_preview.png";
import LatestBlogs from "./LatestBlogs";

const Footer = () => {
  const navigate = useNavigate();
  
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Fleet", href: "/fleet" },
        { label: "Contact Us", href: "/contact" }
      ]
    },
    {
      title: "Services", 
      links: [
        { label: "Limousine Rentals", href: "#" },
        { label: "Airport Transfers", href: "#" },
        { label: "Corporate Travel", href: "#" },
        { label: "Special Events", href: "#" }
      ]
    },
    {
      title: "Contact Info",
      links: [
        { label: "inforoyalviplimos@gmail.com", href: "mailto:inforoyalviplimos@gmail.com", icon: <Mail className="h-4 w-4" /> },
        { label: "+971585859944", href: "tel:+971585859944", icon: <Phone className="h-4 w-4" /> },
        { label: "Business DAMAC Tower, Business Bay", href: "#", icon: <MapPin className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        {/* Get In Touch Section */}
        <div className="text-center mb-16 py-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl">
          <div className="flex items-center justify-center mb-4">
            <ArrowRight className="h-6 w-6 text-primary mr-2" />
            <span className="text-primary font-semibold tracking-wider uppercase">Get In Touch</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            "Contact us today and experience luxury on the go."
          </h3>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
            onClick={() => navigate('/contact')}
          >
            Get In Touch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src={AfraaLogo} 
                alt="Royal VIP Limos" 
                className="h-12 w-auto mr-3"
              />
              <div>
                <span className="block text-xl font-bold tracking-tight">ROYAL<span className="text-primary">VIP</span></span>
                <span className="block text-xs tracking-widest text-muted-foreground">LIMO DUBAI</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Choose Elegance, Ride In Luxury. Indulge in a first-class journey with our premium 
              limousine services. Whether for a special occasion or everyday luxury, we ensure 
              every ride is exceptional.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.open('https://www.facebook.com/share/171XYJmAcw/', '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.open('https://twitter.com', '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.open('https://www.instagram.com/royalviplimosdubai?igsh=MTF6ODdyZnA4dWMybQ==', '_blank')}
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Latest Blogs Section */}
          <div className="lg:col-span-2">
            <LatestBlogs count={3} showTitle={true} variant="footer" />
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-foreground">{section.title}</h4>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => {
                  const isExternalLink = link.href.startsWith('mailto:') || link.href.startsWith('tel:');
                  const isInternalLink = link.href.startsWith('/');
                  
                  if (isExternalLink) {
                    return (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.label}
                      </a>
                    );
                  }
                  
                  if (isInternalLink) {
                    return (
                      <button
                        key={linkIndex}
                        onClick={() => navigate(link.href)}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.label}
                      </button>
                    );
                  }
                  
                  return (
                    <a
                      key={linkIndex}
                      href={link.href}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <p>©2024 - ROYAL VIP LIMO DUBAI</p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/royalviplimosdubai?igsh=MTF6ODdyZnA4dWMybQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/share/171XYJmAcw/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button 
                onClick={() => navigate('/privacy')} 
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/terms')} 
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/careers')} 
                className="hover:text-primary transition-colors"
              >
                Careers
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;