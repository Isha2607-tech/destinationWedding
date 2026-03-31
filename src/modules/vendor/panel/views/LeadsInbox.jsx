import React, { useState } from "react";
import { 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Archive,
  MoreVertical,
  User,
  ExternalLink,
  Search,
  MessageCircle,
  TrendingDown
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const initialLeads = [
  { id: 1, name: "Isha & Rahul", event: "Wedding", date: "24 Nov 2026", status: "New", budget: "₹1.5L", phone: "+91 99887 76655", email: "isha@rahul.com", message: "Hi Zoya, we love your photography style! We are looking for a pre-wedding and wedding coverage in Jaipur. Can you let us know your availability?", time: "2h ago", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=150&auto=format&fit=crop" },
  { id: 2, name: "Mohit Sethi", event: "Sangeet", date: "12 Dec 2026", status: "Contacted", budget: "₹80K", phone: "+91 91234 56789", email: "mohit@sethi.in", message: "Hey, I need a photographer for my brother's sangeet ceremony in Indore. Please call me back with a quote for a 4-hour coverage.", time: "1d ago", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=150&auto=format&fit=crop" },
  { id: 3, name: "Ananya Kapoor", event: "Pre-Wedding", date: "15 Oct 2026", status: "Booked", budget: "₹45K", phone: "+91 98321 09876", email: "ananya@kapoor.com", message: "We want a cinematic photoshoot in Udaipur for our pre-wedding. Please suggest some locations as well.", time: "3d ago", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" },
];

const LeadsInbox = () => {
  const [selectedLead, setSelectedLead] = useState(initialLeads[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = initialLeads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <VendorLayout title="Leads Inbox">
      <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6 animate-wedding-fade-up">
        
        {/* LEFT: Inbox List */}
        <div className="w-full md:w-[380px] flex flex-col gap-5 h-full">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#B06A6C] transition-colors" />
              <input 
                 placeholder="Search Leads..."
                 className="w-full pl-11 pr-4 py-4 bg-white border border-[#F3E9E2] rounded-[2rem] text-sm font-bold text-slate-800 outline-none focus:border-[#B06A6C]/30 focus:shadow-lg focus:shadow-[#B06A6C]/5 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>

           <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-1">
              {filteredLeads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`w-full text-left p-4 md:p-5 rounded-[2rem] border transition-all duration-300 group ${
                    selectedLead.id === lead.id 
                    ? "bg-[#B06A6C] text-white shadow-xl shadow-[#B06A6C]/20 border-transparent" 
                    : "bg-white border-[#F3E9E2] hover:bg-slate-50 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                     <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform shrink-0">
                        <img src={lead.image} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                           <h4 className={`text-sm font-black  truncate ${selectedLead.id === lead.id ? "text-white" : "text-[#4A3730]"}`} >
                             {lead.name}
                           </h4>
                           <span className={`text-[9px] font-black uppercase tracking-tighter ${selectedLead.id === lead.id ? "text-white/70" : "text-slate-300"}`}>
                             {lead.time}
                           </span>
                        </div>
                        <div className="flex items-center justify-between">
                           <p className={`text-[10px] font-bold uppercase tracking-widest leading-none ${selectedLead.id === lead.id ? "text-white/80" : "text-[#8E7E77]"}`}>
                             {lead.event}
                           </p>
                           <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                             selectedLead.id === lead.id 
                             ? "bg-white/20 text-white" 
                             : (lead.status === 'New' ? "bg-emerald-50 text-emerald-500" : "bg-slate-100 text-slate-400")
                           }`}>
                             {lead.status}
                           </span>
                        </div>
                     </div>
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* RIGHT: Detail Chat-style View */}
        <div className="hidden md:flex flex-1 flex-col bg-white rounded-[2.5rem] border border-[#F3E9E2] shadow-sm relative overflow-hidden">
           {selectedLead ? (
             <div className="h-full flex flex-col p-8 md:p-10">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#F3E9E2] pb-6 mb-8">
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.5rem] border-2 border-[#B06A6C]/10 shadow-lg overflow-hidden group">
                         <img src={selectedLead.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-2xl font-black text-[#4A3730] " >
                           {selectedLead.name}
                         </h3>
                         <div className="flex items-center gap-4 text-[10px] font-bold text-[#8E7E77] uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-[#B06A6C]" /> {selectedLead.date}</span>
                            <span className="flex items-center gap-1.5 font-black text-[#B06A6C]">{selectedLead.budget}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#F3E9E2] transition-all">
                         <MoreVertical className="w-5 h-5" />
                      </button>
                   </div>
                </div>

                {/* Content Body: Chat Bubble style */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-10">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#B06A6C] shrink-0 border border-[#F3E9E2]">
                         <User className="w-5 h-5" />
                      </div>
                      <div className="max-w-[80%] bg-[#F3E9E2]/30 p-6 rounded-[2rem] rounded-tl-lg border border-[#F3E9E2]/50">
                         <p className="text-[14px] text-[#4A3730] font-medium leading-relaxed ">
                           "{selectedLead.message}"
                         </p>
                      </div>
                   </div>

                   <div className="ml-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-dotted border-[#F3E9E2] flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                            <Phone className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#8E7E77] opacity-60">Mobile Number</p>
                            <p className="text-sm font-bold text-[#4A3730]">{selectedLead.phone}</p>
                         </div>
                      </div>
                      <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-dotted border-[#F3E9E2] flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-400 flex items-center justify-center">
                            <Mail className="w-4 h-4" />
                         </div>
                         <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-[#8E7E77] opacity-60">Email Address</p>
                            <p className="text-sm font-bold text-[#4A3730] truncate">{selectedLead.email}</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="ml-14 flex items-center gap-4">
                      <button className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">
                         <TrendingDown className="w-3 h-3 rotate-180" />
                         Response probability: 92%
                      </button>
                   </div>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-[#F3E9E2]">
                   <button className="w-full sm:flex-1 py-4 bg-[#B06A6C] text-white font-black text-sm rounded-2xl shadow-xl shadow-[#B06A6C]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                      <CheckCircle className="w-5 h-5" /> Mark as Booked
                   </button>
                   <button className="w-full sm:flex-1 py-4 bg-emerald-50 text-emerald-600 font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-100 active:scale-95 transition-all">
                      <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
                   </button>
                   <button className="w-14 h-14 bg-white border border-rose-100 text-rose-400 rounded-2xl flex items-center justify-center hover:bg-rose-50 transition-all shrink-0">
                      <Archive className="w-6 h-6" />
                   </button>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center p-10 text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#F3E9E2]/50 flex items-center justify-center text-[#B06A6C]/20 border-2 border-dashed border-[#F3E9E2]">
                   <Heart className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                   <h3 className="text-2xl font-black text-[#4A3730]  " >
                     Select a Lead
                   </h3>
                   <p className="text-[#8E7E77] text-sm font-medium">Click on an enquiry to view full customer details.</p>
                </div>
             </div>
           )}
        </div>
        
        {/* Mobile View Placeholder Hint for selection */}
        {!selectedLead && (
           <div className="md:hidden text-center py-20 px-8 text-slate-300">
              <p className="">Select a lead from the list to view details.</p>
           </div>
        )}
      </div>
    </VendorLayout>
  );
};

export default LeadsInbox;
