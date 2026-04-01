/**
 * Centralized Theme Configuration for the Admin Panel
 * Based on the core "Wedding" design system.
 */

export const ADMIN_THEME = {
  colors: {
    primary: "hsl(353 45% 35%)", // Deep Maroon
    primaryForeground: "hsl(0 0% 100%)",
    secondary: "hsl(353 30% 94%)", // Soft Pink
    secondaryForeground: "hsl(353 45% 25%)",
    background: "#FFF5F7", 
    card: "#FFFFFF", 
    border: "hsl(353 20% 88%)",
    accent: "hsl(353 45% 45%)",
    muted: "hsl(353 15% 45%)"
  },
  glassmorphism: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropBlur: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(129, 49, 58, 0.1)"
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif"
  },
  animations: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  }
};

export const adminStyles = {
  glassCard: "bg-white border border-[#F3E9E2] shadow-sm hover:shadow-md transition-all duration-300",
  primaryButton: "bg-[hsl(353,45%,35%)] text-white hover:bg-[hsl(353,45%,40%)] transition-all",
  heading: "font-serif text-[hsl(353,45%,35%)]",
  sidebarItem: "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-[hsl(353,45%,35%)]/10 text-[hsl(353,20%,15%)]",
  sidebarItemActive: "bg-[hsl(353,45%,35%)] text-white shadow-md"
};
