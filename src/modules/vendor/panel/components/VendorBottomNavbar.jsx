import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCircle, 
  Image as ImageIcon, 
  MessageSquare, 
  Star,
  Settings
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, path: "/vendor/dashboard" },
  { id: "leads", label: "Leads", icon: MessageSquare, path: "/vendor/leads" },
  { id: "work", label: "Work", icon: ImageIcon, path: "/vendor/work" },
  { id: "reviews", label: "Love", icon: Star, path: "/vendor/reviews" },
  { id: "profile", label: "Profile", icon: UserCircle, path: "/vendor/profile" },
  { id: "settings", label: "Admin", icon: Settings, path: "/vendor/settings" },
];

const VendorBottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#F3E9E2] px-2 py-2.5 z-50 flex items-center justify-between pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative flex-1 min-w-0 ${
              isActive ? "scale-105" : "hover:scale-105"
            }`}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isActive 
                ? "bg-[#B06A6C]/10 text-[#B06A6C]" 
                : "text-[#8E7E77] hover:bg-[#F3E9E2]/30"
            }`}>
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.5px]"}`} />
            </div>
            <span className={`text-[9px] font-black uppercase tracking-widest truncate w-full text-center ${
              isActive ? "text-[#B06A6C]" : "text-[#8E7E77]"
            }`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default VendorBottomNavbar;
