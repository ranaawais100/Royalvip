import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import FloatingChatbot from "./components/FloatingChatbot";
import FloatingCallButton from "./components/FloatingCallButton";
// Import EmailJS debug utilities for browser console testing
import "./utils/emailJSDebug";
import Index from "./pages/Index";
import Fleet from "./pages/Fleet";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PremiumCarDemo from "./pages/PremiumCarDemo";
import CarDetails from "./pages/CarDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import BlogAdmin from "./pages/BlogAdmin";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/premium-demo" element={<PremiumCarDemo />} />
          <Route path="/car/:carId" element={<CarDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/admin/blog" element={<BlogAdmin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
        <FloatingChatbot />
        <FloatingCallButton />
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
