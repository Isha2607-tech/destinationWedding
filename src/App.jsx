import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WeddingLayout from "./modules/wedding/components/WeddingLayout";
import WeddingHomePage from "./modules/wedding/views/WeddingHomePage";
import DestinationsPage from "./modules/wedding/views/DestinationsPage";
import DestinationDetailPage from "./modules/wedding/views/DestinationDetailPage";
import PlannersPage from "./modules/wedding/views/PlannersPage";
import PlannerDetailPage from "./modules/wedding/views/PlannerDetailPage";
import RealWeddingsByLocation from "./modules/wedding/views/RealWeddingsByLocation";
import RealWeddingGalleryPage from "./modules/wedding/views/RealWeddingGalleryPage";
import MyBookingsPage from "./modules/wedding/views/MyBookingsPage";
import BookingDetailPage from "./modules/wedding/views/BookingDetailPage";
import SavedDestinationsPage from "./modules/wedding/views/SavedDestinationsPage";
import MyEnquiriesPage from "./modules/wedding/views/MyEnquiriesPage";
import AccountSettingsPage from "./modules/wedding/views/AccountSettingsPage";
import VenueDetailPage from "./modules/wedding/views/VenueDetailPage";
import WeddingEnquiryPage from "./modules/wedding/views/WeddingEnquiryPage";
import NotFound from "./app-pages/NotFound.jsx";
import Welcome from "./app-pages/Welcome.jsx";
import VendorLayout from "./modules/vendor/components/VendorLayout";
import Step1BasicInfo from "./modules/vendor/onboarding/views/Step1BasicInfo";
import Step2Portfolio from "./modules/vendor/onboarding/views/Step2Portfolio";
import Step3Services from "./modules/vendor/onboarding/views/Step3Services";
import Step4Pricing from "./modules/vendor/onboarding/views/Step4Pricing";
import ReviewSubmit from "./modules/vendor/onboarding/views/ReviewSubmit";
import VendorDashboard from "./modules/vendor/dashboard/views/VendorDashboard";
import VendorServices from "./modules/vendor/services/views/VendorServices";
import VendorPortfolio from "./modules/vendor/portfolio/views/VendorPortfolio";
import VendorLeads from "./modules/vendor/leads/views/VendorLeads";
import LeadDetails from "./modules/vendor/leads/views/LeadDetails";

import VendorSignup from "./modules/vendor/auth/views/VendorSignup";
import VendorLogin from "./modules/vendor/auth/views/VendorLogin";
import { AuthProvider } from "./modules/vendor/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/wedding" element={<WeddingLayout />}>
            <Route index element={<WeddingHomePage />} />
            <Route path="destinations" element={<DestinationsPage />} />
            <Route
              path="destinations/:id"
              element={<DestinationDetailPage />}
            />
            <Route
              path="destinations/:destId/venues/:venueId"
              element={<VenueDetailPage />}
            />
            <Route path="planners" element={<PlannersPage />} />
            <Route path="planners/:id" element={<PlannerDetailPage />} />
            <Route path="enquiry" element={<WeddingEnquiryPage />} />
            <Route path="bookings" element={<MyBookingsPage />} />
            <Route path="bookings/:bookingId" element={<BookingDetailPage />} />
            <Route path="saved" element={<SavedDestinationsPage />} />
            <Route path="my-enquiries" element={<MyEnquiriesPage />} />
            <Route path="settings" element={<AccountSettingsPage />} />
            <Route path="real-weddings/by-location/:destinationId" element={<RealWeddingsByLocation />} />
            <Route path="real-weddings/gallery/:weddingId" element={<RealWeddingGalleryPage />} />
          </Route>
          
          <Route path="/vendor/*" element={<AuthProvider><Routes>
            <Route element={<VendorLayout />}>
              <Route index element={<Navigate to="/vendor/login" replace />} />
              <Route path="onboarding/step-1" element={<Step1BasicInfo />} />
              <Route path="onboarding/step-2" element={<Step2Portfolio />} />
              <Route path="onboarding/step-3" element={<Step3Services />} />
              <Route path="onboarding/step-4" element={<Step4Pricing />} />
              <Route path="onboarding/review" element={<ReviewSubmit />} />
              <Route path="dashboard" element={<VendorDashboard />} />
              <Route path="services" element={<VendorServices />} />
              <Route path="portfolio" element={<VendorPortfolio />} />
              <Route path="leads" element={<VendorLeads />} />
              <Route path="leads/:id" element={<LeadDetails />} />
            </Route>
            {/* Auth routes outside of layout but inside AuthProvider */}
            <Route path="login" element={<VendorLogin />} />
            <Route path="signup" element={<VendorSignup />} />
          </Routes></AuthProvider>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
