import { Outlet, Link, useLocation } from "react-router-dom";
import { Heart, Home, MapPin, Users, MessageSquare, Menu, X, User } from "lucide-react";
import { useState } from "react";
import ProfileDrawer from "./ProfileDrawer";
import logoImg from "@/assets/logo.png";

const navLinks = [
  { to: "/wedding", label: "Home", icon: Home },
  { to: "/wedding/destinations", label: "Destinations", icon: MapPin },
  { to: "/wedding/vendors", label: "Vendors", icon: Users },
  { to: "/wedding/enquiry", label: "Enquiry", icon: MessageSquare },
];

const megaMenuData = [
  [
    {
      title: "Photographers",
      links: [{ label: "Photographers", to: "/wedding/vendors?category=Photographers" }]
    },
    {
      title: "Makeup",
      links: [
        { label: "Bridal Makeup Artists", to: "/wedding/vendors?category=Makeup" },
        { label: "Family Makeup", tag: "WMG SERVICE", to: "/wedding/vendors?category=Makeup" }
      ]
    },
    {
      title: "Planning & Decor",
      links: [
        { label: "Wedding Planners", to: "/wedding/vendors?category=Planning & Decor" },
        { label: "Decorators", to: "/wedding/vendors?category=Planning & Decor" }
      ]
    },
    {
      title: "Virtual Planning",
      links: [{ label: "Virtual planning", tag: "WMG SERVICE", to: "/wedding/vendors?category=Virtual Planning" }]
    },
    {
      title: "Mehndi",
      links: [{ label: "Mehndi Artist", to: "/wedding/vendors?category=Mehndi" }]
    }
  ],
  [
    {
      title: "Music & Dance",
      links: [
        { label: "DJs", to: "/wedding/vendors?category=Music & Dance" },
        { label: "Sangeet Choreographer", to: "/wedding/vendors?category=Music & Dance" },
        { label: "Wedding Entertainment", to: "/wedding/vendors?category=Music & Dance" }
      ]
    },
    {
      title: "Invites & Gifts",
      links: [
        { label: "Invitations", to: "/wedding/vendors?category=Invites & Gifts" },
        { label: "Favors", to: "/wedding/vendors?category=Invites & Gifts" },
        { label: "Trousseau Packers", to: "/wedding/vendors?category=Invites & Gifts" },
        { label: "Invitation Gifts", to: "/wedding/vendors?category=Invites & Gifts" },
        { label: "Mehndi Favors", to: "/wedding/vendors?category=Invites & Gifts" },
        { label: "View All Invites & Gifts", isViewAll: true, to: "/wedding/vendors?category=Invites & Gifts" }
      ]
    },
    {
      title: "Food",
      links: [{ label: "Catering Services", to: "/wedding/vendors?category=Food" }]
    }
  ],
  [
    {
      title: "Pre Wedding Shoot",
      links: [
        { label: "Pre Wedding Shoot Locations", to: "/wedding/vendors?category=Pre Wedding Shoot" },
        { label: "Pre Wedding Photographers", to: "/wedding/vendors?category=Pre Wedding Shoot" }
      ]
    },
    {
      title: "Bridal Wear",
      links: [
        { label: "Bridal Lehengas", to: "/wedding/vendors?category=Bridal Wear" },
        { label: "Kanjeevaram / Silk Sarees", to: "/wedding/vendors?category=Bridal Wear" },
        { label: "Cocktail Gowns", to: "/wedding/vendors?category=Bridal Wear" },
        { label: "Trousseau Sarees", to: "/wedding/vendors?category=Bridal Wear" },
        { label: "Bridal Lehenga on Rent", to: "/wedding/vendors?category=Bridal Wear" },
        { label: "View All Bridal Wear", isViewAll: true, to: "/wedding/vendors?category=Bridal Wear" }
      ]
    },
    {
      title: "Groom Wear",
      links: [
        { label: "Sherwani", to: "/wedding/vendors?category=Groom Wear" },
        { label: "Wedding Suits / Tuxes", to: "/wedding/vendors?category=Groom Wear" }
      ]
    }
  ],
  [
    {
      title: "Jewelry",
      links: [
        { label: "Bridal Jewellery", to: "/wedding/vendors?category=Jewelry" },
        { label: "Floral Jewellery", to: "/wedding/vendors?category=Jewelry" }
      ]
    },
    {
      title: "Pandit Jee",
      links: [{ label: "Wedding Pandits", to: "/wedding/vendors?category=Pandit Jee" }]
    },
    {
      title: "Bridal Grooming",
      links: [{ label: "Beauty Parlors", to: "/wedding/vendors?category=Bridal Grooming" }]
    },
    {
      title: "Bridal Accessories",
      links: [{ label: "Bridal Shoes & More", to: "/wedding/vendors?category=Bridal Accessories" }]
    }
  ]
];

const WeddingLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const isGallery = location.pathname.includes('/real-weddings/gallery');
  const isBookingDetail = location.pathname.match(/\/wedding\/bookings\/bk-\d+/);
  const hideNav = isGallery || isBookingDetail;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      {!hideNav && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/wedding" className="flex items-center gap-2">
                <img src={logoImg} alt="Weddings Logo" className="h-12 md:h-14 w-auto object-contain scale-110 transition-transform duration-300" />
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-8 h-full">
                {navLinks.filter(link => link.label !== "Enquiry").map((link) => {
                  if (link.label === "Vendors") {
                    return (
                      <div 
                        key={link.to} 
                        className="h-full flex items-center relative"
                        onMouseEnter={() => setMegaMenuOpen(true)}
                        onMouseLeave={() => setMegaMenuOpen(false)}
                      >
                        <Link
                          to={link.to}
                          className={`text-sm font-medium transition-colors duration-200 hover:text-primary py-5 ${
                            location.pathname === link.to
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                        
                        {/* Mega Menu Dropdown */}
                        <div className={`fixed top-[64px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1100px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-2xl p-8 transition-all duration-300 transform cursor-default border border-slate-100 hidden md:flex gap-8 justify-between z-[60] ${
                          megaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                        }`}>
                           {megaMenuData.map((column, colIdx) => (
                             <div key={colIdx} className="flex-1 flex flex-col gap-6">
                               {column.map((category) => (
                                 <div key={category.title}>
                                   <h4 className="text-[14px] font-bold text-primary mb-3">
                                     {category.title}
                                   </h4>
                                   <ul className="flex flex-col gap-2.5">
                                     {category.links.map((subLink) => (
                                       <li key={subLink.label}>
                                         <Link 
                                           to={subLink.to} 
                                           onClick={() => setMegaMenuOpen(false)}
                                           className={`text-[13px] whitespace-nowrap text-slate-500 hover:text-primary transition-colors flex items-center gap-2 ${subLink.isViewAll ? 'font-bold mt-1 text-slate-800' : ''}`}
                                         >
                                           {subLink.label}
                                           {subLink.tag && (
                                             <span className="text-[9px] uppercase tracking-wider text-green-700 font-bold border border-green-200 px-1.5 py-0.5 rounded leading-none bg-green-50 shadow-sm">
                                               {subLink.tag}
                                             </span>
                                           )}
                                         </Link>
                                       </li>
                                     ))}
                                   </ul>
                                 </div>
                               ))}
                             </div>
                           ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`text-sm font-medium transition-colors duration-200 hover:text-primary py-5 ${
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to="/wedding/enquiry"
                  className="px-5 py-2 rounded-full text-sm font-medium wedding-gradient text-primary-foreground transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Plan Your Wedding
                </Link>
              </div>

              {/* Profile Icon */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setProfileOpen(true)}
                  className="p-2 rounded-full bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Profile Drawer */}
      <ProfileDrawer 
        isOpen={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />

      {/* Content */}
      <main className={`${!hideNav ? 'pt-16' : ''} ${location.pathname !== "/wedding" && location.pathname !== "/wedding/" && !hideNav ? "pb-24 md:pb-16" : ""}`}>
        <Outlet />
      </main>

      {/* Bottom Navbar for Mobile */}
      {!hideNav && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-around py-2 px-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex flex-col items-center gap-1 min-w-[64px] transition-all duration-300 ${
                    isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/10" : ""}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "opacity-100" : "opacity-70"}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      {(location.pathname === "/wedding" || location.pathname === "/wedding/") && (
        <footer className="bg-foreground text-background pt-10 pb-28 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <img src={logoImg} alt="Weddings Logo" className="h-6 w-auto brightness-0 invert opacity-90" />
                </div>
                <p className="text-sm opacity-70">
                  Creating unforgettable destination wedding experiences across
                  India's most beautiful locations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                  Destinations
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-70">
                  {["Goa", "Jaipur", "Udaipur", "Kerala", "Rishikesh"].map(
                    (d) => (
                      <Link
                        key={d}
                        to={`/wedding/destinations/${d.toLowerCase()}`}
                        className="block hover:opacity-100 transition-opacity"
                      >
                        {d}
                      </Link>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                  Services
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm opacity-70">
                  {[
                    "Full Planning",
                    "Decor & Design",
                    "Photography",
                    "Catering",
                    "Entertainment",
                  ].map((s) => (
                    <p key={s}>{s}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
                  Get in Touch
                </h4>
                <p className="text-sm opacity-70 mb-2">
                  hello@weddings.example.com
                </p>
                <p className="text-sm opacity-70">+91 98765 43210</p>
              </div>
            </div>
            <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm opacity-50">
              © 2026 Weddings. Crafted with love.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default WeddingLayout;
