import React, { useState } from "react";
import VendorSidebar from "../components/VendorSidebar";
import VendorNavbar from "../components/VendorNavbar";

const VendorLayout = ({ children, title = "Dashboard" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      {/* Navigation Sidebar */}
      <VendorSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Framework */}
      <div className="lg:ml-72 flex flex-col min-h-screen relative transition-all duration-300">
        <VendorNavbar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          title={title}
        />
        
        {/* Dynamic Content Area */}
        <main className="flex-1 p-5 md:p-8 md:px-10 animate-wedding-fade-up">
          <div className="max-w-7xl mx-auto pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
