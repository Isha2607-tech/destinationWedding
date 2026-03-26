import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";

const PlanWeddingModal = ({ isOpen, onClose, initialLocation = "" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    eventMonth: "",
    eventLocation: initialLocation,
    venueDecided: "no",
    whatsappUpdates: true,
  });

  if (!isOpen) return null;

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const locations = ["Goa", "Udaipur", "Jaipur", "Kerala", "Jim Corbett", "Rishikesh"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-500 overflow-hidden">
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.rem] shadow-2xl overflow-y-auto max-h-[90vh] md:max-h-[85vh] animate-in slide-in-from-bottom duration-700 ease-out flex flex-col border border-white/20">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl bg-white/50 backdrop-blur-md hover:bg-white/80 transition-all text-slate-900 border border-white/50 z-50 shadow-sm"
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        <div className="flex-1 p-6 md:p-10 pt-14 md:pt-14 relative z-40">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Plan your wedding
            </h2>
            <p className="text-sm text-muted-foreground">
              Fill in your details and we'll be in touch.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-[10px] md:text-sm font-bold mb-1.5 text-foreground/60 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your Full Name"
                className="w-full px-5 py-4 rounded-[1.25rem] border border-white/50 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#ff7676]/20 focus:border-[#ff7676] transition-all text-sm placeholder:text-slate-400 shadow-inner"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[10px] md:text-sm font-bold mb-1.5 text-foreground/60 uppercase tracking-widest">Phone Number</label>
              <div className="flex gap-0 overflow-hidden rounded-[1.25rem] border border-white/50 shadow-inner group">
                <div className="flex items-center gap-1 px-4 py-4 bg-white/60 backdrop-blur-md text-sm border-r border-white/50 cursor-pointer hover:bg-white/80 transition-colors">
                  <span className="font-bold text-slate-700">+91</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Enter Phone Number"
                  className="flex-1 px-5 py-4 bg-white/40 backdrop-blur-md focus:outline-none transition-all text-sm placeholder:text-slate-400"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Event Month & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] md:text-sm font-bold mb-1.5 text-foreground/60 uppercase tracking-widest">Event Month</label>
                <div className="relative">
                  <select
                    required
                    className="w-full appearance-none px-5 pr-10 py-4 rounded-[1.25rem] border border-white/50 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#ff7676]/20 focus:border-[#ff7676] transition-all text-sm shadow-inner"
                    value={formData.eventMonth}
                    onChange={(e) => setFormData({...formData, eventMonth: e.target.value})}
                  >
                    <option value="" disabled>Select a Month</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] md:text-sm font-bold mb-1.5 text-foreground/60 uppercase tracking-widest">Event Location</label>
                <div className="relative">
                  <select
                    required
                    className="w-full appearance-none px-5 pr-10 py-4 rounded-[1.25rem] border border-white/50 bg-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#ff7676]/20 focus:border-[#ff7676] transition-all text-sm shadow-inner"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({...formData, eventLocation: e.target.value})}
                  >
                    <option value="" disabled>Select a Location</option>
                    {locations.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Venue Decided */}
            <div>
              <p className="text-sm font-semibold mb-3 text-foreground/80">Have you already decided the venue?</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.venueDecided === 'yes' ? 'border-primary bg-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                    {formData.venueDecided === 'yes' && <div className="w-2 h-2 rounded-full bg-white transition-all transform scale-100" />}
                  </div>
                  <input
                    type="radio"
                    className="hidden"
                    name="venue"
                    value="yes"
                    checked={formData.venueDecided === 'yes'}
                    onChange={() => setFormData({...formData, venueDecided: 'yes'})}
                  />
                  <span className="text-sm font-medium">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.venueDecided === 'no' ? 'border-primary bg-primary' : 'border-slate-300 group-hover:border-primary'}`}>
                    {formData.venueDecided === 'no' && <div className="w-2 h-2 rounded-full bg-white transition-all transform scale-100" />}
                  </div>
                  <input
                    type="radio"
                    className="hidden"
                    name="venue"
                    value="no"
                    checked={formData.venueDecided === 'no'}
                    onChange={() => setFormData({...formData, venueDecided: 'no'})}
                  />
                  <span className="text-sm font-medium">No</span>
                </label>
              </div>
            </div>

            {/* WhatsApp Updates */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div 
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${formData.whatsappUpdates ? 'bg-[#ff7676] border-[#ff7676]' : 'border-slate-300 group-hover:border-[#ff7676]'}`}
                  onClick={() => setFormData({...formData, whatsappUpdates: !formData.whatsappUpdates})}
                >
                  {formData.whatsappUpdates && <X className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-sm font-medium text-slate-600">Send me updates on WhatsApp</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 mt-2 rounded-[1.25rem] bg-[#ff7676] text-white font-bold text-base shadow-lg shadow-red-100 hover:bg-[#ef6666] hover:scale-[1.02] transition-all"
            >
              Get a consultation
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PlanWeddingModal;
