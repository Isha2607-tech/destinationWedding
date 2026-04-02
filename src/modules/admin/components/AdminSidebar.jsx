import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  MapPin, 
  Image, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronDown,
  UserCheck,
  UserPlus,
  CreditCard,
  BarChart,
  LifeBuoy,
  Bell,
  Megaphone,
  Briefcase,
  Building2
} from 'lucide-react';
import { adminStyles } from '../theme/themeConfig';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { 
    icon: Users, 
    label: 'Manage Vendors', 
    path: '/admin/vendors',
    subItems: [
      { label: 'All Vendors', path: '/admin/vendors/all', icon: UserCheck },
      { label: 'Pending Approvals', path: '/admin/vendors/pending', icon: UserPlus },
    ]
  },
  { icon: UserPlus, label: 'Add Vendors', path: '/admin/add-vendor' },
  { icon: Briefcase, label: 'Manage Customers', path: '/admin/customers' },
  { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
  { icon: CreditCard, label: 'Financials', path: '/admin/financials' },
  { icon: MapPin, label: 'Destinations', path: '/admin/destinations' },
  { icon: Building2, label: 'Venue Approval', path: '/admin/venues' },
  { icon: Image, label: 'Real Weddings', path: '/admin/gallery' },
  { icon: Megaphone, label: 'Marketing', path: '/admin/marketing' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: LifeBuoy, label: 'Support', path: '/admin/support' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true); // Keep vendors expanded by default if active

  return (
    <aside className={`w-72 h-screen fixed left-0 top-0 bg-[#F8E2E5] border-r border-[#F3E9E2] z-50 flex flex-col shadow-sm`}>
      <div className="p-8">
        <h1 className={`${adminStyles.heading} text-2xl font-bold tracking-tight`}>
          MY DESTINATION
          <span className="block text-xs mt-1 uppercase tracking-[0.2em] font-sans opacity-70">Admin Panel</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const hasSubItems = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.path} className="flex flex-col">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[hsl(353,20%,15%)] ${
                    isActive 
                    ? 'bg-[hsl(353,45%,35%)] text-white shadow-md active-sidebar-item' 
                    : 'hover:bg-[hsl(353,45%,35%)]/10'
                  } ${hasSubItems ? 'justify-between' : ''}`
                }
                onClick={(e) => {
                  if (hasSubItems) {
                    setExpanded(!expanded);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {hasSubItems ? (
                  expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                ) : (
                  <div className="ml-auto opacity-0 transition-opacity active:opacity-100">
                    <ChevronRight size={16} />
                  </div>
                )}
              </NavLink>

              {/* Sub Items */}
              {hasSubItems && expanded && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-[hsl(353,45%,35%)]/20 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-300">
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive 
                          ? 'text-[hsl(353,45%,35%)] bg-[hsl(353,45%,35%)]/10 font-bold' 
                          : 'text-gray-500 hover:text-[hsl(353,45%,35%)] hover:bg-[hsl(353,45%,35%)]/5'
                        }`
                      }
                    >
                      <sub.icon size={16} />
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
