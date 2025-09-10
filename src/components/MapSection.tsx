import React, { useState } from 'react';
import { MapPin, Plane, Building, Star, Mountain, Waves, ShoppingBag, Camera, Castle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const UAEMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const locations = [
    {
      name: "Dubai International Airport",
      type: "Airport",
      category: "Airport",
      icon: <Plane className="h-5 w-5" />,
      coordinates: { lat: 25.2532, lng: 55.3657 },
      description: "World's busiest international airport",
      rating: 4.8,
      vip: true,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Burj Khalifa",
      type: "Landmark",
      category: "Landmark",
      icon: <Building className="h-5 w-5" />,
      coordinates: { lat: 25.1972, lng: 55.2744 },
      description: "World's tallest building",
      rating: 4.9,
      vip: true,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Burj Al Arab",
      type: "Hotel",
      category: "Hotel",
      icon: <Star className="h-5 w-5" />,
      coordinates: { lat: 25.1413, lng: 55.1853 },
      description: "Iconic luxury hotel",
      rating: 5.0,
      vip: true,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Dubai Mall",
      type: "Mall",
      category: "Mall",
      icon: <ShoppingBag className="h-5 w-5" />,
      coordinates: { lat: 25.1975, lng: 55.2796 },
      description: "World's largest shopping mall",
      rating: 4.7,
      vip: false,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Palm Jumeirah",
      type: "Landmark",
      category: "Landmark",
      icon: <MapPin className="h-5 w-5" />,
      coordinates: { lat: 25.1124, lng: 55.1390 },
      description: "Artificial archipelago",
      rating: 4.8,
      vip: true,
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Emirates Palace",
      type: "Hotel",
      category: "Hotel",
      icon: <Star className="h-5 w-5" />,
      coordinates: { lat: 24.4619, lng: 54.3178 },
      description: "Luxury hotel in Abu Dhabi",
      rating: 4.9,
      vip: true,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Sharjah Corniche",
      type: "Beach",
      category: "Beach",
      icon: <Waves className="h-5 w-5" />,
      coordinates: { lat: 25.3463, lng: 55.3890 },
      description: "Beautiful waterfront promenade",
      rating: 4.6,
      vip: false,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Jebel Jais",
      type: "Mountain",
      category: "Landmark",
      icon: <Mountain className="h-5 w-5" />,
      coordinates: { lat: 25.9738, lng: 56.1316 },
      description: "UAE's highest mountain peak",
      rating: 4.8,
      vip: true,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Fujairah Fort",
      type: "Fort",
      category: "Landmark",
      icon: <Castle className="h-5 w-5" />,
      coordinates: { lat: 25.1197, lng: 56.3414 },
      description: "Historic fortress and heritage site",
      rating: 4.5,
      vip: false,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Al Ain Oasis",
      type: "Heritage",
      category: "Landmark",
      icon: <Camera className="h-5 w-5" />,
      coordinates: { lat: 24.2075, lng: 55.7447 },
      description: "UNESCO World Heritage site",
      rating: 4.7,
      vip: true,
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Yas Island",
      type: "Entertainment",
      category: "Landmark",
      icon: <Star className="h-5 w-5" />,
      coordinates: { lat: 24.4539, lng: 54.6027 },
      description: "Entertainment and leisure destination",
      rating: 4.8,
      vip: true,
      image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=300&h=200&fit=crop&crop=center"
    },
    {
      name: "Ajman Beach",
      type: "Beach",
      category: "Beach",
      icon: <Waves className="h-5 w-5" />,
      coordinates: { lat: 25.4052, lng: 55.5136 },
      description: "Pristine coastline and resorts",
      rating: 4.4,
      vip: false,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop&crop=center"
    }
  ];
  
  const cardsPerSlide = 6; // 3 cards per row, 2 rows
  const totalSlides = Math.ceil(locations.length / cardsPerSlide);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase text-sm">OUR SERVICE AREAS</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Serving UAE's
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Premier Destinations
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From Dubai's iconic landmarks to Abu Dhabi's luxury hotels, we provide premium limousine services 
            across the UAE's most prestigious locations.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-6" />
        </div>

        {/* Luxury Container */}
        <div className="bg-gradient-to-br from-card/50 to-secondary/30 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Interactive Map */}
            <div className="lg:col-span-3">
              <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-card to-secondary/50 shadow-luxury">
                <CardContent className="p-0">
                  <div className="relative h-[500px] bg-gradient-to-br from-primary/10 to-accent/10">
                    {/* Google Maps Embed with Dark Theme */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.68834066757!2d54.89782924999999!3d25.0762677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s&maptype=roadmap&style=feature:all%7Celement:geometry%7Ccolor:0x212121&style=feature:all%7Celement:labels.icon%7Cvisibility:off&style=feature:all%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:all%7Celement:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0xd4af37&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xd4af37&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&markers=color:0xd4af37%7Clabel:A%7C25.2532,55.3657&markers=color:0xd4af37%7Clabel:B%7C25.1972,55.2744&markers=color:0xd4af37%7Clabel:C%7C25.1413,55.1853&markers=color:0xd4af37%7Clabel:D%7C25.1975,55.2796&markers=color:0xd4af37%7Clabel:E%7C25.1124,55.1390&markers=color:0xd4af37%7Clabel:F%7C24.4619,54.3178"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    ></iframe>
                    
                    {/* Luxury Map Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-primary/10 pointer-events-none rounded-xl" />
                     <div className="absolute top-4 left-4 bg-gradient-to-r from-primary/90 to-accent/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                       <p className="text-xs font-semibold text-white">LIVE MAP</p>
                     </div>
                     
                     {/* Interactive Location Indicator */}
                     {hoveredLocation !== null && (
                       <div className="absolute top-4 right-4 bg-gradient-to-r from-accent/90 to-primary/90 backdrop-blur-sm rounded-lg px-3 py-1.5 animate-pulse">
                         <p className="text-xs font-semibold text-white">
                           📍 {locations[hoveredLocation].name}
                         </p>
                       </div>
                     )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Destinations List - Right Sidebar */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-primary" />
                <h3 className="text-xl font-bold text-foreground">Quick Access</h3>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent" />
              </div>
              {locations.slice(0, 6).map((location, index) => (
                 <Card 
                   key={index} 
                   className={`group border-primary/20 bg-gradient-to-br from-card/80 to-secondary/40 hover:from-card hover:to-secondary/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] cursor-pointer overflow-hidden ${
                     hoveredLocation === index ? 'ring-2 ring-primary/50 shadow-xl shadow-primary/30 scale-[1.02]' : ''
                   }`}
                   onMouseEnter={() => setHoveredLocation(index)}
                   onMouseLeave={() => setHoveredLocation(null)}
                 >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      {/* Icon */}
                      <div className="p-2 rounded-full bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0">
                        {location.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300 truncate">{location.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {location.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs font-semibold text-primary">{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Service Coverage */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 shadow-lg mt-4">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg opacity-30" />
                      <MapPin className="h-8 w-8 text-primary mx-auto relative z-10" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2 text-sm">Full UAE Coverage</h4>
                    <p className="text-xs text-muted-foreground">
                      Premium services across all emirates.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          

        </div>
      </div>
    </section>
  );
};

export default UAEMap;