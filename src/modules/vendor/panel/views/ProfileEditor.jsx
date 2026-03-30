import React, { useState } from "react";
import { 
  Save, 
  MapPin, 
  Star, 
  CheckCircle, 
  Info, 
  Tag, 
  Phone,
  Mail,
  Camera,
  RotateCcw
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const ProfileEditor = () => {
  const [vendorData, setVendorData] = useState({
    name: "Zoya Khan Photography",
    about: "We capture the raw emotions and cinematic highlights of your big day. With over 5 years of experience in destination weddings across India.",
    location: "Borivali, Mumbai",
    category: "Photographers",
    rating: 4.8,
    reviews: 50,
    services: ["Candid Photography", "Wedding Films", "Pre-Wedding Shoot"],
    phone: "+91 98765 43210",
    email: "zoya@photoworks.com",
    price: "₹65,000",
    priceUnit: "per day",
    isFeatured: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <VendorLayout title="Edit Profile">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
        
        {/* LEFT: Editor Form */}
        <div className="order-1 space-y-8 animate-wedding-fade-up">
           <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] p-8 md:p-10 shadow-sm space-y-10">
              
              {/* Basic Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Info className="w-5 h-5 text-[#D28A8C]" />
                  </div>
                  <h3 className="text-xl font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="space-y-2">
                     <label className="text-xs font-black text-[#8E7E77] uppercase tracking-widest ml-1">Business Name</label>
                     <input 
                       name="name"
                       value={vendorData.name}
                       onChange={handleChange}
                       className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl px-5 py-4 text-sm font-bold text-[#4A3730] outline-none focus:border-[#D28A8C] transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black text-[#8E7E77] uppercase tracking-widest ml-1">Location</label>
                     <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          name="location"
                          value={vendorData.location}
                          onChange={handleChange}
                          className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-[#4A3730] outline-none focus:border-[#D28A8C] transition-all"
                        />
                     </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-black text-[#8E7E77] uppercase tracking-widest ml-1">About Us</label>
                   <textarea 
                     name="about"
                     value={vendorData.about}
                     onChange={handleChange}
                     rows={4}
                     className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl px-5 py-4 text-sm font-medium text-[#4A3730] outline-none focus:border-[#D28A8C] transition-all resize-none"
                   />
                </div>
              </div>

              {/* Service & Contact Section */}
              <div className="space-y-6 pt-6 border-t border-[#F3E9E2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Services & Pricing
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="space-y-2">
                     <label className="text-xs font-black text-[#8E7E77] uppercase tracking-widest ml-1">Starting Price</label>
                     <input 
                       name="price"
                       value={vendorData.price}
                       onChange={handleChange}
                       className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl px-5 py-4 text-sm font-bold text-[#4A3730] outline-none focus:border-[#D28A8C] transition-all"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black text-[#8E7E77] uppercase tracking-widest ml-1">Price Unit</label>
                     <select 
                       name="priceUnit"
                       value={vendorData.priceUnit}
                       onChange={handleChange}
                       className="w-full bg-[#F3E9E2]/30 border border-[#F3E9E2] rounded-2xl px-5 py-4 text-sm font-bold text-[#4A3730] outline-none focus:border-[#D28A8C] transition-all appearance-none"
                     >
                       <option value="per day">per day</option>
                       <option value="per event">per event</option>
                       <option value="fixed">fixed package</option>
                     </select>
                   </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-4 pt-4">
                 <button className="flex-1 bg-[#D28A8C] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#D28A8C]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                   <Save className="w-5 h-5" /> Save Changes
                 </button>
                 <button className="px-6 bg-white border border-[#F3E9E2] text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2">
                   <RotateCcw className="w-5 h-5" /> Reset
                 </button>
              </div>
           </div>
        </div>

        {/* RIGHT: Live Preview Pane */}
        <div className="order-2 xl:sticky xl:top-28 space-y-4 animate-wedding-fade-up" style={{ animationDelay: '300ms' }}>
           <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-sm font-black text-[#8E7E77] uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview
              </h3>
              <button className="text-[11px] font-black text-[#D28A8C] uppercase tracking-widest hover:underline">
                View Full Page
              </button>
           </div>
           
           <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] shadow-2xl overflow-hidden group">
              {/* Mock Header (Shrunken Detail View) */}
              <div className="h-48 relative overflow-hidden bg-slate-100">
                 <img 
                   src="https://images.unsplash.com/photo-1550005816-09246d377488?q=80&w=600&auto=format&fit=crop" 
                   alt="Preview Hero"
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-6 left-6 flex items-center gap-3">
                   <div className="w-14 h-14 rounded-2xl border-2 border-white/50 shadow-lg overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                        alt="Owner"
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="text-white">
                      <div className="flex items-center gap-2">
                        {vendorData.isFeatured && <span className="bg-[#D28A8C] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">Featured</span>}
                        <h4 className="text-lg font-black italic" style={{ fontFamily: "'Playfair Display', serif" }}>{vendorData.name}</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] opacity-80 font-bold">
                        <MapPin className="w-3 h-3" /> {vendorData.location}
                      </div>
                   </div>
                 </div>
              </div>

              {/* Info Area */}
              <div className="p-8 space-y-6">
                 <div className="flex items-center justify-between border-b border-slate-50 pb-5">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Starting Price</p>
                       <p className="text-xl font-black text-[#D28A8C]">{vendorData.price} <span className="text-xs font-bold text-[#8E7E77] opacity-60 ml-0.5">{vendorData.priceUnit}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-xs font-black">
                        <Star className="w-3 h-3 fill-emerald-600" />
                        {vendorData.rating}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{vendorData.reviews} reviews</span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#4A3730]">About {vendorData.category}</h5>
                    <p className="text-[13px] text-[#8E7E77] font-medium leading-relaxed italic line-clamp-3">
                      "{vendorData.about}"
                    </p>
                 </div>

                 <div className="flex flex-wrap gap-2 pt-2">
                    {vendorData.services.map(s => (
                      <span key={s} className="bg-slate-50 text-slate-500 text-[9px] font-bold px-2.5 py-1.5 rounded-full border border-slate-100 uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
           
           {/* Hint */}
           <div className="flex items-start gap-3 bg-[#D28A8C]/5 p-4 rounded-3xl border border-[#D28A8C]/10">
              <Camera className="w-5 h-5 text-[#D28A8C] shrink-0" />
              <p className="text-[11px] font-medium text-[#8E7E77] leading-relaxed">
                <span className="text-[#D28A8C] font-black">Tip:</span> High-resolution profile pictures increase trust and enquiry rates by <span className="text-[#D28A8C] font-black">60%</span>.
              </p>
           </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ProfileEditor;
