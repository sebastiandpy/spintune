import { Disc, Music, Headphones } from "lucide-react";

export default function Header() {
  return (
    <header className="relative z-50 py-4 bg-gradient-to-b from-brown to-brown/80 shadow-xl">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold opacity-40"></div>
      
      <div className="container mx-auto flex justify-center items-center px-4">
        {/* Left decoration */}
        <div className="hidden md:flex items-center mr-5">
          <Disc size={28} className="text-gold opacity-80" />
          <div className="w-16 h-[2px] bg-gold bg-opacity-40 mx-3"></div>
          <Music size={24} className="text-cream opacity-60" />
        </div>
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <h1 className="font-logo text-5xl md:text-6xl text-gold tracking-wider relative">
            SpinTune
            {/* Subtle text shadow */}
            <span className="absolute inset-0 text-red-curtain opacity-40 blur-sm -z-10">
              SpinTune
            </span>
          </h1>
          <p className="text-cream text-opacity-70 font-display tracking-widest text-xs md:text-sm mt-1">
            VINTAGE VINYL EXPERIENCE
          </p>
        </div>
        
        {/* Right decoration */}
        <div className="hidden md:flex items-center ml-5">
          <Headphones size={24} className="text-cream opacity-60" />
          <div className="w-16 h-[2px] bg-gold bg-opacity-40 mx-3"></div>
          <Disc size={28} className="text-gold opacity-80" />
        </div>
      </div>
      
      {/* Bottom decorative pattern */}
      <div className="h-1 w-full mt-3" 
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(210, 160, 74, 0.3) 15px, rgba(210, 160, 74, 0.3) 30px)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
        }}
      ></div>
    </header>
  );
}
