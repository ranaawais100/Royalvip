import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, Phone, Car, Crown, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import firebaseService from "@/services/firebaseService";
import emailService from "@/services/emailService";


const Booking = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleType: "",
    passengers: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);


  // Handle URL parameters for pre-filled car name
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const carName = urlParams.get('car');
    if (carName) {
      // Map car names to vehicle types
      const carToVehicleMap: { [key: string]: string } = {
        'luxury sprinter': 'luxury-sedan',
        'mercedes v class': 'luxury-sedan', 
        'van': 'suv',
        'luxury chauffeur': 'rolls-royce',
        'bus': 'party-bus',
        'stretched limousine': 'limousine'
      };
      
      const vehicleType = carToVehicleMap[carName.toLowerCase()] || 'luxury-sedan';
      setFormData(prev => ({ ...prev, vehicleType }));
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare booking data for Firebase
      const bookingData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        vehicleType: formData.vehicleType,
        passengers: parseInt(formData.passengers) || 1
      };

      // Create booking using Firebase service
      const bookingId = await firebaseService.createBooking(bookingData);
      
      // Get the complete booking data with ID for email
      const completeBookingData = {
        ...bookingData,
        id: bookingId,
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Send email notifications (don't block on email failures)
      try {
        await emailService.sendBookingEmails(completeBookingData);
        console.log("Email notifications sent successfully");
      } catch (emailError) {
        console.error("Failed to send email notifications:", emailError);
        // Continue with booking success even if email fails
      }
      
      console.log("Booking submitted successfully with ID:", bookingId);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      alert(error.message || "Failed to submit booking. Please try again.");
    }
  };

  const vehicleTypes = [
    { value: "luxury-sedan", label: "Luxury Sedan", price: "AED 550/day" },
    { value: "limousine", label: "Stretch Limousine", price: "AED 1100/day" },
    { value: "suv", label: "Luxury SUV", price: "AED 750/day" },
    { value: "party-bus", label: "Party Bus", price: "AED 1850/day" },
    { value: "rolls-royce", label: "Rolls Royce", price: "AED 3000/day" }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Thank you for choosing Royal VIP Luxury Limousines. We'll contact you shortly to confirm your reservation details.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                  <ul className="text-green-700 text-left space-y-2">
                    <li>• You'll receive a confirmation email within 15 minutes</li>
                    <li>• Our team will call you within 2 hours to finalize details</li>
                    <li>• Payment can be made online or upon pickup</li>
                    <li>• Your chauffeur will arrive 15 minutes early</li>
                  </ul>
                </div>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  Make Another Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-primary mr-3" />
              <span className="text-primary font-semibold tracking-wider uppercase">Premium Booking</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reserve Your <span className="text-primary">Luxury</span> Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Book your premium limousine service with Royal VIP. Experience unparalleled luxury, 
              professional service, and arrive in style for any occasion.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your contact details for the reservation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Vehicle Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="h-5 w-5 mr-2" />
                    Vehicle Selection
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred luxury vehicle and specify passenger count.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type *</Label>
                      <Select value={formData.vehicleType} onValueChange={(value) => handleInputChange('vehicleType', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map((vehicle) => (
                            <SelectItem key={vehicle.value} value={vehicle.value}>
                              <div className="flex justify-between items-center w-full">
                                <span>{vehicle.label}</span>
                                <span className="text-primary font-semibold ml-4">{vehicle.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passengers">Number of Passengers *</Label>
                      <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select passenger count" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Passenger' : 'Passengers'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>





              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-4 text-lg"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Reserve Your Luxury Experience
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  By submitting this form, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;