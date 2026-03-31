import React, { useState, useEffect } from "react";
import { CheckCircle, MapPin, Star, TrendingUp, Image as ImageIcon, ExternalLink, Mail } from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const LivePreview = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    about: "",
    location: "",
    category: "Photographers",
    rating: 4.8,
    reviews: 0,
    services: [],
    phone: "",
    email: "",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    basePackage: {
      price: "",
      unit: "per day",
      features: ""
    },
    premiumPackage: {
      price: "",
      unit: "per day",
      features: ""
    },
    portfolio: [],
    albums: [],
    videos: [],
    isFeatured: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('vendorPreviewData');
    if (saved) {
      setVendorData(prev => ({ ...prev, ...JSON.parse(saved) }));
    }

    const handleUpdate = (e) => {
      if (e.detail) {
        setVendorData(prev => ({ ...prev, ...e.detail }));
      }
    };

    window.addEventListener('vendorProfileUpdate', handleUpdate);
    return () => window.removeEventListener('vendorProfileUpdate', handleUpdate);
  }, []);

  return (
    <VendorLayout title="Live Profile Showcase">
      <div className="max-w-5xl mx-auto space-y-8 animate-wedding-fade-up pb-12">
        {/* Page Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F3E9E2]">
          <div>
            <h2 className="text-xl font-black text-[#4A3730]">Your Public Showcase</h2>
            <p className="text-xs text-[#8E7E77] font-medium mt-1">This is exactly how clients will see your profile on Destine.</p>
          </div>
          <button className="px-6 py-3 rounded-[1.5rem] bg-gradient-to-r from-primary to-[#C17A7C] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2 group">
            Live Public View <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* The Main Preview Card */}
        <div className="bg-white rounded-[3rem] border border-[#F3E9E2] shadow-2xl shadow-[#4A3730]/5 overflow-hidden">
          
          {/* 1. Hero Banner */}
          <div className="relative h-64 md:h-96 w-full bg-slate-100 group">
            <img 
              src={vendorData.banner} 
              alt="BannerPreview"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Vendor Identity Float */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] border-4 border-white/90 shadow-2xl overflow-hidden shrink-0 rotate-3 transition-transform hover:rotate-0 bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150" 
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left text-white space-y-2 pb-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">{vendorData.name || "Business Name"}</h1>
                    {vendorData.name && <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 filter drop-shadow-lg" />}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2.5 text-xs md:text-sm font-bold opacity-90 uppercase tracking-[0.2em]">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" /> {vendorData.location || "City Location"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Top Stats Bar */}
          <div className="flex flex-wrap items-center justify-between px-8 md:px-12 py-6 bg-[#FDFBF9] border-b border-[#F3E9E2]">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-[#8E7E77] uppercase tracking-[0.3em]">Customer Rating</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-xl text-sm md:text-base font-black shadow-sm">
                    <Star className="w-4 h-4 fill-emerald-600" />
                    {vendorData.rating}
                  </div>
                  <span className="text-xs font-bold text-slate-400">{vendorData.reviews} Reviews</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button className="px-6 py-3 rounded-2xl bg-white border border-[#F3E9E2] text-[#4A3730] font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> Send Message
              </button>
              <button className="px-6 py-3 rounded-2xl bg-[#4A3730] text-white font-black text-xs uppercase tracking-widest shadow-lg hover:bg-black transition-all flex items-center gap-2">
                Get Pricing
              </button>
            </div>
          </div>

          {/* 3. Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F3E9E2]">
            
            {/* Left Col: Story & Work */}
            <div className="col-span-2 p-8 md:p-12 space-y-12 bg-white">
              <div className="space-y-5">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#4A3730] flex items-center gap-3">
                   <div className="w-1.5 h-4 bg-primary rounded-full" /> Our Story
                </h3>
                <p className="text-sm text-[#8E7E77] font-medium leading-[2] indent-6 text-justify">
                   {vendorData.about || "Your business story will appear here once you start writing. Tell clients about your experience, your unique style, and what makes your destination wedding services truly magical..."}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#4A3730] flex items-center gap-3">
                       <div className="w-1.5 h-4 bg-primary rounded-full" /> Featured Portfolio
                   </h3>
                   <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full">{vendorData.portfolio.length} Projects</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {[0, 1, 2, 3, 4, 5].map((idx) => (
                      <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden bg-[#F3E9E2]/30 border border-[#F3E9E2] flex items-center justify-center group relative cursor-pointer">
                         {vendorData.portfolio[idx] ? (
                            <>
                              <img src={vendorData.portfolio[idx]} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                         ) : (
                            <div className="text-center group-hover:scale-105 transition-transform">
                              <ImageIcon className="w-8 h-8 text-[#DED0C5] mx-auto mb-2" />
                              <span className="text-[9px] font-bold text-[#8E7E77] uppercase tracking-widest">Image {idx + 1}</span>
                            </div>
                         )}
                      </div>
                   ))}
                </div>
              </div>
            </div>

            {/* Right Col: Pricing */}
            <div className="col-span-1 bg-[#FDFBF9] p-8 md:p-10 space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[#4A3730] flex items-center gap-3">
                  <div className="w-1.5 h-4 bg-primary rounded-full" /> Investment
              </h3>
              
              <div className="space-y-6">
                {/* Base Tier */}
                <div className="relative p-6 bg-white border border-[#F3E9E2] rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Base Selection</p>
                        <p className="text-2xl font-black text-[#4A3730]">{vendorData.basePackage.price || "₹ --,---"}</p>
                      </div>
                      <span className="text-[9px] font-bold text-[#8E7E77] uppercase tracking-widest bg-[#F3E9E2]/40 px-3 py-1.5 rounded-xl">{vendorData.basePackage.unit}</span>
                    </div>
                    <div className="pt-4 border-t border-[#F3E9E2]/60">
                      <p className="text-[11px] text-[#8E7E77] font-medium leading-[1.8]">
                        {vendorData.basePackage.features || "Essential coverage includes standard deliverables..."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Premium Tier */}
                <div className="relative p-7 bg-gradient-to-br from-[#4A3730] to-[#2A1F1B] border border-[#4A3730] rounded-[2.5rem] shadow-2xl overflow-hidden group/prem cursor-pointer hover:-translate-y-1 transition-all duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 group-hover/prem:scale-150 transition-transform duration-1000" />
                  <div className="absolute top-4 right-6">
                    <span className="text-[8px] font-black text-[#4A3730] uppercase tracking-widest bg-emerald-400 px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-400/20">Most Popular</span>
                  </div>
                  
                  <div className="space-y-5 relative z-10 mt-2">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.25em]">Luxury Tier</p>
                      <p className="text-3xl font-black text-white">{vendorData.premiumPackage.price || "₹ --,---"}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[11px] text-white/70 font-medium leading-[1.8]">
                        {vendorData.premiumPackage.features || "Comprehensive coverage with premium albums and multiple day support..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility Booster */}
              <div className="mt-10 p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex gap-4">
                 <TrendingUp className="w-8 h-8 text-emerald-500 shrink-0" />
                 <div className="space-y-1">
                    <h6 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest">Optimized Profile</h6>
                    <p className="text-[10px] font-medium text-emerald-700/80 leading-relaxed">
                       Your layout looks fantastic. High fidelity images and clear tiers improve conversion by 30%.
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default LivePreview;
