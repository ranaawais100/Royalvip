import React from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HorizontalCarShowcase from "@/components/HorizontalCarShowcase";

const Fleet = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HorizontalCarShowcase 
        title="Our Complete Fleet"
        subtitle="Explore our entire collection of luxury vehicles"
        className="pt-20"
      />
      <Footer />
    </div>
  );
};

export default Fleet;