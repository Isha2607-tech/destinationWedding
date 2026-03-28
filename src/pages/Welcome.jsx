import React from 'react';
import { useNavigate } from 'react-router-dom';
import hotelImg from '../assets/hotel_transparent.png';
import weddingImg from '../assets/Destination wedding dreams in pastels.png';
import taxiImg from '../assets/taxi_transparent.png';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFDFE] p-4 md:p-8 lg:p-12">
      {/* Background shiny glow */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#722F37]/15 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="-mb-2 md:mb-4 mt-2 md:mt-4 w-full text-center relative z-20">
          <h1 className="text-[36px] md:text-[48px] font-bold text-[#722F37] mb-1 tracking-tight drop-shadow-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Booking</h1>
          <p className="text-gray-600 text-[16px] md:text-[18px] font-medium">All your travel and event needs in one place</p>
        </div>

        {/* Change to grid on desktop, stack on mobile. Remove all box-shadows/backgrounds from wrappers to prevent transparent bounding box issues. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-6 w-full place-items-center">
          {/* Hotel Booking Image Card */}
          <div
            className="w-full max-w-[500px] md:max-w-[450px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
            onClick={() => navigate('/hotel')}
          >
            <img
              src={hotelImg}
              alt="Hotel Booking"
              className="w-full h-auto object-contain drop-shadow-xl scale-y-[1.25] md:scale-y-100"
            />
          </div>

          {/* Destination Wedding Image Card */}
          <div
            className="w-full max-w-[500px] md:max-w-[450px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 -mt-20 md:mt-0"
            onClick={() => navigate('/wedding')}
          >
            <img
              src={weddingImg}
              alt="Destination Wedding"
              className="w-full h-auto object-contain drop-shadow-xl scale-y-[1.25] md:scale-y-100"
            />
          </div>

          {/* Taxi Booking Image Card */}
          <div
            className="w-full max-w-[500px] md:max-w-[450px] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 -mt-20 md:mt-0"
            onClick={() => navigate('/taxi')}
          >
            <img
              src={taxiImg}
              alt="Taxi Booking"
              className="w-full h-auto object-contain drop-shadow-xl scale-y-[1.25] md:scale-y-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
