import React, { useState, useEffect } from 'react';
import { getVendorVenues, getAllDestinations } from '../../../../services/storage';
import { adminStyles } from '../../../admin/theme/themeConfig';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Users,
  IndianRupee,
  Edit2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VendorLayout from '../layouts/VendorLayout';

const MyVenues = () => {
  const { user } = useAuth();
  const [venues, setVenues] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const allVenues = getVendorVenues();
    // Filter by current vendor ID
    const myFiltered = allVenues.filter(v => v.vendorId === user?.id);
    setVenues(myFiltered);
    setDestinations(getAllDestinations());
  }, [user]);

  const getDestName = (id) => {
    const d = destinations.find(dest => dest.id === id);
    return d ? d.name : 'Unknown';
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-50 text-green-600 border-green-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-orange-50 text-orange-600 border-orange-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle2 size={14} />;
      case 'rejected': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <VendorLayout title="My Venues">
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif text-[hsl(353,45%,35%)]">My Venues</h2>
            <p className="text-gray-500 text-sm mt-1">Manage and track the status of your property listings</p>
          </div>
          <Link 
            to="/vendor/venues/add"
            className="flex items-center gap-2 px-6 py-3 bg-[hsl(353,45%,35%)] text-white rounded-2xl text-sm font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 leading-none"
          >
             <Plus size={18} /> Add New Venue
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {venues.map((venue) => (
           <div key={venue.id} className={`${adminStyles.glassCard} p-8 rounded-[2.5rem] group relative overflow-hidden flex flex-col`}>
              <div className="flex justify-between items-start mb-6">
                 <div className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${getStatusStyle(venue.status)}`}>
                    {getStatusIcon(venue.status)} {venue.status}
                 </div>
                 <div className="flex gap-2">
                   <Link 
                     to="/vendor/venues/add" 
                     state={{ editVenue: venue }}
                     className="p-3 bg-white/50 border border-[#B06A6C]/10 rounded-2xl text-slate-400 hover:text-[#B06A6C] transition-all"
                   >
                      <Edit2 size={18} />
                   </Link>
                   <button className="p-3 bg-white/50 border border-[#B06A6C]/10 rounded-2xl text-slate-400 hover:text-[#B06A6C] transition-all">
                      <ExternalLink size={18} />
                   </button>
                 </div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                 <div className="h-20 w-20 rounded-3xl bg-slate-100 overflow-hidden shrink-0 border-4 border-white shadow-lg">
                    <img src={venue.image || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop'} className="w-full h-full object-cover" alt={venue.name} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-800 leading-none mb-2">{venue.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                       <MapPin size={14} className="text-[#B06A6C]" /> {getDestName(venue.destinationId)}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#B06A6C]/5 mt-auto">
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                       <Users size={12} className="text-[#B06A6C]" /> Capacity
                    </p>
                    <p className="text-sm font-bold text-slate-700">{venue.capacity} Guests</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                       <IndianRupee size={12} className="text-[#B06A6C]" /> Pricing
                    </p>
                    <p className="text-sm font-bold text-slate-700">₹{(venue.pricePerDay / 1000).toFixed(0)}K / Day</p>
                 </div>
              </div>

              {venue.status === 'rejected' && (
                <div className="mt-6 p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-3">
                   <XCircle size={18} className="text-red-500 shrink-0" />
                   <p className="text-xs text-red-700 font-medium">Verification failed: Please ensure legal property documents are clear and valid.</p>
                </div>
              )}
           </div>
         ))}

         {venues.length === 0 && (
           <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-dashed border-[#B06A6C]/20 rounded-[3rem] bg-white/20 backdrop-blur-md">
              <div className="h-20 w-20 rounded-full bg-[#B06A6C]/10 flex items-center justify-center mb-6">
                 <Building2 size={40} className="text-[#B06A6C]/30" />
              </div>
              <h3 className="text-xl font-serif text-[hsl(353,45%,35%)] mb-2">No Venues Found</h3>
              <p className="text-slate-500 text-sm mb-8 text-center max-w-xs">You haven't added any properties to your profile yet. Start by adding your first venue.</p>
              <Link 
                to="/vendor/venues/add"
                className="px-8 py-3 bg-[hsl(353,45%,35%)] text-white rounded-2xl text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                 Add Your First Venue
              </Link>
           </div>
         )}
      </div>
    </div>
    </VendorLayout>
  );
};

export default MyVenues;
