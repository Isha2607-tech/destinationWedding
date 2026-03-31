import React from "react";
import { 
  Users, 
  Eye, 
  Heart, 
  MessageCircle, 
  ArrowUpRight, 
  Clock, 
  Calendar,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const stats = [
  { label: "Total Enquiries", value: "1,280", icon: MessageCircle, growth: "+12%", color: "bg-blue-50 text-blue-500 shadow-blue-500/10" },
  { label: "New Leads", value: "48", icon: Users, growth: "+5%", color: "bg-emerald-50 text-emerald-500 shadow-emerald-500/10" },
  { label: "Profile Views", value: "12.4K", icon: Eye, growth: "+18%", color: "bg-amber-50 text-amber-500 shadow-amber-500/10" },
  { label: "Shortlisted", value: "450", icon: Heart, growth: "+7%", color: "bg-[#B06A6C]/10 text-[#B06A6C] shadow-[#B06A6C]/10" },
];

const recentLeads = [
  { id: 1, name: "Isha & Rahul", event: "Wedding", date: "24 Nov 2026", status: "New", budget: "₹1.5L", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150&auto=format&fit=crop" },
  { id: 2, name: "Mohit Sethi", event: "Sangeet", date: "12 Dec 2026", status: "Contacted", budget: "₹80K", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=150&auto=format&fit=crop" },
  { id: 3, name: "Priya Sharma", event: "Pre-Wedding", date: "05 Nov 2026", status: "Contacted", budget: "₹45K", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" },
];

const DashboardHome = () => {
  return (
    <VendorLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section - Vendor Greeting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white/80 to-[#F7F1ED] border border-[#DED0C5] p-8 md:p-12 rounded-[3.5rem] shadow-xl shadow-[#4A3730]/10 relative overflow-hidden group animate-wedding-fade-up">
           <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#B06A6C]/10 text-[#B06A6C] text-[10px] font-black uppercase tracking-[0.2em]">Vendor Live</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#4A3730] leading-tight tracking-tight">
              Welcome to your <br /> Creative Workspace, Zoya
            </h2>
            <p className="text-[#7B6A62] font-medium text-sm tracking-wide max-w-lg">
              Your artistry is in demand! There are <span className="text-[#B06A6C] font-black underline decoration-2 underline-offset-4">12 new high-intent leads</span> waiting for your magic touch.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-4">
             <button className="px-8 py-4 rounded-[1.5rem] bg-[#B06A6C] text-white font-black text-sm shadow-2xl shadow-[#B06A6C]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
               Curate Leads <ChevronRight className="w-4 h-4" />
             </button>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#B06A6C]/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="bg-white rounded-3xl border border-[#F3E9E2] p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-[#B06A6C]/5 transition-all duration-500 group animate-wedding-fade-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
                     <TrendingUp className="w-3.5 h-3.5" />
                     {stat.growth}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-black text-[#4A3730] tracking-tight">{stat.value}</h3>
                  <p className="text-[11px] md:text-xs font-bold text-[#8E7E77] uppercase tracking-widest leading-none">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Leads */}
        <div className="space-y-5 animate-wedding-fade-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-[#4A3730] uppercase tracking-wider">
                Recent Enquiries
              </h3>
              <button className="text-[11px] font-black text-[#B06A6C] uppercase tracking-widest hover:underline">
                View History
              </button>
            </div>
            
            <div className="space-y-4">
               {recentLeads.map((lead) => (
                 <div 
                   key={lead.id}
                   className="group bg-white rounded-3xl border border-[#F3E9E2] p-4 flex items-center gap-4 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                 >
                   <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                     <img src={lead.image} alt={lead.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="flex-1 min-w-0 pr-8">
                     <div className="flex items-center gap-2 mb-1">
                       <h4 className="text-base font-black text-[#4A3730] truncate">{lead.name}</h4>
                       <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                         lead.status === 'New' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                       }`}>
                         {lead.status}
                       </span>
                     </div>
                     <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8E7E77]">
                         <Calendar className="w-3 h-3 text-[#B06A6C]" />
                         {lead.date}
                       </div>
                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8E7E77]">
                         <Clock className="w-3 h-3 text-[#B06A6C]" />
                         {lead.event}
                       </div>
                       <div className="font-black text-[#B06A6C] text-[11px]">{lead.budget}</div>
                     </div>
                   </div>
                   <button className="absolute right-4 w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#B06A6C] hover:text-white transition-all group/btn shadow-inner">
                     <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                   </button>
                 </div>
               ))}
            </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default DashboardHome;
