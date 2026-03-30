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
import VendorListingPage from "./modules/wedding/views/VendorListingPage";
import VendorDetailPage from "./modules/wedding/views/VendorDetailPage";
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
import OnboardingLayout from "./modules/vendor/components/VendorLayout";
import Step1BasicInfo from "./modules/vendor/onboarding/views/Step1BasicInfo";
import Step2Portfolio from "./modules/vendor/onboarding/views/Step2Portfolio";
import Step3Services from "./modules/vendor/onboarding/views/Step3Services";
import Step4Pricing from "./modules/vendor/onboarding/views/Step4Pricing";
import Step5KYC from "./modules/vendor/onboarding/views/Step5KYC";
import ReviewSubmit from "./modules/vendor/onboarding/views/ReviewSubmit";
import DashboardHome from "./modules/vendor/panel/views/DashboardHome";
import ProfileEditor from "./modules/vendor/panel/views/ProfileEditor";
import WorkManager from "./modules/vendor/panel/views/WorkManager";
import LeadsInbox from "./modules/vendor/panel/views/LeadsInbox";
import ReviewsManager from "./modules/vendor/panel/views/ReviewsManager";
import VendorSettings from "./modules/vendor/panel/views/VendorSettings";

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
            <Route path="vendors" element={<VendorListingPage />} />
            <Route path="vendors/:vendorId" element={<VendorDetailPage />} />
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
            <Route element={<OnboardingLayout />}>
              <Route index element={<Navigate to="/vendor/login" replace />} />
              <Route path="onboarding/step-1" element={<Step1BasicInfo />} />
              <Route path="onboarding/step-2" element={<Step2Portfolio />} />
              <Route path="onboarding/step-3" element={<Step3Services />} />
              <Route path="onboarding/step-4" element={<Step4Pricing />} />
              <Route path="onboarding/step-5" element={<Step5KYC />} />
              <Route path="onboarding/review" element={<ReviewSubmit />} />
            </Route>

            {/* Dashboard routes use their own Layout internally */}
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="work" element={<WorkManager />} />
            <Route path="leads" element={<LeadsInbox />} />
            <Route path="reviews" element={<ReviewsManager />} />
            <Route path="settings" element={<VendorSettings />} />
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
