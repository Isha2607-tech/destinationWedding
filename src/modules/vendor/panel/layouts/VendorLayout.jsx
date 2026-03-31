import React, { useState } from "react";
import VendorSidebar from "../components/VendorSidebar";
import VendorNavbar from "../components/VendorNavbar";

const VendorLayout = ({ children, title = "Dashboard" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F1ED]">
      {/* Navigation Sidebar */}
      <VendorSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Framework */}
      <div className="flex flex-col min-h-screen relative transition-all duration-500 lg:pl-[20rem]">
        <VendorNavbar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          title={title}
        />
        
        {/* Dynamic Content Area with Darker Workspace Background */}
        <main className="flex-1 p-6 md:p-10 md:px-14 animate-wedding-fade-up bg-gradient-to-tr from-[#F7F1ED] via-[#F3E9E2] to-white/30">
          <div className="max-w-[1600px] mx-auto pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
