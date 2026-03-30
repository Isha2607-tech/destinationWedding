import React, { useState } from "react";
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

const initialPortfolio = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550005816-09246d377488?q=80&w=300&auto=format&fit=crop",
];

const initialAlbums = [
  { id: 1, title: "The Royal Rajasthan", count: 24, cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Beach Wedding Goa", count: 18, cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop" },
];

const initialVideos = [
  { id: 1, title: "Cinematic Highlight", url: "https://youtube.com/...", thumb: "https://images.unsplash.com/photo-1550005816-09246d377488?q=80&w=400&auto=format&fit=crop" }
];

const WorkManager = () => {
  const [activeTab, setActiveTab] = useState("Portfolio");

  return (
    <VendorLayout title="My Work">
      <div className="space-y-8 animate-wedding-fade-up">
        
        {/* Tab Selection */}
        <div className="flex items-center gap-2 bg-[#F3E9E2]/50 p-1.5 rounded-[1.5rem] w-fit">
           {["Portfolio", "Albums", "Videos"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? "bg-[#D28A8C] text-white shadow-lg shadow-[#D28A8C]/20" 
                    : "text-[#8E7E77] hover:bg-white"
                }`}
              >
                {tab}
              </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] border border-[#F3E9E2] p-6 md:p-8 shadow-sm">
           
           {/* Section Header */}
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Manage {activeTab}
                </h2>
                <p className="text-[#8E7E77] text-xs font-medium">Add, remove, or organize your best work pieces.</p>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#D28A8C] text-white font-bold text-sm shadow-xl shadow-[#D28A8C]/20 hover:scale-105 transition-all">
                <PlusCircle className="w-5 h-5" /> Add {activeTab === 'Portfolio' ? 'Photos' : activeTab === 'Albums' ? 'Album' : 'Video Link'}
              </button>
           </div>

           {/* --- Portfolio Grid --- */}
           {activeTab === "Portfolio" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {initialPortfolio.map((img, i) => (
                   <div key={i} className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 border border-[#F3E9E2] shadow-sm">
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3">
                         <div className="flex gap-2">
                           <button className="w-10 h-10 rounded-xl bg-white text-[#D28A8C] flex items-center justify-center hover:bg-[#D28A8C] hover:text-white transition-all">
                             <Trash2 className="w-5 h-5" />
                           </button>
                           <button className="w-10 h-10 rounded-xl bg-white text-slate-800 flex items-center justify-center hover:bg-[#F3E9E2] transition-all">
                             <Settings2 className="w-5 h-5" />
                           </button>
                         </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black uppercase text-slate-700">#{i+1}</span>
                      </div>
                   </div>
                 ))}
                 {/* Upload Dummy Card */}
                 <div className="aspect-[4/5] rounded-[2rem] border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/10 flex flex-col items-center justify-center gap-3 cursor-pointer group hover:bg-[#F3E9E2]/20 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D28A8C] shadow-sm group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#8E7E77]">Upload Image</p>
                 </div>
              </div>
           )}

           {/* --- Albums View --- */}
           {activeTab === "Albums" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {initialAlbums.map((album) => (
                   <div key={album.id} className="group relative bg-[#F3E9E2]/20 rounded-[2rem] p-4 border border-transparent hover:border-[#D28A8C]/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative">
                        <img src={album.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 right-3">
                           <button className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-[#D28A8C] transition-all">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <div className="space-y-0.5">
                           <h4 className="text-base font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>{album.title}</h4>
                           <p className="text-[11px] font-bold text-[#8E7E77] uppercase tracking-widest leading-none">{album.count} Photos</p>
                        </div>
                        <button className="w-10 h-10 rounded-xl bg-[#D28A8C]/10 text-[#D28A8C] flex items-center justify-center group-hover:bg-[#D28A8C] group-hover:text-white transition-all shadow-inner">
                           <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                 ))}
                 {/* New Album Dummy */}
                 <div className="rounded-[2rem] border-2 border-dashed border-[#F3E9E2] bg-[#F3E9E2]/10 h-[260px] flex flex-col items-center justify-center gap-4 cursor-pointer group hover:bg-[#F3E9E2]/20 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#D28A8C] shadow-sm group-hover:scale-110 transition-transform">
                      <Plus className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>New Album</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#8E7E77] opacity-60">Collect Memories</p>
                    </div>
                 </div>
              </div>
           )}

           {/* --- Videos View --- */}
           {activeTab === "Videos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {initialVideos.map((video) => (
                   <div key={video.id} className="group relative bg-white rounded-[2rem] overflow-hidden border border-[#F3E9E2] hover:shadow-xl transition-all duration-500">
                      <div className="aspect-video relative overflow-hidden">
                        <img src={video.thumb} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                           <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#D28A8C]/80 transition-all duration-300">
                              <Play className="w-8 h-8 fill-white" />
                           </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-rose-500 hover:border-transparent transition-all">
                               <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                      </div>
                      <div className="p-6 flex items-center justify-between">
                         <div className="space-y-1">
                            <h4 className="text-lg font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>{video.title}</h4>
                            <div className="flex items-center gap-1.5 text-[10px] font-black text-[#D28A8C] uppercase tracking-widest">
                               <Video className="w-3 h-3" />
                               Wedding Highlight
                            </div>
                         </div>
                         <button className="px-4 py-2 rounded-xl bg-[#F3E9E2] text-slate-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:bg-[#D28A8C] hover:text-white transition-all group/link">
                            Watch <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                         </button>
                      </div>
                   </div>
                 ))}
                 
                 {/* Video Form Hint */}
                 <div className="bg-[#FFFDFB] rounded-[2rem] border-2 border-dashed border-[#F3E9E2] p-8 flex flex-col items-center justify-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#D28A8C] shadow-sm">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="text-center space-y-2">
                       <p className="text-sm font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>Add YouTube Link</p>
                       <p className="text-[11px] text-[#8E7E77] font-medium leading-relaxed max-w-[200px]">
                         Video highlights improve lead conversion by <span className="text-[#D28A8C] font-black">40%</span>.
                       </p>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </VendorLayout>
  );
};

export default WorkManager;
