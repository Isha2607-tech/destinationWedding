import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, Heart, Car } from 'lucide-react';
import hotelImg from '../assets/hotel_blue.png';
import weddingImg from '../assets/wedding_pink.png';
import taxiImg from '../assets/taxi_road.png';

const ServiceCard = ({ title, subtitle, image, icon: Icon, onClick, comingSoon, themeColor }) => {
  const themes = {
    blue: "bg-blue-600/30 border-blue-400/40 shadow-blue-500/20",
    pink: "bg-pink-600/30 border-pink-400/40 shadow-pink-500/20",
    yellow: "bg-yellow-600/30 border-yellow-400/40 shadow-yellow-500/20"
  };

  return (
    <div
      onClick={onClick}
      className={`relative group w-full max-w-[340px] mx-auto aspect-[16/8] md:aspect-[4/3] lg:aspect-[16/10] md:max-w-none overflow-hidden rounded-[1.5rem] cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl`}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

      {/* Icon Container (Top Left) */}
      <div className={`absolute top-4 left-4 w-10 h-10 rounded-xl backdrop-blur-md border flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-[10deg] ${themes[themeColor]}`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
      </div>

      {/* Coming Soon Badge (Top Right) */}
      {comingSoon && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-black tracking-widest text-white uppercase shadow-sm">
          Coming Soon
        </div>
      )}

      {/* Content (Bottom Left) */}
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h2 className="text-xl md:text-xl font-black tracking-tight mb-0.5 leading-none transition-transform group-hover:-translate-y-1">
          {title}
        </h2>
        <p className="text-[10px] md:text-xs font-medium text-white/80 leading-tight opacity-90 transition-transform group-hover:-translate-y-1 delay-75">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8 overflow-hidden flex flex-col items-center pt-2 md:pt-12">
      {/* Background shiny glow */}
      <div className="fixed top-20 right-20 w-[600px] h-[600px] bg-[#722F37]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed -bottom-20 -left-20 w-[500px] h-[500px] bg-orange-200/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="mb-4 md:mb-5 w-full text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#1e1b1b] mb-2 md:mb-4 tracking-tighter drop-shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            Booking
          </h1>
          <p className="text-slate-500 text-xs md:text-base font-medium tracking-tight opacity-80">
            All your travel and event needs in one place
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full max-w-5xl lg:max-w-6xl px-4 mt-8 md:mt-12">
          <ServiceCard
            title="Hotel Services"
            subtitle="Indulge in a premium stay at curated locations"
            image={hotelImg}
            icon={Hotel}
            themeColor="blue"
            onClick={() => navigate('/hotel')}
          />

          <ServiceCard
            title="Destination Wedding"
            subtitle="Craft your dream celebration with elegance"
            image={weddingImg}
            icon={Heart}
            themeColor="pink"
            onClick={() => navigate('/wedding')}
          />

          <ServiceCard
            title="Taxi Service"
            subtitle="Travel in comfort with our elite fleet"
            image={taxiImg}
            icon={Car}
            themeColor="yellow"
            onClick={() => navigate('/taxi')}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;

