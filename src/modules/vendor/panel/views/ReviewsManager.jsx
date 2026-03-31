import React from "react";
import { 
  Star, 
  MessageSquare, 
  Send, 
  User, 
  Calendar, 
  Filter,
  CheckCircle,
  TrendingUp,
  ThumbsUp
} from "lucide-react";
import VendorLayout from "../layouts/VendorLayout";

const reviews = [
  { id: 1, user: "Neha Goyal", rating: 5, date: "12 Mar 2026", comment: "Zoya is absolutely amazing! She made us feel so comfortable during the shoot and the photos are beyond beautiful. Highly recommend her for weddings!", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" },
  { id: 2, user: "Rahul Sharma", rating: 4, date: "05 Mar 2026", comment: "The cinematic film was great, but delivery was delayed by a week. Overall good work.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
];

const ReviewsManager = () => {
  return (
    <VendorLayout title="Reviews">
      <div className="space-y-8 animate-wedding-fade-up">
        
        {/* Rating Summary Row */}
        <div className="flex justify-start">
           <div className="bg-white rounded-[2rem] p-6 border border-[#F3E9E2] flex items-center gap-10 shadow-sm">
              <div className="space-y-0.5">
                 <div className="flex items-center gap-2">
                    <span className="text-4xl font-black text-[#4A3730]">4.8</span>
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                 </div>
                 <p className="text-[11px] font-bold text-[#8E7E77] uppercase tracking-widest">Global Rating</p>
              </div>
              <div className="h-12 w-[1px] bg-slate-100" />
              <div className="text-right">
                 <p className="text-xl font-black text-emerald-500">98%</p>
                 <p className="text-[10px] font-bold text-[#8E7E77]">Positive Sentiment</p>
              </div>
           </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-[#4A3730] " >Latest Reviews</h3>
              <button className="flex items-center gap-2 text-[11px] font-black text-[#8E7E77] uppercase tracking-widest bg-white border border-[#F3E9E2] px-4 py-2 rounded-xl">
                 <Filter className="w-3.5 h-3.5" /> Latest
              </button>
           </div>

           <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-[2rem] border border-[#F3E9E2] p-5 shadow-sm space-y-4 group">
                   <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-[#F3E9E2]">
                            <img src={rev.image} alt={rev.user} className="w-full h-full object-cover" />
                         </div>
                         <div className="space-y-1">
                            <h4 className="font-black text-[#4A3730]  text-lg" >{rev.user}</h4>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-[#8E7E77] uppercase tracking-widest leading-none">
                               <div className="flex items-center gap-0.5">
                                  {[1,2,3,4,5].map(s => (
                                    <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                                  ))}
                               </div>
                               <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#B06A6C]" /> {rev.date}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase tracking-widest bg-rose-50 px-3 py-2 rounded-xl hover:bg-rose-100 transition-all">
                            Report
                         </button>
                      </div>
                   </div>

                   <div className="bg-[#F3E9E2]/30 p-4 rounded-[1.5rem] border border-[#F3E9E2]/50">
                      <p className="text-[13px] text-[#4A3730] font-medium leading-relaxed">
                         "{rev.comment}"
                      </p>
                   </div>


                   {/* Reply Input */}
                   <div className="flex items-center gap-4 pl-4 pt-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#B06A6C] border border-[#F3E9E2]">
                         <User className="w-5 h-5 transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex-1 relative">
                         <input 
                            placeholder="Write a public reply..."
                            className="w-full pl-6 pr-14 py-4 bg-white border border-[#F3E9E2] rounded-2xl text-xs font-bold text-slate-800 outline-none focus:border-[#B06A6C]/20 transition-all shadow-inner"
                         />
                         <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#B06A6C] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#B06A6C]/20">
                            <Send className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </VendorLayout>
  );
};

export default ReviewsManager;
