import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Lock, 
  User, 
  LogOut, 
  Eye, 
  ShieldCheck, 
  MessageSquare,
  Globe,
  Settings2
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const VendorSettings = () => {
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
    <VendorLayout title="Settings">
      <div className="max-w-3xl mx-auto space-y-8 animate-wedding-fade-up">
        
        {/* Profile Stats Overview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-white/60 backdrop-blur rounded-[2.5rem] border border-[#F3E9E2] shadow-sm">
           <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl relative group shrink-0">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" alt="Vendor" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.1]" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent" />
           </div>
           <div className="text-center sm:text-left space-y-1">
              <h3 className="text-2xl font-black text-[#4A3730]">{vendorName}</h3>
              <p className="text-[11px] font-bold text-[#8E7E77] uppercase tracking-widest leading-none">Photographer • Mumbai</p>
              <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[10px] mt-2 justify-center sm:justify-start">
                 <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED ACCOUNT
              </div>
           </div>
           <button className="sm:ml-auto px-5 py-3 rounded-2xl bg-[#B06A6C]/10 text-[#B06A6C] font-bold text-xs hover:bg-[#B06A6C] hover:text-white transition-all shadow-inner">
              Edit Avatar
           </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
           {/* Section: Notifications */}
           <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-[#F3E9E2] flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-400 flex items-center justify-center">
                    <Bell className="w-5 h-5 transition-transform group-hover:scale-110" />
                 </div>
                 <h4 className="text-lg font-black text-[#4A3730] " >Notifications</h4>
              </div>
              <div className="p-8 space-y-6">
                 {[
                   { title: "New Lead Alerts", desc: "Receive real-time push notifications for user enquiries.", icon: MessageSquare, checked: true },
                   { title: "WhatsApp Updates", desc: "Get notification links on your business WhatsApp.", icon: Globe, checked: true },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-5">
                         <div className="w-5 h-5 rounded-md border-2 border-[#B06A6C] flex items-center justify-center bg-[#B06A6C] text-white">
                            <span className="text-[10px] pb-0.5 font-black">✓</span>
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-sm font-black text-[#4A3730]">{item.title}</p>
                            <p className="text-[11px] text-[#8E7E77] font-medium">{item.desc}</p>
                         </div>
                      </div>
                      <div className="w-10 h-6 bg-[#B06A6C] rounded-full relative shadow-inner cursor-pointer">
                         <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Section: Security */}
           <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-[#F3E9E2] flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
                 </div>
                 <h4 className="text-lg font-black text-[#4A3730] " >Security</h4>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-widest ml-1">Current Password</label>
                    <div className="relative group">
                       <input 
                          type="password" 
                          defaultValue="********"
                          className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl px-5 py-4 text-sm font-bold text-slate-800 outline-none focus:border-[#B06A6C] transition-all"
                       />
                       <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 cursor-pointer hover:text-slate-500 transition-colors" />
                    </div>
                 </div>
                 <button className="text-[11px] font-black text-[#B06A6C] uppercase tracking-widest hover:underline">
                    Reset via Email
                 </button>
              </div>
           </div>

           {/* Bottom Actions */}
           <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="w-full sm:flex-1 py-4 bg-[#B06A6C] text-white font-black text-sm rounded-2xl shadow-xl shadow-[#B06A6C]/20 hover:scale-[1.02] active:scale-95 transition-all">
                 Save Settings
              </button>
              <button className="w-full sm:flex-1 py-4 bg-rose-50 text-rose-500 font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-rose-100 hover:text-rose-600 active:scale-95 transition-all">
                 <LogOut className="w-5 h-5" /> Logout
              </button>
           </div>
        </div>

        <div className="py-10 text-center">
           <p className="text-[10px] font-black text-slate-200 uppercase tracking-widest  " >
             Destine Vendor v1.0.4 • Powered by Anti-Gravity
           </p>
        </div>
      </div>
    </VendorLayout>
  );
};

export default VendorSettings;
