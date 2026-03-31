import React, { useState, useEffect } from "react";
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
  RotateCcw,
  Image as ImageIcon,
  Plus,
  Trash2,
  Play,
  FileText,
  DollarSign,
  Layers,
  Layout,
  ExternalLink,
  PlusCircle,
  Video,
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const ProfileEditor = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [activeWorkTab, setActiveWorkTab] = useState("Portfolio");
  
  const [vendorData, setVendorData] = useState(() => {
    const saved = localStorage.getItem('vendorPreviewData');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
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
    };
  });

  // Save to localStorage whenever data changes so Live Preview can read it
  useEffect(() => {
    localStorage.setItem('vendorPreviewData', JSON.stringify(vendorData));
  }, [vendorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (pkg, field, value) => {
    setVendorData(prev => ({
      ...prev,
      [pkg]: { ...prev[pkg], [field]: value }
    }));
  };

  const tabs = ["Profile", "Price", "Project"];

  return (
    <VendorLayout title="Vendor Profile">
      <div className="max-w-3xl mx-auto space-y-8 animate-wedding-fade-up">
           
           {/* Tab Bar (Categories Style) */}
           <div className="flex items-center gap-3 bg-white p-2.5 rounded-[2rem] border border-[#F3E9E2] w-fit shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3.5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-[#8E7E77] hover:bg-[#F3E9E2]/30"
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>

           {/* SECTION 1: PROFILE */}
           {activeTab === "Profile" && (
             <div className="bg-white rounded-[3rem] border border-[#F3E9E2] p-8 md:p-12 shadow-sm space-y-10 animate-wedding-fade-in">
                <div className="space-y-2">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                         <Info className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-[#4A3730]">Add Profile Identity</h3>
                   </div>
                   <p className="text-xs text-[#8E7E77] font-medium leading-relaxed max-w-md ml-1">Establish your brand presence by adding your business name and high-quality visuals.</p>
                </div>

                <div className="space-y-8">
                   {/* Banner Upload UI */}
                   <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#8E7E77] uppercase tracking-[0.2em] ml-2">Profile Banner</label>
                      <div className="relative h-56 rounded-[2.5rem] overflow-hidden border-2 border-dashed border-[#F3E9E2] bg-slate-50 group transition-all hover:border-primary/40">
                         <img src={vendorData.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button className="px-7 py-3.5 rounded-2xl bg-white text-primary font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all">
                               <Camera className="w-5 h-5" /> Add Banner Photo
                            </button>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-[#8E7E77] uppercase tracking-[0.2em] ml-2">Business Name</label>
                         <div className="relative">
                            <Layout className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input 
                              name="name"
                              placeholder="e.g. Dream Catchers Film"
                              value={vendorData.name}
                              onChange={handleChange}
                              className="w-full bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-2xl pl-14 pr-6 py-4.5 text-sm font-bold text-[#4A3730] outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-[#8E7E77] uppercase tracking-[0.2em] ml-2">Location</label>
                         <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            <input 
                              name="location"
                              placeholder="e.g. Bandra, Mumbai"
                              value={vendorData.location}
                              onChange={handleChange}
                              className="w-full bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-2xl pl-14 pr-6 py-4.5 text-sm font-bold text-[#4A3730] outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-300 shadow-inner"
                            />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#8E7E77] uppercase tracking-[0.2em] ml-2">About US</label>
                      <div className="relative">
                         <FileText className="absolute left-5 top-5 w-4 h-4 text-slate-300" />
                         <textarea 
                           name="about"
                           placeholder="Describe your working style and experience..."
                           value={vendorData.about}
                           onChange={handleChange}
                           rows={5}
                           className="w-full bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-[2rem] pl-14 pr-6 py-5 text-sm font-medium text-[#4A3730] outline-none focus:border-primary focus:bg-white transition-all placeholder:text-slate-300 shadow-inner resize-none leading-relaxed"
                         />
                      </div>
                   </div>

                   <button 
                     onClick={() => setActiveTab("Price")}
                     className="w-full py-5 rounded-[2rem] bg-[#4A3730] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     Next Step: Add Price <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
           )}

           {/* SECTION 2: PRICE */}
           {activeTab === "Price" && (
             <div className="bg-white rounded-[3rem] border border-[#F3E9E2] p-8 md:p-12 shadow-sm space-y-10 animate-wedding-fade-in">
                <div className="space-y-2">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                         <DollarSign className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-[#4A3730]">Service Packages</h3>
                   </div>
                   <p className="text-xs text-[#8E7E77] font-medium leading-relaxed max-w-sm ml-1">Define your pricing tiers to help clients understand your value. Profiles with 2+ tiers see higher engagement.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {/* Base Package */}
                   <div className="relative p-7 rounded-[2.5rem] border border-[#F3E9E2] bg-[#F3E9E2]/10 space-y-6 group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-10 -mt-10" />
                      <div className="flex items-center gap-2 pb-2">
                         <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                            <Layers className="w-4 h-4" />
                         </div>
                         <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Base Package</span>
                      </div>
                      <div className="space-y-5 relative">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-wider ml-1">Estimated Price</label>
                            <input 
                              placeholder="₹ 50,000"
                              value={vendorData.basePackage.price}
                              onChange={(e) => handlePackageChange('basePackage', 'price', e.target.value)}
                              className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-5 py-3.5 text-sm font-black text-[#4A3730] outline-none focus:border-primary shadow-sm"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-wider ml-1">What's Included?</label>
                            <textarea 
                              placeholder="e.g. 1 Photographer, 1 Cinematic Highlight Video"
                              value={vendorData.basePackage.features}
                              onChange={(e) => handlePackageChange('basePackage', 'features', e.target.value)}
                              className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-5 py-3.5 text-[11px] font-medium text-[#4A3730] outline-none focus:border-primary shadow-sm resize-none h-28"
                            />
                         </div>
                      </div>
                   </div>

                   {/* Premium Package */}
                   <div className="relative p-7 rounded-[2.5rem] border border-primary/20 bg-primary/5 space-y-6 group overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -mr-10 -mt-10" />
                      <div className="flex items-center justify-between pb-2">
                         <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                               <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Premium Tier</span>
                         </div>
                         <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-black uppercase tracking-tighter">Most Popular</div>
                      </div>
                      <div className="space-y-5 relative">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-wider ml-1">Estimated Price</label>
                            <input 
                              placeholder="₹ 1,20,000"
                              value={vendorData.premiumPackage.price}
                              onChange={(e) => handlePackageChange('premiumPackage', 'price', e.target.value)}
                              className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-5 py-3.5 text-sm font-black text-[#4A3730] outline-none focus:border-primary shadow-sm"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-wider ml-1">Premium Perks</label>
                            <textarea 
                              placeholder="e.g. Full Team, Drone, 2 Days Coverage, Pre-wedding Film"
                              value={vendorData.premiumPackage.features}
                              onChange={(e) => handlePackageChange('premiumPackage', 'features', e.target.value)}
                              className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-5 py-3.5 text-[11px] font-medium text-[#4A3730] outline-none focus:border-primary shadow-sm resize-none h-28"
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     onClick={() => setActiveTab("Profile")}
                     className="flex-1 py-5 rounded-[2rem] bg-white border border-[#F3E9E2] text-[#8E7E77] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                   >
                     Back
                   </button>
                   <button 
                     onClick={() => setActiveTab("Project")}
                     className="flex-[2] py-5 rounded-[2rem] bg-[#4A3730] text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     Next Step: Add Project <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
             </div>
           )}

           {/* SECTION 3: PROJECT */}
           {activeTab === "Project" && (
             <div className="bg-white rounded-[3rem] border border-[#F3E9E2] p-8 md:p-12 shadow-sm space-y-10 animate-wedding-fade-in">
                <div className="space-y-2">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                         <Layout className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-[#4A3730]">Showcase Your Projects</h3>
                   </div>
                   <p className="text-xs text-[#8E7E77] font-medium leading-relaxed max-w-sm ml-1">Upload your best work. High-fidelity portfolios act as your silent salesperson.</p>
                </div>

                <div className="space-y-8">
                   {/* Project Tabs */}
                   <div className="flex items-center gap-2 bg-[#F3E9E2]/30 p-1.5 rounded-2xl w-fit">
                      {["Portfolio", "Albums", "Videos"].map(tab => (
                         <button 
                           key={tab}
                           onClick={() => setActiveWorkTab(tab)}
                           className={`px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                              activeWorkTab === tab 
                              ? "bg-primary text-white shadow-lg shadow-primary/20" 
                              : "text-[#8E7E77] hover:bg-white"
                           }`}
                         >
                           {tab}
                         </button>
                      ))}
                   </div>

                   {/* Media Grids (Simplified for Adding) */}
                   <div className="min-h-[260px]">
                      {activeWorkTab === "Portfolio" && (
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/10 flex flex-col items-center justify-center gap-3 hover:bg-[#F3E9E2]/20 transition-all group overflow-hidden">
                               <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                  <Plus className="w-6 h-6" />
                               </div>
                               <span className="text-[9px] font-black uppercase tracking-widest text-[#8E7E77]">Upload Work</span>
                            </button>
                            <p className="md:col-span-3 text-[11px] text-[#8E7E77] font-medium italic mt-4">Add up to 20 images to your general portfolio. JPEG or PNG under 5MB recommended.</p>
                         </div>
                      )}

                      {activeWorkTab === "Albums" && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <button className="py-10 border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-[#F3E9E2]/10 transition-all group text-[#8E7E77]">
                               <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                  <PlusCircle className="w-7 h-7" />
                               </div>
                               <span className="text-[11px] font-black uppercase tracking-widest">Create New Album</span>
                            </button>
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center">
                               <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-loose">Organize your shoots into<br/>distinct wedding albums.</p>
                            </div>
                         </div>
                      )}

                      {activeWorkTab === "Videos" && (
                         <div className="space-y-5">
                            <div className="p-8 border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group">
                               <Video className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                               <div className="text-center space-y-3">
                                  <h4 className="text-sm font-black text-[#4A3730]">Add Cinema Link</h4>
                                  <p className="text-[10px] text-[#8E7E77] font-medium leading-relaxed max-w-[200px] mx-auto opacity-70">Support YouTube and Vimeo links for cinematic highlights.</p>
                               </div>
                               <div className="flex w-full max-w-sm mt-2 relative">
                                  <input 
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-6 py-4 text-xs font-bold text-[#4A3730] outline-none shadow-sm pr-16"
                                  />
                                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white text-[9px] font-black uppercase px-4 py-2.5 rounded-xl hover:scale-105 transition-all">Add</button>
                                </div>
                            </div>
                         </div>
                      )}
                   </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex-1 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    <Save className="w-5 h-5" /> Save & Finalize
                  </button>
                  <button 
                    onClick={() => setActiveTab("Price")}
                    className="px-10 bg-white border border-[#F3E9E2] text-[#8E7E77] font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[2rem] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    Back
                  </button>
                </div>
             </div>
           )}
      </div>
    </VendorLayout>
  );
};

export default ProfileEditor;
