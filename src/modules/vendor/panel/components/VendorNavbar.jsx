import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown, 
  UserCircle 
} from "lucide-react";

const VendorNavbar = ({ onOpenSidebar, title = "Dashboard" }) => {
  const [vendorName, setVendorName] = useState("Zoya Khan");
  
  useEffect(() => {
    const saved = localStorage.getItem('vendorPreviewData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.name) setVendorName(data.name);
    }

    const handleUpdate = (e) => {
      if (e.detail && e.detail.name) setVendorName(e.detail.name);
    };

    window.addEventListener('vendorProfileUpdate', handleUpdate);
    return () => window.removeEventListener('vendorProfileUpdate', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 right-0 left-0 bg-[#F7F1ED] border-b border-[#DED0C5] z-40 transition-all duration-500 shadow-sm">
      <div className="flex h-20 items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenSidebar}
            className="lg:hidden w-12 h-12 rounded-2xl bg-white border border-[#F3E9E2] flex items-center justify-center text-[#B06A6C] shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#4A3730] uppercase tracking-wider leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B06A6C] animate-pulse" />
              <p className="text-[10px] font-black text-[#7B6A62] uppercase tracking-[0.25em]">
                Vendor Workspace
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden lg:flex relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 transition-colors group-focus-within:text-[#B06A6C]" />
            <input 
              type="text" 
              placeholder="Quick Search..."
              className="pl-10 pr-4 py-2 bg-[#F3E9E2]/50 border border-transparent focus:border-[#B06A6C]/20 focus:bg-white rounded-xl text-[13px] font-medium transition-all w-64 focus:w-80 outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-10 h-10 rounded-xl bg-white border border-[#F3E9E2] text-slate-400 flex items-center justify-center hover:bg-[#F3E9E2] transition-colors group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-400 rounded-full border-2 border-white" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#B06A6C]/10 text-[#B06A6C] flex items-center justify-center hover:bg-[#B06A6C] hover:text-white transition-all group">
              <Search className="lg:hidden w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="h-8 w-[1px] bg-[#F3E9E2] mx-1 hidden sm:block" />

          {/* Profile Dropdown */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-md relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            <div className="hidden sm:flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-[#4A3730]">{vendorName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E7E77] group-hover:translate-y-0.5 transition-transform" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorNavbar;
