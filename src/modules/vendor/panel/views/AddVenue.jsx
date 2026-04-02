import React, { useState, useEffect } from 'react';
import { getAllDestinations, saveVendorVenue, updateVendorVenue } from '../../../../services/storage';
import { 
  Building2, 
  MapPin, 
  Users, 
  IndianRupee, 
  Type, 
  FileText, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  Upload,
  Trash,
  Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VendorLayout from '../layouts/VendorLayout';

const ALL_AMENITIES = [
  'Bridal Suite',
  'On-site Catering',
  'Decor & Design',
  'Audio Visual Equipment',
  'Guest Accommodation',
  'Complimentary Parking',
  'Valet Service',
  'Power Backup',
];

const toggleAmenity = (list, item) =>
  list.includes(item) ? list.filter(a => a !== item) : [...list, item];

const AddVenue = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const editVenue = location.state?.editVenue;

  const [destinations, setDestinations] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialCustomAmenities = editVenue?.amenities?.filter(a => !ALL_AMENITIES.includes(a)) || [];
  const [customAmenities, setCustomAmenities] = useState(initialCustomAmenities);
  
  const [formData, setFormData] = useState(editVenue ? {
    name: editVenue.name || '',
    destinationId: editVenue.destinationId || '',
    type: editVenue.type || 'Resort',
    capacity: editVenue.capacity || '',
    pricePerDay: editVenue.pricePerDay || '',
    description: editVenue.description || '',
    image: editVenue.image || '',
    amenities: editVenue.amenities || [],
    rentalHours: editVenue.rentalHours || '12 PM – 12 AM',
    cancellationPolicy: editVenue.cancellationPolicy || 'Flexible (4 weeks)',
    outsideCatering: editVenue.outsideCatering || 'Permitted',
    alcoholPolicy: editVenue.alcoholPolicy || 'Allowed',
  } : {
    name: '',
    destinationId: '',
    type: 'Resort',
    capacity: '',
    pricePerDay: '',
    description: '',
    image: '',
    amenities: [],
    rentalHours: '12 PM – 12 AM',
    cancellationPolicy: 'Flexible (4 weeks)',
    outsideCatering: 'Permitted',
    alcoholPolicy: 'Allowed',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setDestinations(getAllDestinations());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API/Network lag
    setTimeout(() => {
      const payload = {
        ...formData,
        capacity: Number(formData.capacity),
        pricePerDay: Number(formData.pricePerDay),
        vendorName: user?.name || 'Authorized Vendor',
        vendorId: user?.id
      };

      if (editVenue) {
        updateVendorVenue({ ...payload, id: editVenue.id, status: editVenue.status });
      } else {
        saveVendorVenue(payload);
      }
      setIsSubmitting(false);
      navigate('/vendor/venues/my');
    }, 1000);
  };

  return (
    <VendorLayout title={editVenue ? "Edit Venue" : "Add Venue"}>
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-2 mb-8 text-sm text-gray-400 font-bold uppercase tracking-widest">
         <span>My Venues</span>
         <ChevronRight size={14} />
         <span className="text-[#B06A6C]">{editVenue ? "Edit Venue" : "Add New Venue"}</span>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border border-[#B06A6C]/10 shadow-2xl overflow-hidden">
         <div className="p-8 md:p-12 border-b border-[#B06A6C]/5 bg-gradient-to-r from-[#B06A6C]/5 to-transparent">
            <h2 className="text-3xl font-serif text-[hsl(353,45%,35%)] mb-2">{editVenue ? "Edit Venue Details" : "Venue Submission"}</h2>
            <p className="text-gray-500 text-sm">{editVenue ? "Update information for your existing property listing." : "Provide detailed information about your property for Admin verification."}</p>
         </div>

         <form onSubmit={handleSubmit} className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Type size={12} /> Venue Name
               </label>
               <input 
                 required
                 value={formData.name}
                 onChange={e => setFormData({...formData, name: e.target.value})}
                 placeholder="e.g. Moonlight Palace"
                 className="w-full px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={12} /> Destination
               </label>
               <select 
                 required
                 value={formData.destinationId}
                 onChange={e => setFormData({...formData, destinationId: e.target.value})}
                 className="w-full px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium appearance-none"
               >
                  <option value="">Select Destination</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Building2 size={12} /> Venue Type
               </label>
               <select 
                 value={formData.type}
                 onChange={e => setFormData({...formData, type: e.target.value})}
                 className="w-full px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
               >
                  <option>Palace</option>
                  <option>Resort</option>
                  <option>Banquet</option>
                  <option>Farmhouse</option>
                  <option>Heritage Haveli</option>
               </select>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Users size={12} /> Capacity (Guests)
               </label>
               <input 
                 type="number"
                 required
                 value={formData.capacity}
                 onChange={e => setFormData({...formData, capacity: e.target.value})}
                 placeholder="e.g. 500"
                 className="w-full px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <IndianRupee size={12} /> Price Per Day
               </label>
               <input 
                 type="number"
                 required
                 value={formData.pricePerDay}
                 onChange={e => setFormData({...formData, pricePerDay: e.target.value})}
                 placeholder="e.g. 150000"
                 className="w-full px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
               />
            </div>

            {/* ---- IMAGE UPLOAD ---- */}
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Cover Image
               </label>
               <div className="relative group">
                  <input
                    type="file"
                    id="venue-image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {!formData.image ? (
                    <label
                      htmlFor="venue-image-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#B06A6C]/20 rounded-3xl bg-white hover:bg-[#B06A6C]/5 hover:border-[#B06A6C]/40 transition-all cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#B06A6C]/10 flex items-center justify-center text-[#B06A6C]">
                          <Upload size={20} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-slate-600">Click to upload photo</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">PNG, JPG or WebP (Max 2MB)</p>
                        </div>
                      </div>
                    </label>
                  ) : (
                    <div className="relative h-44 w-full rounded-3xl overflow-hidden border border-[#B06A6C]/20 shadow-lg">
                      <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <label htmlFor="venue-image-upload" className="p-3 bg-white text-[hsl(353,45%,35%)] rounded-2xl cursor-pointer hover:scale-110 transition-transform">
                          <Upload size={20} />
                        </label>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="p-3 bg-white text-red-500 rounded-2xl hover:scale-110 transition-transform"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  )}
               </div>
            </div>

            {/* ---- AMENITIES ---- */}
            <div className="md:col-span-2 space-y-3">
               <div className="flex items-center justify-between">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={12} /> Amenities Offered
                 </label>
                 <button 
                   type="button"
                   onClick={() => {
                     const amenity = window.prompt("Enter new custom amenity:");
                     if (amenity && amenity.trim()) {
                       const newAmenity = amenity.trim();
                       if (!ALL_AMENITIES.includes(newAmenity) && !customAmenities.includes(newAmenity)) {
                         setCustomAmenities(prev => [...prev, newAmenity]);
                         setFormData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity] }));
                       }
                     }
                   }}
                   className="text-[10px] font-black text-[#B06A6C] uppercase tracking-widest flex items-center gap-1 hover:underline active:scale-95 transition-all"
                 >
                    <Plus size={12} /> Add Custom
                 </button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {[...ALL_AMENITIES, ...customAmenities].map(amenity => (
                   <label key={amenity} className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border cursor-pointer text-sm font-semibold transition-all ${
                     formData.amenities.includes(amenity)
                       ? 'bg-[#B06A6C]/10 border-[#B06A6C]/40 text-[#B06A6C]'
                       : 'bg-white border-[#B06A6C]/20 text-slate-600 hover:border-[#B06A6C]/40'
                   }`}>
                     <input
                       type="checkbox"
                       className="hidden"
                       checked={formData.amenities.includes(amenity)}
                       onChange={() => setFormData(prev => ({ ...prev, amenities: toggleAmenity(prev.amenities, amenity) }))}
                     />
                     <CheckCircle2 size={14} className={formData.amenities.includes(amenity) ? 'text-[#B06A6C]' : 'text-slate-300'} />
                     {amenity}
                   </label>
                 ))}
               </div>
            </div>

            {/* ---- BOOKING POLICY ---- */}
            <div className="md:col-span-2 space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Booking Policy
               </label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Venue Rental Hours</label>
                   <input
                     value={formData.rentalHours}
                     onChange={e => setFormData({...formData, rentalHours: e.target.value})}
                     placeholder="e.g. 12 PM – 12 AM"
                     className="w-full px-5 py-3 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Cancellation Policy</label>
                   <select
                     value={formData.cancellationPolicy}
                     onChange={e => setFormData({...formData, cancellationPolicy: e.target.value})}
                     className="w-full px-5 py-3 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
                   >
                     <option>Flexible (4 weeks)</option>
                     <option>Moderate (6 weeks)</option>
                     <option>Strict (3 months)</option>
                     <option>Non-refundable</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Outside Catering</label>
                   <select
                     value={formData.outsideCatering}
                     onChange={e => setFormData({...formData, outsideCatering: e.target.value})}
                     className="w-full px-5 py-3 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
                   >
                     <option>Permitted</option>
                     <option>Not Permitted</option>
                     <option>Permitted with charges</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Alcohol Policy</label>
                   <select
                     value={formData.alcoholPolicy}
                     onChange={e => setFormData({...formData, alcoholPolicy: e.target.value})}
                     className="w-full px-5 py-3 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
                   >
                     <option>Allowed</option>
                     <option>Not Allowed</option>
                     <option>Allowed with permit</option>
                   </select>
                 </div>
               </div>
            </div>

            {/* ---- DESCRIPTION ---- */}
            <div className="md:col-span-2 space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Description
               </label>
               <textarea 
                 required
                 value={formData.description}
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 placeholder="Tell us what makes this venue special..."
                 className="w-full h-32 px-5 py-4 bg-white border border-[#B06A6C]/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B06A6C]/20 transition-all font-medium"
               />
            </div>

            <div className="md:col-span-2 pt-6">
               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full py-5 bg-[hsl(353,45%,35%)] text-white rounded-[2rem] font-bold shadow-xl shadow-[hsl(353,45%,35%)]/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
               >
                  {isSubmitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      {editVenue ? 'Update Venue Details' : 'Submit Venue for Approval'}
                    </>
                  )}
               </button>
            </div>
         </form>
      </div>
    </div>
    </VendorLayout>
  );
};

export default AddVenue;
