import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star, MapPin, Heart, Share2, Phone, MessageSquare, Mail,
  ChevronRight, CheckCircle, Image as ImageIcon,
  Calendar, Flag, ChevronLeft, X, Award, Play
} from "lucide-react";
import { mockVendors } from "../data/vendorListingData";

/* ─── Lightbox ─── */
const Lightbox = ({ images, startIdx, onClose }) => {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); prev(); }}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <img
        src={images[idx]}
        alt=""
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10" onClick={(e) => { e.stopPropagation(); next(); }}>
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-4 text-white/60 text-sm">{idx + 1} / {images.length}</div>
    </div>
  );
};

/* ─── Star Row ─── */
const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`w-4 h-4 ${s <= Math.round(rating) ? "fill-[#f04e5e] text-[#f04e5e]" : "text-slate-200"}`}
      />
    ))}
  </div>
);

/* ─── Main Component ─── */
const VendorDetailPage = () => {
  const { vendorId } = useParams();
  const [activeTab, setActiveTab] = useState("Projects");
  const [projectsSubTab, setProjectsSubTab] = useState("Portfolio");
  const [isSticky, setIsSticky] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { images, idx }
  const [shortlisted, setShortlisted] = useState(false);
  const [whatsapp, setWhatsapp] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const heroRef = useRef(null);
  const tabRef = useRef(null);

  const vendor = useMemo(() => mockVendors.find((v) => v.id === vendorId) || mockVendors[0], [vendorId]);
  const similarVendors = useMemo(
    () => mockVendors.filter((v) => v.category === vendor.category && v.id !== vendor.id).slice(0, 3),
    [vendor]
  );

  // Sticky tab bar on scroll
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        setIsSticky(window.scrollY > heroRef.current.offsetTop + heroRef.current.offsetHeight - 60);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const galleryImages = vendor.images || [vendor.image];
  const portfolioImages = vendor.portfolio || [vendor.image];
  const albums = vendor.albums || [];
  const videos = vendor.videos || [];

  return (
    <div className="bg-[#FFF5F6] min-h-screen">
      {lightbox && (
        <Lightbox images={lightbox.images} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />
      )}

      {/* ── Breadcrumbs ── */}
      <div className="bg-white border-b border-slate-100 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <Link to="/wedding" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/wedding/vendors" className="hover:text-primary transition-colors">Vendors</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/wedding/vendors?category=${vendor.category}`} className="hover:text-primary transition-colors">
            Wedding {vendor.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 font-bold">{vendor.name}</span>
        </div>
      </div>

      {/* ── Hero Gallery ── */}
      <div ref={heroRef} className="relative bg-black">
        <div className="flex h-[300px] md:h-[460px] overflow-hidden">
          {/* Main image */}
          <div
            className="flex-[2] relative cursor-zoom-in overflow-hidden"
            onClick={() => setLightbox({ images: galleryImages, idx: 0 })}
          >
            <img
              src={galleryImages[0]}
              alt={vendor.name}
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Right thumbnail stack */}
          {galleryImages.length > 1 && (
            <div className="hidden md:flex flex-col flex-1 gap-1">
              {galleryImages.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden cursor-zoom-in flex-1`}
                  onClick={() => setLightbox({ images: galleryImages, idx: i + 1 })}
                >
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-500" />
                  {i === 1 && galleryImages.length > 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button
                        className="flex flex-col items-center gap-1 text-white"
                        onClick={(e) => { e.stopPropagation(); setLightbox({ images: galleryImages, idx: 2 }); }}
                      >
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-sm font-bold">+{galleryImages.length - 3} Photos</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom-left overlay: vendor quick info */}
        <div className="absolute bottom-0 left-0 p-5 md:p-8">
          <div className="bg-black/60 backdrop-blur-md rounded-xl px-5 py-3 text-white flex items-center gap-4">
            {vendor.isFeatured && (
              <div className="flex items-center gap-1 bg-[#f04e5e] text-white text-[10px] font-bold px-2 py-1 rounded">
                👑 Handpicked
              </div>
            )}
            <div>
              <h1 className="text-lg md:text-xl font-bold">{vendor.name}</h1>
              <div className="flex items-center gap-2 text-white/80 text-[12px] mt-0.5">
                <MapPin className="w-3 h-3" />
                {vendor.location}
                <span className="flex items-center gap-0.5 ml-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-white">{vendor.rating}</span>
                  <span>({vendor.reviews} reviews)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top-right actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShortlisted(!shortlisted)}
            className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 transition-colors ${shortlisted ? "fill-[#f04e5e] text-[#f04e5e]" : "text-slate-400"}`} />
          </button>
          <button className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* ── Sticky Tab Bar ── */}
      <div
        ref={tabRef}
        className={`bg-white border-b border-slate-200 z-20 transition-all duration-300 ${isSticky ? "sticky top-0 shadow-md" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex overflow-x-auto no-scrollbar">
              {["Projects", "About", "Reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-[13px] font-bold uppercase tracking-wide transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#9d313d] text-[#9d313d]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {isSticky && (
              <div className="hidden md:flex items-center gap-3 py-2">
                <span className="text-[13px] font-bold text-slate-700 truncate max-w-[160px]">{vendor.name}</span>
                <button className="px-4 py-2 bg-[#9d313d] text-white rounded-lg text-[12px] font-bold hover:bg-[#8a2a35] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Send Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content + Sidebar ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ──── Left Content ──── */}
          <div className="flex-grow min-w-0">

            {/* Vendor info card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">{vendor.name}</h2>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[11px] font-bold border border-blue-100">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </div>
                    {vendor.isFeatured && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[11px] font-bold border border-amber-100">
                        <Award className="w-3 h-3" /> Top Rated
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {vendor.location}
                    <button className="text-primary text-xs font-bold ml-1 hover:underline">(View on Map)</button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-green-600 text-white px-2.5 py-1 rounded text-[13px] font-bold">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      {vendor.rating}
                    </div>
                    <span className="text-[13px] text-slate-500 font-medium">{vendor.reviews} reviews</span>
                    <StarRow rating={vendor.rating} />
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-[13px] text-slate-500 font-medium">Starting from</div>
                  <div className="text-2xl font-black text-[#9d313d]">{vendor.price}</div>
                  <div className="text-[12px] text-slate-400">{vendor.priceUnit}</div>
                </div>
              </div>

              {/* Action row - Enhanced Horizontal Scroll for Mobile */}
              <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-100 overflow-x-auto no-scrollbar scroll-smooth">
                <button 
                  className="flex items-center gap-2 text-slate-500 hover:text-[#9d313d] transition-all whitespace-nowrap shrink-0 group" 
                  onClick={() => setLightbox({ images: portfolioImages, idx: 0 })}
                >
                  <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[12px] font-bold uppercase tracking-wide">{portfolioImages.length}+ Photos</span>
                </button>
                <button 
                  className="flex items-center gap-2 text-slate-500 hover:text-[#f04e5e] transition-all whitespace-nowrap shrink-0 group" 
                  onClick={() => setShortlisted(!shortlisted)}
                >
                  <Heart className={`w-4 h-4 transition-all group-hover:scale-110 ${shortlisted ? "fill-[#f04e5e] text-[#f04e5e]" : ""}`} />
                  <span className="text-[12px] font-bold uppercase tracking-wide">{shortlisted ? "Shortlisted" : "Shortlist"}</span>
                </button>
                <button 
                  className="flex items-center gap-2 text-slate-500 hover:text-[#9d313d] transition-all whitespace-nowrap shrink-0 group" 
                  onClick={() => setActiveTab("Reviews")}
                >
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[12px] font-bold uppercase tracking-wide">Write a Review</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-[#9d313d] transition-all whitespace-nowrap shrink-0 group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[12px] font-bold uppercase tracking-wide">Share</span>
                </button>
                {/* Extra spacer for scroll padding */}
                <div className="w-4 shrink-0" />
              </div>
            </div>

            {/* Tab Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-5 overflow-hidden">
              <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                {["Projects", "About", "Reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-[13px] font-bold uppercase tracking-wide transition-all border-b-2 whitespace-nowrap ${
                      activeTab === tab
                        ? "border-[#9d313d] text-[#9d313d]"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-5 md:p-7">
                {/* ── Projects tab ── */}
                {activeTab === "Projects" && (
                  <div>
                    {/* Sub tabs hierarchy */}
                    <div className="flex border-b border-slate-100 mb-6 bg-white overflow-x-auto no-scrollbar shadow-[inset_-20px_0_20px_-20px_rgba(0,0,0,0.05)]">
                      {[
                        { label: "Portfolio", count: portfolioImages.length + 341 },
                        { label: "Albums", count: albums.length + 49 },
                        { label: "Videos", count: videos.length + 19 },
                      ].map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => setProjectsSubTab(sub.label)}
                          className={`px-5 py-3 text-[12px] font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                            projectsSubTab === sub.label
                              ? "border-[#9d313d] text-[#9d313d]"
                              : "border-transparent text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {sub.label} ({sub.count})
                        </button>
                      ))}
                    </div>

                    {/* Sub tab content */}
                    {projectsSubTab === "Portfolio" && (
                      <div>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                          {portfolioImages.map((img, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded shadow-sm overflow-hidden bg-slate-100 group cursor-zoom-in"
                              onClick={() => setLightbox({ images: portfolioImages, idx: i })}
                            >
                              <img
                                src={img}
                                alt="Portfolio"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                          <button className="px-10 py-2.5 border border-[#9d313d] text-[#9d313d] text-[13px] font-bold rounded-full hover:bg-[#9d313d] hover:text-white transition-all">
                            View 337 more
                          </button>
                        </div>
                      </div>
                    )}

                    {projectsSubTab === "Albums" && (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {albums.map((album) => (
                            <div 
                              key={album.id} 
                              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-sm border border-slate-100"
                              onClick={() => setLightbox({ images: album.photos || [album.image], idx: 0 })}
                            >
                              <div className="aspect-[3/2] overflow-hidden">
                                <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                              </div>
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 h-[60%]">
                                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1.5 shadow-md">
                                  <ImageIcon className="w-3.5 h-3.5" /> {album.count}
                                </span>
                                <h4 className="text-white text-[18px] font-extrabold tracking-wide mb-0.5 drop-shadow-lg">{album.title}</h4>
                                <div className="text-white/90 text-[12px] font-semibold drop-shadow-md">
                                  Shot in {album.location}
                                </div>
                                <div className="text-white/80 text-[11px] font-medium mt-0.5 drop-shadow-md">
                                  {album.type}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                          <button className="px-10 py-2.5 border border-[#9d313d] text-[#9d313d] text-[13px] font-bold rounded-full hover:bg-[#9d313d] hover:text-white transition-all shadow-sm">
                            View 49 more
                          </button>
                        </div>
                      </div>
                    )}

                    {projectsSubTab === "Videos" && (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {videos.map((vid) => (
                            <div key={vid.id} className="group cursor-pointer">
                              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden mb-2 rounded border border-slate-200">
                                <img src={vid.image} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 border-[10px] border-black/40 pointer-events-none" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center bg-black/20 group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                  </div>
                                </div>
                                <div className="absolute bottom-2 left-3">
                                  <h4 className="text-white text-[13px] font-bold uppercase tracking-wide drop-shadow-md">{vid.title}</h4>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                          <button className="px-10 py-2.5 border border-[#9d313d] text-[#9d313d] text-[13px] font-bold rounded-full hover:bg-[#9d313d] hover:text-white transition-all">
                            View 19 more
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── About tab ── */}
                {activeTab === "About" && (
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-800 mb-3">
                      About {vendor.name} — Wedding {vendor.category}, {vendor.location}
                    </h3>
                    <p className="text-slate-600 text-[14px] leading-relaxed mb-6">{vendor.about}</p>

                    <div className="border-t border-slate-100 pt-5 mb-5">
                      <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-3">Working Style</h4>
                      <p className="text-slate-600 text-[14px] leading-relaxed">{vendor.workingStyle}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                      <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-4">Services Offered</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-4">
                        {vendor.services?.map((s) => (
                          <div key={s} className="flex items-center gap-2.5 text-[14px] text-slate-600">
                            <div className="w-2 h-2 bg-[#9d313d] rounded-full shrink-0" />
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Reviews tab ── */}
                {activeTab === "Reviews" && (
                  <ReviewsTab vendor={vendor} />
                )}
              </div>
            </div>

          </div>

          {/* ──── Sticky Sidebar ──── */}
          <aside className="w-full lg:w-[360px] shrink-0">
            <div className="space-y-4 sticky top-20">

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-bold text-slate-800">Per Day Price Estimate</h3>
                  <button className="text-primary text-[11px] font-bold hover:underline flex items-center gap-0.5">
                    Pricing Info <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-lg font-black text-[#9d313d]">{vendor.price}</span>
                      <span className="text-[11px] text-slate-400 font-medium ml-1">{vendor.priceUnit}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      Base Package
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-black text-[#9d313d]">₹ 1,20,000</span>
                      <span className="text-[11px] text-slate-400 font-medium ml-1">per day</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      Premium Package
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Form */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                {/* CTA buttons */}
                <div className="flex gap-2 mb-5">
                  <button className="flex-1 py-3.5 bg-[#9d313d] text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-[#8a2a35] transition-colors shadow-md text-[13px]">
                    <Mail className="w-4 h-4" /> Send Message
                  </button>
                  <button className="flex-1 py-3.5 bg-[#00ad45] text-white rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-[#00963b] transition-colors shadow-md text-[13px]">
                    <Phone className="w-4 h-4" /> View Contact
                  </button>
                </div>

                <p className="text-[14px] font-bold text-slate-800 mb-4">Hi {vendor.name},</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full name*"
                      className="w-full pb-2 border-b border-slate-200 text-[13px] focus:border-primary focus:outline-none placeholder-slate-400"
                    />
                    <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200">
                      <span className="text-[13px] font-bold text-slate-700">🇮🇳 +91</span>
                      <input type="text" placeholder="Phone*" className="w-full text-[13px] focus:outline-none placeholder-slate-400" />
                    </div>
                  </div>
                  <input
                    type="email"
                    placeholder="Email address*"
                    className="w-full pb-2 border-b border-slate-200 text-[13px] focus:border-primary focus:outline-none placeholder-slate-400"
                  />
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <input type="text" placeholder="Function date*" className="w-full text-[13px] focus:outline-none placeholder-slate-400" />
                  </div>
                  <textarea
                    placeholder="Details about my wedding..."
                    className="w-full pb-2 border-b border-slate-200 text-[13px] focus:border-primary focus:outline-none min-h-[70px] resize-none placeholder-slate-400"
                  />
                </div>

                {/* WhatsApp toggle */}
                <div className="flex items-center justify-between py-4 border-t border-slate-100 mt-3">
                  <span className="text-[13px] font-semibold text-slate-700">Notify me on WhatsApp</span>
                  <button
                    onClick={() => setWhatsapp(!whatsapp)}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${whatsapp ? "bg-[#00ad45]" : "bg-slate-300"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${whatsapp ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>

                <button className="w-full py-4 bg-[#9d313d] text-white rounded-xl font-bold hover:bg-[#8a2a35] transition-all shadow-md shadow-[#9d313d]/20 text-[14px] mt-1">
                  Send Message
                </button>
              </div>

              {/* In High Demand */}
              {vendor.enquiriesLastWeek > 4 && (
                <div className="bg-orange-50 rounded-xl p-4 flex items-center justify-between border border-orange-100">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-orange-700">
                    🔥
                    <span className="bg-orange-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-tight">In High Demand</span>
                  </div>
                  <span className="text-[12px] font-medium text-orange-800">
                    {vendor.enquiriesLastWeek} enquiries last week
                  </span>
                </div>
              )}

              {/* Report */}
              <div className="text-center">
                <button className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mx-auto hover:text-red-400 transition-colors">
                  <Flag className="w-3 h-3" /> Report Inaccurate Info
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Similar Vendors at bottom */}
      {similarVendors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-7">
            <h3 className="text-[20px] md:text-[24px] font-bold text-slate-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Similar {vendor.category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {similarVendors.concat(mockVendors.filter(v => v.category === vendor.category && v.id !== vendor.id).slice(3, 4)).map((sv) => (
                <Link
                  key={sv.id}
                  to={`/wedding/vendors/${sv.id}`}
                  className="group rounded-xl overflow-hidden bg-white border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={sv.images?.[0] || sv.image} alt={sv.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-600 text-white text-[10px] md:text-[11px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      <Star className="w-2.5 h-2.5 fill-white" />
                      {sv.rating}
                    </div>
                  </div>
                  <div className="p-3.5 flex-1">
                    <h4 className="text-[13px] md:text-[14px] font-extrabold text-slate-800 truncate mb-1 group-hover:text-[#9d313d] transition-colors">{sv.name}</h4>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {sv.location}
                    </div>
                    <div className="pt-2 border-t border-slate-50">
                      <p className="text-[14px] md:text-[16px] font-black text-[#9d313d]">{sv.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Mobile bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex gap-3 lg:hidden z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button className="flex-1 py-3 bg-[#9d313d] text-white rounded-xl font-bold flex items-center justify-center gap-2 text-[14px] hover:bg-[#8a2a35] transition-colors">
          <Mail className="w-4 h-4" /> Send Message
        </button>
        <button className="flex-1 py-3 bg-[#00ad45] text-white rounded-xl font-bold flex items-center justify-center gap-2 text-[14px] hover:bg-[#00963b] transition-colors">
          <Phone className="w-4 h-4" /> Contact
        </button>
      </div>
      <div className="h-20 lg:hidden" />
    </div>
  );
};

/* ─── Reviews Tab Subcomponent ─── */
const ReviewsTab = ({ vendor }) => {
  const [starRating, setStarRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  const ratingDist = [
    { star: 5, pct: 95, count: 49 },
    { star: 4, pct: 5, count: 1 },
    { star: 3, pct: 0, count: 0 },
    { star: 2, pct: 0, count: 0 },
    { star: 1, pct: 0, count: 0 },
  ];

  return (
    <div>
      {/* Rating overview + distribution */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Big number */}
        <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl px-8 py-6 border border-slate-100 shrink-0">
          <div className="text-5xl font-black text-slate-800 mb-1">{vendor.rating}</div>
          <StarRow rating={vendor.rating} />
          <div className="text-[12px] text-slate-500 font-medium mt-2">{vendor.reviews} reviews</div>
        </div>

        {/* Distribution bars */}
        <div className="flex-1">
          {ratingDist.map((r) => (
            <div key={r.star} className="flex items-center gap-3 mb-2.5">
              <div className="flex items-center gap-0.5 shrink-0 w-12 justify-end">
                <span className="text-[12px] font-bold text-slate-600">{r.star}</span>
                <Star className="w-3 h-3 fill-[#f04e5e] text-[#f04e5e]" />
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#f04e5e] transition-all duration-500"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-medium shrink-0 w-16 text-right">
                {r.count} reviews
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      {vendor.reviewHighlights?.length > 0 && (
        <div className="space-y-4 mb-8">
          {vendor.reviewHighlights.map((rev, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex items-start gap-3">
                <img src={rev.avatar} alt={rev.user} className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[14px] font-bold text-slate-800">{rev.user}</div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <StarRow rating={rev.rating} />
                  <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">{rev.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write review */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
        <h4 className="text-[15px] font-bold text-slate-800 mb-3">Write a Review for {vendor.name}</h4>
        <p className="text-[13px] font-bold text-slate-600 mb-3">Your Rating*</p>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onMouseEnter={() => setHoverStar(s)}
              onMouseLeave={() => setHoverStar(0)}
              onClick={() => setStarRating(s)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-[#f04e5e]/5 transition-colors"
            >
              <Star className={`w-5 h-5 transition-colors ${s <= (hoverStar || starRating) ? "fill-[#f04e5e] text-[#f04e5e]" : "text-slate-200"}`} />
            </button>
          ))}
        </div>
        <textarea
          className="w-full p-4 rounded-xl border border-slate-200 text-[13px] focus:ring-1 focus:ring-primary focus:outline-none min-h-[100px] mb-4 resize-none"
          placeholder="Tell us about your experience*"
        />
        <div className="flex justify-between items-center">
          <button className="text-[13px] font-bold text-primary hover:underline">+ Add Photos</button>
          <button className="px-8 py-3 bg-[#9d313d] text-white font-bold rounded-xl text-[13px] shadow-md hover:bg-[#8a2a35] transition-colors">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
