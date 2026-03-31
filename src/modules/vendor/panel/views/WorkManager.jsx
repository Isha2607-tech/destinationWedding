import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  Plus, 
  MoreVertical, 
  Play, 
  Trash2, 
  Edit2, 
  Settings2,
  ExternalLink,
  PlusCircle,
  Video
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const WorkManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [viewMode, setViewMode] = useState("hub"); // 'hub' or 'gallery'
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('vendorProjects');
    if (savedProjects) return JSON.parse(savedProjects);
    
    // Migration: Convert existing data to first project
    const current = localStorage.getItem('vendorPreviewData');
    if (current) {
      try {
        const data = JSON.parse(current);
        const initialProjects = [{ ...data, id: Date.now() }];
        localStorage.setItem('vendorProjects', JSON.stringify(initialProjects));
        return initialProjects;
      } catch (e) {
        console.error("Storage Quota Exceeded during migration:", e);
        return [];
      }
    }
    return [];
  });

  const [activeProject, setActiveProject] = useState(() => {
    const saved = localStorage.getItem('vendorPreviewData');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync with global active project
  React.useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setActiveProject(e.detail);
        // Also update in projects list
        setProjects(prev => {
           const updated = prev.map(p => p.id === e.detail.id ? e.detail : p);
           try {
             localStorage.setItem('vendorProjects', JSON.stringify(updated));
           } catch (err) {
             console.warn("Could not save all projects to local storage - quota exceeded.");
           }
           return updated;
        });

      }
    };
    window.addEventListener('vendorProfileUpdate', handleUpdate);
    return () => window.removeEventListener('vendorProfileUpdate', handleUpdate);
  }, []);

  const selectProject = (proj) => {
    setActiveProject(proj);
    localStorage.setItem('vendorPreviewData', JSON.stringify(proj));
    window.dispatchEvent(new CustomEvent('vendorProfileUpdate', { detail: proj }));
    setViewMode("gallery");
  };

  const createNewProject = () => {
    const newProject = {
      id: Date.now(),
      name: "New Portfolio",
      location: "",
      portfolio: [],
      albums: [],
      videos: [],
      price: { base: "", type: "per_day" }
    };
    setActiveProject(newProject);
    localStorage.setItem('vendorPreviewData', JSON.stringify(newProject));
    window.dispatchEvent(new CustomEvent('vendorProfileUpdate', { detail: newProject }));
    navigate('/vendor/profile');
  };

  const deleteProject = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this entire portfolio?")) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('vendorProjects', JSON.stringify(updated));
      
      // If we deleted the active project, clear it
      if (activeProject && activeProject.id === id) {
        localStorage.removeItem('vendorPreviewData');
        setActiveProject(null);
      }
    }
  };

   // Save changes locally and broadcast
  const updateStore = (newData) => {
    setActiveProject(newData);
    try {
      localStorage.setItem('vendorPreviewData', JSON.stringify(newData));
      
      // Update main projects list
      const updatedProjects = projects.map(p => p.id === newData.id ? newData : p);
      setProjects(updatedProjects);
      localStorage.setItem('vendorProjects', JSON.stringify(updatedProjects));
    } catch (e) {
      alert("Browser storage limit reached! Please try reducing image sizes or number of portfolios.");
    }
    
    window.dispatchEvent(new CustomEvent('vendorProfileUpdate', { detail: newData }));
  };


  const handlePortfolioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { 
          ...activeProject, 
          portfolio: [reader.result, ...(activeProject.portfolio || [])].slice(0, 20) 
        };
        updateStore(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlbumUpload = (e) => {
    const files = Array.from(e.target.files);
    const existingAlbum = activeProject.albums && activeProject.albums.length > 0 ? activeProject.albums[0] : null;
    const currentImages = existingAlbum ? (existingAlbum.images || []) : [];

    if (currentImages.length + files.length > 10) {
      alert(`Limit is 10 images. You have ${currentImages.length}.`);
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
      const updatedAlbums = activeProject.albums ? [...activeProject.albums] : [];
      if (updatedAlbums.length > 0) {
        const merged = [...updatedAlbums[0].images, ...newImages];
        updatedAlbums[0] = { ...updatedAlbums[0], images: merged, count: merged.length, cover: merged[0] };
      } else {
        updatedAlbums.push({ name: "Weddings Gallery", images: newImages, count: newImages.length, cover: newImages[0] });
      }
      updateStore({ ...activeProject, albums: updatedAlbums });
    });
  };

  const handleDelete = (type, index) => {
    const newData = { ...activeProject };
    if (type === 'portfolio') {
      newData.portfolio = newData.portfolio.filter((_, i) => i !== index);
    } else if (type === 'albums') {
      newData.albums = newData.albums.filter((_, i) => i !== index);
    } else if (type === 'videos') {
      newData.videos = newData.videos.filter((_, i) => i !== index);
    }
    updateStore(newData);
  };


  return (
    <VendorLayout title="My Work">
       <div className="space-y-8 animate-wedding-fade-up">
        
        {/* VIEW MODE: PROJECT HUB */}
        {viewMode === "hub" ? (
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black text-[#4A3730]">My Portfolios</h2>
                  <p className="text-[#8E7E77] text-sm font-medium tracking-wide">Manage your work units across different locations and brands.</p>
                </div>
                <button 
                  onClick={createNewProject}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-[#B06A6C] text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-[#B06A6C]/20 hover:scale-105 active:scale-95 transition-all"
                >
                  <PlusCircle className="w-4 h-4" /> Add New Portfolio
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="group bg-white rounded-[2.5rem] border border-[#F3E9E2] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="aspect-[16/10] bg-slate-100 relative group-hover:aspect-[16/9] transition-all duration-700">
                    {proj.portfolio && proj.portfolio[0] ? (
                      <img src={proj.portfolio[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                        <Camera className="w-8 h-8 opacity-20" />
                        <span className="text-[10px] uppercase font-black tracking-widest opacity-40">No Images Yet</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <button 
                        onClick={() => navigate('/vendor/profile', { state: { id: proj.id } })}
                        className="flex-1 py-3.5 bg-white text-[#4A3730] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F3E9E2] transition-all"
                      >
                        Edit Profile
                      </button>
                      <button 
                        onClick={(e) => deleteProject(e, proj.id)}
                        className="flex-1 py-3.5 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-7">

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-black text-[#4A3730] leading-tight mb-1">{proj.name || 'Untitled Portfolio'}</h3>
                        <p className="text-[#8E7E77] text-xs font-bold uppercase tracking-widest">{proj.location || 'Location Not Set'}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#F3E9E2]/40 flex items-center justify-center text-[#B06A6C]">
                        <Settings2 className="w-5 h-5" />
                      </div>
                    </div>
                    <button 
                      onClick={() => selectProject(proj)}
                      className="w-full py-4 rounded-xl bg-[#F7F1ED] text-[#B06A6C] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#B06A6C] hover:text-white transition-all shadow-inner"
                    >
                      Manage Portfolio & Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* VIEW MODE: GALLERY (Original Tabs) */
          <>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setViewMode("hub")}
                className="flex items-center gap-2 text-[#8E7E77] hover:text-[#B06A6C] transition-colors"
              >
                <PlusCircle className="w-4 h-4 rotate-45" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Portfolios</span>
              </button>
              
              {/* Tab Selection */}
              <div className="flex items-center gap-2 bg-[#F3E9E2]/50 p-1.5 rounded-[1.5rem] w-fit">
                 {["Portfolio", "Albums", "Videos"].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === tab 
                          ? "bg-[#B06A6C] text-white shadow-lg shadow-[#B06A6C]/20" 
                          : "text-[#8E7E77] hover:bg-white"
                      }`}
                    >
                      {tab}
                    </button>
                 ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] p-6 md:p-8 shadow-sm">
               
               {/* Section Header */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#4A3730] " >
                      {activeProject.name} — {activeTab}
                    </h2>
                    <p className="text-[#8E7E77] text-xs font-medium">Add, remove, or organize your best work pieces for this unit.</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={() => navigate('/vendor/profile', { state: { tab: 'Project' } })}
                       className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#B06A6C] text-white font-bold text-sm shadow-xl shadow-[#B06A6C]/20 hover:scale-105 transition-all"
                     >
                       <Edit2 className="w-4 h-4" /> Edit Profile
                     </button>
                  </div>
               </div>

               {/* --- Portfolio Grid --- */}
               {activeTab === "Portfolio" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {(activeProject.portfolio || []).map((img, i) => (
                       <div key={i} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-[#F3E9E2] shadow-sm">
                          <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3">
                             <div className="flex gap-2">
                               <button 
                                 onClick={() => handleDelete('portfolio', i)}
                                 className="w-10 h-10 rounded-xl bg-white text-[#B06A6C] flex items-center justify-center hover:bg-[#B06A6C] hover:text-white transition-all"
                               >
                                 <Trash2 className="w-5 h-5" />
                               </button>
                             </div>
                          </div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-slate-700">#{i+1}</span>
                          </div>
                       </div>
                     ))}
                  </div>
               )}

               {/* --- Albums View --- */}
               {activeTab === "Albums" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {(activeProject.albums || []).map((album, idx) => (
                       <div key={idx} className="group relative bg-[#F3E9E2]/20 rounded-[2rem] p-4 border border-transparent hover:border-[#B06A6C]/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                          <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                            <img src={album.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-3 right-3">
                               <button 
                                 onClick={() => handleDelete('albums', idx)}
                                 className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-lg"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between px-1">
                            <div className="space-y-0.5">
                               <h4 className="text-base font-black text-[#4A3730] " >{album.name}</h4>
                               <p className="text-[11px] font-bold text-[#8E7E77] uppercase tracking-widest leading-none">{album.count} Photos</p>
                            </div>
                          </div>
                       </div>
                     ))}
                  </div>
               )}

               {/* --- Videos View --- */}
               {activeTab === "Videos" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {(activeProject.videos || []).map((vid, idx) => (
                       <div key={idx} className="group relative bg-white rounded-[2rem] overflow-hidden border border-[#F3E9E2] hover:shadow-xl transition-all duration-500">
                          <div className="aspect-video relative overflow-hidden bg-slate-900 flex items-center justify-center">
                            <Play className="w-12 h-12 text-white/40" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                 <button 
                                   onClick={() => handleDelete('videos', idx)}
                                   className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-rose-500 hover:border-transparent transition-all"
                                 >
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                            </div>
                          </div>
                          <div className="p-6 flex items-center justify-between">
                             <div className="space-y-1 overflow-hidden">
                                <h4 className="text-lg font-black text-[#4A3730] truncate" >{vid}</h4>
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-[#B06A6C] uppercase tracking-widest">
                                   <Video className="w-3 h-3" />
                                   Wedding Highlight
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               )}
            </div>
          </>
        )}
      </div>

    </VendorLayout>
  );
};

export default WorkManager;
