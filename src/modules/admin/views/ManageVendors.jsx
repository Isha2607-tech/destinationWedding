import React from 'react';
import { useLocation } from 'react-router-dom';
import { pendingVendors } from '../data/adminMockData';
import { adminStyles } from '../theme/themeConfig';
import { Users, Clock, Filter, Download } from 'lucide-react';

const ManageVendors = () => {
  const location = useLocation();
  const isPendingView = location.pathname.includes('/pending');
  const isAllView = location.pathname.includes('/all') || location.pathname === '/admin/vendors';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-serif text-[hsl(353,45%,35%)]">
              {isPendingView ? 'Pending Approvals' : 'Vendor Management'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {isPendingView 
                ? `Review and verify ${pendingVendors.length} new vendor applications` 
                : 'Manage and oversee all registered vendors on the platform'}
            </p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 border border-white/40 bg-white/30 backdrop-blur-md rounded-xl text-sm font-medium hover:bg-white/50 transition-all">
                <Filter size={16} /> Filter
             </button>
             <button className="flex items-center gap-2 px-4 py-2 border border-white/40 bg-white/30 backdrop-blur-md rounded-xl text-sm font-medium hover:bg-white/50 transition-all">
                <Download size={16} /> Export
             </button>
          </div>
        </div>
      </div>

      {isPendingView ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
          {/* Pending Approvals List Subsection */}
          <div className={`${adminStyles.glassCard} p-8 rounded-3xl`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`${adminStyles.heading} text-2xl font-bold`}>New Vendor Applications</h3>
              <button className={`${adminStyles.primaryButton} px-6 py-2 rounded-xl text-sm font-bold shadow-lg`}>
                Approve All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {pendingVendors.map((vendor) => (
                <div key={vendor.id} className="p-6 rounded-2xl bg-white/50 border border-white/40 flex items-center justify-between group hover:shadow-xl hover:translate-x-1 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[hsl(353,45%,45%)] to-[hsl(353,45%,35%)] flex items-center justify-center text-white font-bold text-2xl shadow-inner group-hover:scale-105 transition-transform">
                      {vendor.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-[hsl(353,20%,15%)] leading-none mb-2">{vendor.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium px-2 py-0.5 bg-[hsl(353,45%,35%)]/10 text-[hsl(353,45%,35%)] rounded">
                          {vendor.category}
                        </span>
                        <span className="text-xs text-gray-400">|</span>
                        <p className="text-sm text-gray-700">{vendor.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right mr-4">
                      <p className="text-xs text-gray-400 mb-1 font-medium">Applied on</p>
                      <p className="text-sm font-bold text-[hsl(353,20%,15%)]">{vendor.date}</p>
                    </div>
                    <div className="flex gap-2">
                       <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
                        Reject
                      </button>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-md shadow-green-200 transition-all active:scale-95">
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Subsection for All Vendors Directory */}
          <div className={`${adminStyles.glassCard} p-12 rounded-3xl text-center flex flex-col items-center gap-4`}>
             <div className="h-20 w-20 rounded-full bg-[hsl(353,45%,35%)]/5 flex items-center justify-center text-[hsl(353,45%,35%)]">
                <Users size={40} />
             </div>
             <div>
                <h3 className={`${adminStyles.heading} text-2xl font-bold`}>All Vendors Directory</h3>
                <p className="max-w-md text-gray-500 mt-2">
                  Searching for a specific vendor? The full directory with search, filters, and status management will be available here soon.
                </p>
             </div>
             <button className="mt-2 px-6 py-2 border-2 border-[hsl(353,45%,35%)] text-[hsl(353,45%,35%)] rounded-xl font-bold hover:bg-[hsl(353,45%,35%)] hover:text-white transition-all">
                Coming Soon
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageVendors;
