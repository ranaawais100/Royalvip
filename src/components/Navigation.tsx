import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Phone, ChevronRight, Facebook, Instagram } from "lucide-react";
import AfraaLogo from "@/assets/afaa5426-a4f0-4ba4-aa1c-dfedb79c594a_removalai_preview.png";

// Custom Logo Component
const RoyalVIPLimosLogo = () => (
  <div className="flex items-center">
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
);

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Fleet", href: "/fleet" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-luxury py-2' : 'bg-transparent py-4'} backdrop-blur-md`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <RoyalVIPLimosLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-md transition-all duration-300 font-medium ${
                  location.pathname === item.href 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-2 mr-2">
              <a href="https://www.instagram.com/royalviplimosdubai?igsh=MTF6ODdyZnA4dWMybQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/share/171XYJmAcw/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <Link to="/booking">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Phone className="h-4 w-4 mr-2" />
                Book Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2 bg-secondary/50 p-4 rounded-lg">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-medium px-4 py-3 rounded-md transition-all duration-300 ${
                    location.pathname === item.href 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground hover:bg-secondary hover:text-primary'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-center space-x-4 pt-4 mb-4">
                <a href="https://www.instagram.com/royalviplimosdubai?igsh=MTF6ODdyZnA4dWMybQ==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/share/171XYJmAcw/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="border-primary/20 text-foreground hover:bg-primary/10 hover:text-primary justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Book Now
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;