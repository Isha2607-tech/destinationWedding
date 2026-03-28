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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
