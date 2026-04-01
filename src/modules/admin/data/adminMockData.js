/**
 * Mock data for the Admin Panel
 */

export const adminStats = [
  { label: "Total Vendors", value: "124", change: "+12% from last month", icon: "Users", path: "/admin/vendors/all" },
  { label: "Pending Approvals", value: "8", change: "Requires attention", icon: "Clock", path: "/admin/vendors/pending" },
  { label: "Total Enquiries", value: "458", change: "+25% from last month", icon: "MessageSquare", path: "/admin/enquiries" },
  { label: "Gross Leads Value", value: "₹45.2L", change: "+18% from last month", icon: "TrendingUp", path: "/admin/dashboard" }
];

export const pendingVendors = [
  { id: 1, name: "Royal Photography", category: "Photography", location: "Udaipur", status: "Pending", date: "2024-03-28" },
  { id: 2, name: "Gourmet Flavors", category: "Catering", location: "Goa", status: "Pending", date: "2024-03-29" },
  { id: 3, name: "Eternal Blooms", category: "Decor", location: "Jaipur", status: "Pending", date: "2024-03-30" }
];

export const recentEnquiries = [
  { id: "ENQ001", client: "Aditya & Priya", requirement: "Full Wedding Planner", destination: "Udaipur", budget: "₹50L-80L", status: "New" },
  { id: "ENQ002", client: "Vikram & Ananya", requirement: "Venue Only", destination: "Goa", budget: "₹20L-40L", status: "Contacted" },
  { id: "ENQ003", client: "Rohan & Sneha", requirement: "Photography & Decor", destination: "Mussoorie", budget: "₹15L-25L", status: "New" }
];

export const destinations = [
  { id: "DEST01", name: "Udaipur", state: "Rajasthan", venues: 45, realWeddings: 12 },
  { id: "DEST02", name: "Goa", state: "Goa", venues: 68, realWeddings: 24 },
  { id: "DEST03", name: "Jaipur", state: "Rajasthan", venues: 52, realWeddings: 18 }
];
