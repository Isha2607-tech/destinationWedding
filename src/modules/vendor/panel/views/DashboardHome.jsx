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
  { label: "Shortlisted", value: "450", icon: Heart, growth: "+7%", color: "bg-[#D28A8C]/10 text-[#D28A8C] shadow-[#D28A8C]/10" },
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
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-xl border border-[#F3E9E2] p-6 md:p-8 rounded-[2rem] shadow-sm animate-wedding-fade-up">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Good Evening, Zoya
            </h2>
            <p className="text-[#8E7E77] font-medium text-sm">
              Your business is growing! You have <span className="text-[#D28A8C] font-black">12 new leads</span> to review today.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <button className="px-5 py-3 rounded-2xl bg-[#D28A8C] text-white font-bold text-sm shadow-xl shadow-[#D28A8C]/30 hover:scale-105 transition-all">
               View All Leads
             </button>
             <button className="px-5 py-3 rounded-2xl bg-white border border-[#F3E9E2] text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
               Profile Preview
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="bg-white rounded-3xl border border-[#F3E9E2] p-5 md:p-6 shadow-sm hover:shadow-xl hover:shadow-[#D28A8C]/5 transition-all duration-500 group animate-wedding-fade-up"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Recent Leads */}
          <div className="lg:col-span-2 space-y-5 animate-wedding-fade-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recent Enquiries
              </h3>
              <button className="text-[11px] font-black text-[#D28A8C] uppercase tracking-widest hover:underline">
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
                         <Calendar className="w-3 h-3 text-[#D28A8C]" />
                         {lead.date}
                       </div>
                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#8E7E77]">
                         <Clock className="w-3 h-3 text-[#D28A8C]" />
                         {lead.event}
                       </div>
                       <div className="font-black text-[#D28A8C] text-[11px]">{lead.budget}</div>
                     </div>
                   </div>
                   <button className="absolute right-4 w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#D28A8C] hover:text-white transition-all group/btn shadow-inner">
                     <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                   </button>
                 </div>
               ))}
            </div>
          </div>

          {/* Sidebar Area: Profile Completion & Quick Stats */}
          <div className="space-y-6 animate-wedding-fade-up" style={{ animationDelay: '600ms' }}>
            {/* Profile Progress */}
            <div className="bg-[#FFFDFB] rounded-3xl border-2 border-dashed border-[#F3E9E2] p-6 relative overflow-hidden group">
               <div className="relative z-10 space-y-5">
                 <div className="flex items-center justify-between">
                   <h3 className="text-base font-black text-[#4A3730] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                     Profile Completion
                   </h3>
                   <span className="text-xl font-black text-[#D28A8C]">75%</span>
                 </div>
                 
                 <div className="h-2 w-full bg-[#F3E9E2] rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-gradient-to-r from-[#D28A8C] to-[#E2A7A9] transition-all duration-1000" 
                     style={{ width: '75%' }} 
                   />
                 </div>

                 <p className="text-[12px] font-medium text-[#8E7E77] leading-relaxed">
                   Add a <span className="text-[#D28A8C] font-bold">Video Portfolio</span> to increase your reach by up to 40%.
                 </p>

                 <button className="w-full py-4 rounded-2xl bg-white border border-[#D28A8C] text-[#D28A8C] font-bold text-sm shadow-sm hover:bg-[#D28A8C] hover:text-white transition-all shadow-[#D28A8C]/5 active:scale-95">
                   Complete Now
                 </button>
               </div>
               {/* Background Decorative */}
               <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#D28A8C]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </div>

            {/* Quick Tips */}
            <div className="bg-[#4A3730] rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-[#4A3730]/10">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                   <TrendingUp className="w-4 h-4 text-emerald-400" />
                 </div>
                 <h4 className="text-sm font-bold tracking-tight">Growth Tip</h4>
               </div>
               <p className="text-[12px] text-white/70 font-medium leading-relaxed">
                 Responding to leads within <span className="text-emerald-400 font-bold">1 hour</span> increases your conversion rate by 3x.
               </p>
               <button className="text-[11px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1 group">
                 Learn More <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default DashboardHome;
