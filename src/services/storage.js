import { destinations as staticDestinations } from "../modules/wedding/data/weddingData";

const STORAGE_KEYS = {
  ADMIN_DESTINATIONS: 'admin_destinations',
  VENDOR_VENUES: 'vendor_venues',
};

// --- Destination Helpers ---

export const getAdminDestinations = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_DESTINATIONS) || "[]");
  } catch {
    return [];
  }
};

export const saveAdminDestination = (dest) => {
  const existing = getAdminDestinations();
  const newDest = {
    ...dest,
    id: `custom-${Date.now()}`,
    plannerIds: [], // Placeholder for future expansion
    venues: [],     // Dynamic venues will be merged separately
  };
  existing.push(newDest);
  localStorage.setItem(STORAGE_KEYS.ADMIN_DESTINATIONS, JSON.stringify(existing));
  return newDest;
};

export const deleteAdminDestination = (id) => {
  const existing = getAdminDestinations().filter(d => d.id !== id);
  localStorage.setItem(STORAGE_KEYS.ADMIN_DESTINATIONS, JSON.stringify(existing));
};

export const getAllDestinations = () => {
  const adminDests = getAdminDestinations();
  // Standardize the format to match weddingData
  return [...staticDestinations, ...adminDests];
};

// --- Venue Helpers ---

export const getVendorVenues = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VENDOR_VENUES) || "[]");
  } catch {
    return [];
  }
};

export const saveVendorVenue = (venue) => {
  const existing = getVendorVenues();
  const newVenue = {
    ...venue,
    id: `v-custom-${Date.now()}`,
    status: 'pending', // Always pending initially
    createdAt: new Date().toISOString(),
  };
  existing.push(newVenue);
  localStorage.setItem(STORAGE_KEYS.VENDOR_VENUES, JSON.stringify(existing));
  return newVenue;
};

export const updateVendorVenue = (updatedVenue) => {
  const existing = getVendorVenues();
  const index = existing.findIndex(v => v.id === updatedVenue.id);
  if (index !== -1) {
    existing[index] = { ...existing[index], ...updatedVenue };
    localStorage.setItem(STORAGE_KEYS.VENDOR_VENUES, JSON.stringify(existing));
    return existing[index];
  }
  return null;
};

export const updateVenueStatus = (id, status) => {
  const existing = getVendorVenues().map(v => 
    v.id === id ? { ...v, status } : v
  );
  localStorage.setItem(STORAGE_KEYS.VENDOR_VENUES, JSON.stringify(existing));
};

export const getApprovedVenuesByDestination = (destId) => {
  const allVenues = getVendorVenues();
  return allVenues.filter(v => v.destinationId === destId && v.status === 'approved');
};
