import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCircle, 
  Image as ImageIcon, 
  MessageSquare, 
  Star, 
  Settings, 
  X,
  LogOut,
  Eye
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Vendor Dashboard", icon: LayoutDashboard, path: "/vendor/dashboard" },
  { id: "profile", label: "Vendor Profile", icon: UserCircle, path: "/vendor/profile" },
  { id: "work", label: "Portfolio & Work", icon: ImageIcon, path: "/vendor/work" },
  { id: "leads", label: "Enquiry Inbox", icon: MessageSquare, path: "/vendor/leads" },
  { id: "reviews", label: "Client Love", icon: Star, path: "/vendor/reviews" },
  { id: "settings", label: "Vendor Settings", icon: Settings, path: "/vendor/settings" },
];

const VendorSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [vendorName, setVendorName] = useState("Zoya Khan");

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail && e.detail.name) setVendorName(e.detail.name);
    };

    window.addEventListener('vendorProfileUpdate', handleUpdate);
    return () => window.removeEventListener('vendorProfileUpdate', handleUpdate);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden transition-all duration-500"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed top-0 lg:top-4 left-0 lg:left-4 bottom-0 lg:bottom-4 w-72 bg-gradient-to-b from-[#EBE0D8] to-[#F3E9E2] border border-[#DED0C5] z-50 transition-all duration-500 transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-[#4A3730]/10 overflow-hidden`}
      >
        <div className="h-full flex flex-col p-8">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-12">
            <Link to="/wedding" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B06A6C] to-[#9E5A5C] flex items-center justify-center shadow-xl shadow-[#B06A6C]/30 transition-transform group-hover:rotate-6">
                <span className="text-white font-black text-2xl  pt-0.5">D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl  text-[#4A3730] leading-none" >
                  Destine
                </span>
                <span className="text-[10px] font-black text-[#B06A6C] uppercase tracking-[0.2em] mt-1 ml-0.5 opacity-80">
                  Business
                </span>
              </div>
            </Link>
            <button 
              onClick={onClose}
              className="lg:hidden p-2.5 rounded-2xl bg-[#F3E9E2] text-[#B06A6C] hover:bg-[#B06A6C] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-4 rounded-[1.25rem] font-black text-[13px] transition-all duration-500 group relative overflow-hidden ${
                    isActive 
                      ? "bg-gradient-to-r from-[#B06A6C] to-[#C17A7C] text-white shadow-lg shadow-[#B06A6C]/30" 
                      : "text-[#7B6A62] hover:bg-white/40 hover:text-[#B06A6C]"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-all duration-500 ${isActive ? "scale-110 rotate-3" : "group-hover:scale-110 active:scale-90"}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Preview & Profile Actions */}
          <div className="mt-8 pt-8 border-t border-[#F3E9E2]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-xl rotate-3 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                    alt="Owner" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-[#4A3730]">{vendorName}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[10px] font-bold text-[#7B6A62] uppercase tracking-widest leading-none mt-0.5">Vendor Admin</span>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-black text-[12px] bg-white/40 text-rose-600 border border-rose-200/50 hover:bg-rose-500 hover:text-white transition-all group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                Sign Out Vendor
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default VendorSidebar;
