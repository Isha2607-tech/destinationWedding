import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  UserCircle, 
  Image as ImageIcon, 
  MessageSquare, 
  Star, 
  Settings, 
  X,
  LogOut 
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/vendor/dashboard" },
  { id: "profile", label: "My Profile", icon: UserCircle, path: "/vendor/profile" },
  { id: "work", label: "My Work", icon: ImageIcon, path: "/vendor/work" },
  { id: "leads", label: "Leads", icon: MessageSquare, path: "/vendor/leads" },
  { id: "reviews", label: "Reviews", icon: Star, path: "/vendor/reviews" },
  { id: "settings", label: "Settings", icon: Settings, path: "/vendor/settings" },
];

const VendorSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#FFFDFB] border-r border-[#F3E9E2] z-50 transition-transform duration-300 transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between mb-10">
            <Link to="/wedding" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#D28A8C] flex items-center justify-center shadow-lg shadow-[#D28A8C]/20">
                <span className="text-white font-black text-xl italic pt-0.5">D</span>
              </div>
              <span className="font-black text-xl italic text-[#4A3730]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Destine
              </span>
            </Link>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[14px] transition-all duration-300 group ${
                    isActive 
                      ? "bg-[#D28A8C] text-white shadow-xl shadow-[#D28A8C]/20" 
                      : "text-[#8E7E77] hover:bg-[#F3E9E2] hover:text-[#D28A8C]"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button className="mt-auto flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[14px] text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default VendorSidebar;
