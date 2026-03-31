import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  Sparkles,
  Check
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const ProfileEditor = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "Profile");
  const [activeWorkTab, setActiveWorkTab] = useState("Portfolio");
  const [showToast, setShowToast] = useState(false);
  const [viewingGallery, setViewingGallery] = useState(false);
  const bannerInputRef = useRef(null);
  const portfolioInputRef = useRef(null);
  const albumInputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [albumName, setAlbumName] = useState("");
  
  // Update tab if location state changes
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
    if (location.state?.workTab) {
      setActiveWorkTab(location.state.workTab);
    }
  }, [location.state]);

  const [vendorData, setVendorData] = useState(() => {
    const defaultData = {
      id: Date.now(),
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
      basePackage: { price: "", unit: "per day", features: "" },
      premiumPackage: { price: "", unit: "per day", features: "" },
      portfolio: [],
      albums: [],
      videos: [],
      isFeatured: true
    };

    // 1. Try to load specific project from state ID
    const targetId = location.state?.id;
    if (targetId) {
      const allProjects = JSON.parse(localStorage.getItem('vendorProjects') || '[]');
      const found = allProjects.find(p => p.id === targetId);
      if (found) return { ...defaultData, ...found };
    }

    // 2. Fallback to active preview data
    const saved = localStorage.getItem('vendorPreviewData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultData, ...parsed };
      } catch (e) {}
    }
    return defaultData;
  });

  // Save to localStorage whenever data changes so Live Preview can read it
  useEffect(() => {
    try {
      localStorage.setItem('vendorPreviewData', JSON.stringify(vendorData));
    } catch (e) {
       console.warn("Storage quota exceeded in backup sync.");
    }
    // Notify other components (Sidebar, Navbar, LivePreview, WorkManager)
    window.dispatchEvent(new CustomEvent('vendorProfileUpdate', { detail: vendorData }));
  }, [vendorData]);

  // Listen for updates from WorkManager
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail && JSON.stringify(e.detail) !== JSON.stringify(vendorData)) {
        setVendorData(prev => ({ ...prev, ...e.detail }));
      }
    };
    window.addEventListener('vendorProfileUpdate', handleUpdate);
    return () => window.removeEventListener('vendorProfileUpdate', handleUpdate);
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

  const handleFileUpload = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'banner') {
          setVendorData(prev => ({ ...prev, banner: reader.result }));
        } else if (target === 'portfolio') {
          setVendorData(prev => ({ 
            ...prev, 
            portfolio: [reader.result, ...prev.portfolio].slice(0, 20) 
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      // 1. Update Active Preview
      localStorage.setItem('vendorPreviewData', JSON.stringify(vendorData));
      
      // 2. Update/Add to Multi-Project List
      const allProjects = JSON.parse(localStorage.getItem('vendorProjects') || '[]');
      const projectIndex = allProjects.findIndex(p => p.id === vendorData.id);
      
      let updatedProjects;
      if (projectIndex > -1) {
        updatedProjects = allProjects.map(p => p.id === vendorData.id ? vendorData : p);
      } else {
        updatedProjects = [...allProjects, vendorData];
      }
      
      localStorage.setItem('vendorProjects', JSON.stringify(updatedProjects));

      // 3. Notify Hub
      window.dispatchEvent(new CustomEvent('vendorProfileUpdate', { detail: vendorData }));
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (e) {
      alert("Browser storage limit reached! Please try using smaller images or deleting older portfolios.");
    }
  };



  const handleAddVideo = () => {
    if (videoUrl.trim()) {
      setVendorData(prev => ({
        ...prev,
        videos: [...(prev.videos || []), videoUrl.trim()]
      }));
      setVideoUrl("");
    }
  };

  const handleRemoveVideo = (index) => {
    setVendorData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const handleAddAlbum = () => {
    albumInputRef.current?.click();
  };

  const handleAlbumUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // We only support ONE album now, so we always check the first one
    const existingAlbum = vendorData.albums && vendorData.albums.length > 0 ? vendorData.albums[0] : null;
    const currentImages = existingAlbum ? (existingAlbum.images || []) : [];

    if (currentImages.length + files.length > 10) {
      alert(`You can only have a total of 10 images in your collection. You currently have ${currentImages.length}.`);
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      alert("Each image must be less than 5MB.");
      return;
    }

    const loaders = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(loaders).then(newImages => {
      setVendorData(prev => {
        const updatedAlbums = prev.albums ? [...prev.albums] : [];
        if (updatedAlbums.length > 0) {
          // Update the single existing album
          const mergedImages = [...updatedAlbums[0].images, ...newImages];
          updatedAlbums[0] = {
            ...updatedAlbums[0],
            images: mergedImages,
            count: mergedImages.length,
            cover: mergedImages[0]
          };
        } else {
          // Create the one and only album
          updatedAlbums.push({ 
            name: "Weddings Gallery", 
            images: newImages, 
            count: newImages.length,
            cover: newImages[0]
          });
        }
        return { ...prev, albums: updatedAlbums };
      });
    });
    
    // Reset input
    e.target.value = "";
  };


  const handleRemoveAlbum = (index) => {
    setVendorData(prev => ({
      ...prev,
      albums: prev.albums.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveGalleryImage = (imgIdx) => {
    setVendorData(prev => {
      const updatedAlbums = [...(prev.albums || [])];
      if (updatedAlbums.length > 0) {
        const updatedImages = updatedAlbums[0].images.filter((_, i) => i !== imgIdx);
        updatedAlbums[0] = {
          ...updatedAlbums[0],
          images: updatedImages,
          count: updatedImages.length,
          cover: updatedImages[0] || null
        };
      }
      return { ...prev, albums: updatedAlbums };
    });
  };




  const tabs = ["Profile", "Price", "Project"];

  return (
    <VendorLayout title="Vendor Profile">
      <div className="max-w-4xl mx-auto space-y-5 animate-wedding-fade-up">
           
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
             <div className="bg-white rounded-[2rem] border border-[#F3E9E2] p-5 md:p-7 shadow-sm space-y-6 animate-wedding-fade-in">
                <div className="space-y-0.5">
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
                      <input 
                        type="file" 
                        ref={bannerInputRef}
                        onChange={(e) => handleFileUpload(e, 'banner')}
                        className="hidden" 
                        accept="image/*"
                      />
                      <div className="relative h-40 rounded-[1.5rem] overflow-hidden border-2 border-dashed border-[#F3E9E2] bg-slate-50 group transition-all hover:border-primary/40">
                         <img src={vendorData.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <button 
                              onClick={() => bannerInputRef.current?.click()}
                              className="px-7 py-3.5 rounded-2xl bg-white text-primary font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all"
                            >
                               <Camera className="w-5 h-5" /> Add Banner Photo
                            </button>
                         </div>
                      </div>
                   </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-widest ml-1">Business Name</label>
                          <div className="relative flex items-center group">
                             <Layout className="absolute left-4 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
                             <input 
                               name="name"
                               placeholder="e.g. Dream Catchers Film"
                               value={vendorData.name}
                               onChange={handleChange}
                               className="w-full h-14 bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-2xl pl-12 pr-5 text-sm font-bold text-[#4A3730] outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300"
                             />
                          </div>
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-widest ml-1">Location</label>
                          <div className="relative flex items-center group">
                             <MapPin className="absolute left-4 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
                             <input 
                               name="location"
                               placeholder="e.g. Bandra, Mumbai"
                               value={vendorData.location}
                               onChange={handleChange}
                               className="w-full h-14 bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-2xl pl-12 pr-5 text-sm font-bold text-[#4A3730] outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-[#8E7E77] uppercase tracking-widest ml-1">About US</label>
                       <div className="relative flex group">
                          <FileText className="absolute left-4 top-4.5 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
                          <textarea 
                            name="about"
                            placeholder="Describe your working style and experience..."
                            value={vendorData.about}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-[#F3E9E2]/20 border border-[#F3E9E2] rounded-[1.5rem] pl-12 pr-5 py-4 text-sm font-medium text-[#4A3730] outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 resize-none leading-relaxed"
                          />
                       </div>
                    </div>

                   <button 
                     onClick={() => setActiveTab("Price")}
                     className="w-full py-5 rounded-[2rem] bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     Next Step: Add Price <ChevronRight className="w-4 h-4" />
                   </button>

                </div>
             </div>
           )}

           {/* SECTION 2: PRICE */}
           {activeTab === "Price" && (
             <div className="bg-white rounded-[2rem] border border-[#F3E9E2] p-5 md:p-7 shadow-sm space-y-6 animate-wedding-fade-in">
                <div className="space-y-0.5">
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
                     className="flex-[2] py-5 rounded-[2rem] bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                   >
                     Next Step: Add Project <ChevronRight className="w-4 h-4" />
                   </button>

                </div>
             </div>
           )}

           {/* SECTION 3: PROJECT */}
           {activeTab === "Project" && (
             <div className="bg-white rounded-[2rem] border border-[#F3E9E2] p-5 md:p-7 shadow-sm space-y-6 animate-wedding-fade-in">
                <div className="space-y-0.5">
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
                            <input 
                               type="file" 
                               ref={portfolioInputRef}
                               onChange={(e) => handleFileUpload(e, 'portfolio')}
                               className="hidden" 
                               accept="image/*"
                             />
                              <button 
                                onClick={() => portfolioInputRef.current?.click()}
                                className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/10 flex flex-col items-center justify-center gap-3 hover:bg-[#F3E9E2]/20 transition-all group overflow-hidden"
                              >
                                 <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Plus className="w-6 h-6" />
                                 </div>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-[#8E7E77]">Upload Work</span>
                              </button>

                              {vendorData.portfolio.length > 0 && (
                                <button 
                                  onClick={() => {
                                    if(window.confirm("Are you sure you want to clear all images?")) {
                                       setVendorData(prev => ({ ...prev, portfolio: [] }));
                                    }
                                  }}
                                  className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-rose-200 bg-rose-50/30 flex flex-col items-center justify-center gap-3 hover:bg-rose-50 transition-all group overflow-hidden"
                                >
                                   <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                      <Trash2 className="w-6 h-6" />
                                   </div>
                                   <span className="text-[9px] font-black uppercase tracking-widest text-rose-500/60">Clear All</span>
                                </button>
                              )}

                             {vendorData.portfolio.map((img, idx) => (
                               <div key={idx} className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#F3E9E2] relative group">
                                  <img src={img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                      <button 
                                        onClick={() => setVendorData(prev => ({ ...prev, portfolio: prev.portfolio.filter((_, i) => i !== idx) }))}
                                        className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all transform hover:rotate-12"
                                      >
                                          <Trash2 className="w-5 h-5" />
                                      </button>
                                  </div>
                               </div>
                             ))}
                             
                             {vendorData.portfolio.length === 0 && (
                               <p className="md:col-span-3 text-[11px] text-[#8E7E77] font-medium italic mt-4">Add up to 20 images to your general portfolio. JPEG or PNG under 5MB recommended.</p>
                             )}
                         </div>
                      )}

                      {activeWorkTab === "Albums" && (
                         <div className="space-y-6">
                            {viewingGallery && vendorData.albums && vendorData.albums[0] ? (
                               <div className="animate-wedding-fade-in space-y-6">
                                  <div className="flex items-center justify-between px-2">
                                     <button 
                                       onClick={() => setViewingGallery(false)}
                                       className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:translate-x-[-4px] transition-all"
                                     >
                                        <RotateCcw className="w-3.5 h-3.5" /> Back to Albums
                                     </button>
                                     <span className="text-[10px] font-bold text-[#8E7E77] uppercase tracking-widest bg-[#F3E9E2]/30 px-4 py-1.5 rounded-full">
                                        Managing {vendorData.albums[0].count} Gallery Photos
                                     </span>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                     {vendorData.albums[0].images.map((img, idx) => (
                                       <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden border border-[#F3E9E2] relative group shadow-sm">
                                          <img src={img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                              <button 
                                                onClick={() => handleRemoveGalleryImage(idx)}
                                                className="w-10 h-10 rounded-xl bg-white text-rose-500 flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all transform hover:rotate-12"
                                              >
                                                  <Trash2 className="w-5 h-5" />
                                              </button>
                                          </div>
                                       </div>
                                     ))}
                                     
                                     {vendorData.albums[0].count < 10 && (
                                       <button 
                                         onClick={handleAddAlbum}
                                         className="aspect-square rounded-[2rem] border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/10 flex flex-col items-center justify-center gap-2 hover:bg-[#F3E9E2]/20 transition-all group"
                                       >
                                          <Plus className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                                          <span className="text-[8px] font-black uppercase text-[#8E7E77]">Add More</span>
                                       </button>
                                     )}
                                  </div>
                               </div>
                            ) : (
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-wedding-fade-in">
                                  <input 
                                     type="file" 
                                     ref={albumInputRef}
                                     onChange={handleAlbumUpload}
                                     className="hidden" 
                                     accept="image/*"
                                     multiple
                                   />
                                  
                                  {/* Only show upload button if limit not reached */}
                                  {(!vendorData.albums || !vendorData.albums[0] || vendorData.albums[0].count < 10) && (
                                    <button 
                                      onClick={handleAddAlbum}
                                      className="py-10 border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-[#F3E9E2]/10 transition-all group text-[#8E7E77]"
                                    >
                                       <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                          <PlusCircle className="w-7 h-7" />
                                        </div>
                                       <div className="text-center">
                                          <span className="text-[11px] font-black uppercase tracking-widest block">
                                            {vendorData.albums && vendorData.albums.length > 0 ? "Add More Photos" : "Create Gallery"}
                                          </span>
                                          <span className="text-[9px] font-bold opacity-60 uppercase tracking-tighter mt-1 block">
                                            {vendorData.albums && vendorData.albums[0] ? `${10 - vendorData.albums[0].count} Slots Left` : "Max 10 images • < 5MB"}
                                          </span>
                                       </div>
                                    </button>
                                  )}

                                  {vendorData.albums && vendorData.albums.length > 0 && (
                                    <button 
                                      onClick={() => {
                                        if(window.confirm("Delete all albums and free up storage?")) {
                                           setVendorData(prev => ({ ...prev, albums: [] }));
                                        }
                                      }}
                                      className="py-10 border-2 border-dashed border-rose-200 bg-rose-50/20 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:bg-rose-50/50 transition-all group text-rose-500/60"
                                    >
                                       <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                          <Trash2 className="w-7 h-7" />
                                        </div>
                                       <div className="text-center">
                                          <span className="text-[11px] font-black uppercase tracking-widest block">Clear All Albums</span>
                                          <span className="text-[9px] font-bold opacity-60 uppercase tracking-tighter mt-1 block">Delete all galleries</span>
                                       </div>
                                    </button>
                                  )}
                                  
                                  {vendorData.albums && vendorData.albums.length > 0 && vendorData.albums.map((album, idx) => (
                                    <div 
                                      key={idx} 
                                      className="p-5 bg-white border border-[#F3E9E2] rounded-[2.5rem] flex items-center justify-between group overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-[#4A3730]/5 hover:-translate-y-1 transition-all duration-500 relative"
                                    >
                                       <div 
                                         className="flex flex-1 items-center gap-4"
                                         onClick={() => setViewingGallery(true)}
                                       >
                                          <div className="w-16 h-16 rounded-2xl bg-[#F3E9E2]/20 overflow-hidden shrink-0 border border-[#F3E9E2]">
                                             {album.cover ? (
                                               <img src={album.cover} alt="" className="w-full h-full object-cover" />
                                             ) : (
                                               <div className="w-full h-full flex items-center justify-center text-primary">
                                                  <ImageIcon className="w-6 h-6" />
                                               </div>
                                             )}
                                          </div>
                                          <div>
                                             <h4 className="text-sm font-black text-[#4A3730]">{album.name}</h4>
                                             <div className="flex items-center gap-2">
                                                <p className="text-[10px] text-[#8E7E77] font-bold uppercase tracking-wider">{album.count || 0} Photos</p>
                                                <span className="text-[8px] font-black text-primary uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded-full">Manage Images</span>
                                             </div>
                                          </div>
                                       </div>
                                       <button 
                                         onClick={(e) => {
                                           e.stopPropagation();
                                           handleRemoveAlbum(idx);
                                         }}
                                         className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white relative z-10"
                                       >
                                          <Trash2 className="w-5 h-5" />
                                       </button>
                                    </div>
                                  ))}

                                  {(!vendorData.albums || vendorData.albums.length === 0) && (
                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center">
                                       <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest leading-loose">Organize your shoots into<br/>a distinct wedding gallery.</p>
                                    </div>
                                  )}
                               </div>
                            )}
                         </div>
                      )}





                      {activeWorkTab === "Videos" && (
                         <div className="space-y-6">
                            <div className="p-8 border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 group">
                               <Video className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-500" />
                               <div className="text-center space-y-3">
                                  <h4 className="text-sm font-black text-[#4A3730]">Add Cinema Link</h4>
                                  <p className="text-[10px] text-[#8E7E77] font-medium leading-relaxed max-w-[200px] mx-auto opacity-70">Support YouTube and Vimeo links for cinematic highlights.</p>
                               </div>
                               <div className="flex w-full max-w-sm mt-2 relative">
                                  <input 
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full bg-white border border-[#F3E9E2] rounded-2xl px-6 py-4 text-xs font-bold text-[#4A3730] outline-none shadow-sm pr-16"
                                  />
                                  <button 
                                    onClick={handleAddVideo}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white text-[9px] font-black uppercase px-4 py-2.5 rounded-xl hover:scale-105 transition-all"
                                  >
                                    Add
                                  </button>
                                </div>
                            </div>

                            {vendorData.videos.map((vid, idx) => (
                              <div key={idx} className="flex items-center justify-between p-5 bg-white border border-[#F3E9E2] rounded-[2rem] group">
                                 <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                                       <Play className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-bold text-[#4A3730] truncate">{vid}</span>
                                 </div>
                                 <button 
                                   onClick={() => handleRemoveVideo(idx)}
                                   className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white shrink-0"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                            ))}
                         </div>
                      )}

                   </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs py-5 rounded-[2rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
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

           {/* Success Toast */}
           {showToast && (
             <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-wedding-slide-down">
                <div className="bg-[#4A3730] text-white px-8 py-4 rounded-[1.5rem] shadow-2xl border border-white/10 flex items-center gap-4 min-w-[320px]">
                   <div className="w-10 h-10 rounded-xl bg-emerald-400 flex items-center justify-center text-[#4A3730]">
                      <Check className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase tracking-widest">Profile Updated!</p>
                      <p className="text-[10px] text-white/60 font-medium tracking-wide">All changes are now live across your showcase.</p>
                   </div>
                </div>
             </div>
           )}
      </div>
    </VendorLayout>
  );
};

export default ProfileEditor;
