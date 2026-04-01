import React, { useState } from 'react';
import { adminStyles } from '../theme/themeConfig';
import { Plus, X, Save, Image, Tag, Briefcase, PlusCircle } from 'lucide-react';

const AddVendors = () => {
  const [vendorData, setVendorData] = useState({
    name: '',
    category: '',
    location: '',
  });

  const [subsections, setSubsections] = useState(['']);

  const handleAddSubsection = () => {
    setSubsections([...subsections, '']);
  };

  const handleRemoveSubsection = (index) => {
    const newList = [...subsections];
    newList.splice(index, 1);
    setSubsections(newList);
  };

  const handleSubsectionChange = (index, value) => {
    const newList = [...subsections];
    newList[index] = value;
    setSubsections(newList);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif text-[hsl(353,45%,35%)]">Add New Vendor</h2>
          <p className="text-gray-500 text-sm mt-1">Create a new vendor profile with specific service categories</p>
        </div>
        <button className={`${adminStyles.primaryButton} flex items-center gap-2 px-8 py-3 rounded-2xl font-bold shadow-xl shadow-[hsl(353,45%,35%)]/20 active:scale-95 transition-all`}>
          <Save size={20} />
          Save Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`${adminStyles.glassCard} p-8 rounded-3xl space-y-6`}>
             <h3 className={`${adminStyles.heading} text-xl font-bold flex items-center gap-2`}>
                <Briefcase size={20} /> Basic Information
             </h3>
             
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Vendor Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Royal Makeup Artistry"
                    className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[hsl(353,45%,35%)] focus:bg-white transition-all transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Primary Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Makeup Artist"
                    className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[hsl(353,45%,35%)] focus:bg-white transition-all transition-all duration-300"
                  />
                </div>
              </div>
          </div>

          <div className={`${adminStyles.glassCard} p-8 rounded-3xl space-y-6`}>
             <div className="flex items-center justify-between">
                <h3 className={`${adminStyles.heading} text-xl font-bold flex items-center gap-2`}>
                    <Tag size={20} /> Service Subsections
                </h3>
                <button 
                  onClick={handleAddSubsection}
                  className="flex items-center gap-1.5 text-sm font-bold text-[hsl(353,45%,35%)] hover:bg-[hsl(353,45%,35%)]/5 px-3 py-1.5 rounded-lg transition-all"
                >
                  <PlusCircle size={16} /> Add Subsection
                </button>
             </div>
             
             <p className="text-sm text-gray-500 italic">Add specific services like 'Bridal Makeup', 'Regular Makeup' etc.</p>

             <div className="space-y-3">
                {subsections.map((sub, index) => (
                  <div key={index} className="flex items-center gap-3 animate-in slide-in-from-right-2 duration-300">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={sub}
                        onChange={(e) => handleSubsectionChange(index, e.target.value)}
                        placeholder={`Subsection ${index + 1} (e.g. Bridal Makeup)`}
                        className="w-full px-4 py-2.5 rounded-xl border border-white/40 bg-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(353,45%,35%)] focus:bg-white transition-all"
                      />
                    </div>
                    {subsections.length > 1 && (
                      <button 
                        onClick={() => handleRemoveSubsection(index)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar help / Media */}
        <div className="space-y-6">
          <div className={`${adminStyles.glassCard} p-8 rounded-3xl space-y-6`}>
             <h3 className={`${adminStyles.heading} text-lg font-bold flex items-center gap-2`}>
                <Image size={18} /> Media & Assets
             </h3>
             <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2 hover:border-[hsl(353,45%,35%)] hover:text-[hsl(353,45%,35%)] transition-all cursor-pointer bg-white/20">
                <Plus size={32} />
                <span className="text-xs font-bold text-center px-4">Upload Cover Photo</span>
             </div>
             <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Recommended: 800x600px</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[hsl(353,45%,35%)] to-[hsl(353,45%,45%)] rounded-3xl text-white shadow-xl">
             <h4 className="font-bold flex items-center gap-2 mb-2">
                <PlusCircle size={18} /> Quick Tip
             </h4>
             <p className="text-xs opacity-90 leading-relaxed">
                Adding detailed subsections helps users filter vendors more accurately. For a photographer, subsections could be 'Candid', 'Traditional', and 'Cinematography'.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVendors;
