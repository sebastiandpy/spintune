import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CurtainsProps {
  isOpen?: boolean;
}

export default function Curtains({ isOpen = false }: CurtainsProps) {
  const [curtainsOpen, setCurtainsOpen] = useState(isOpen);
  
  useEffect(() => {
    // Animate curtains after component mounts
    const timer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="curtains fixed inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Top Drape */}
      <div className="absolute top-0 left-0 right-0 h-[80px] bg-red-curtain opacity-90 z-40 shadow-lg"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(120, 20, 15, 0.95) 0%, rgba(120, 20, 15, 0.85) 100%)",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.6)"
        }}
      >
        {/* Decorative Gold Pattern */}
        <div className="h-[20px] w-full bg-gold opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.2) 15px, rgba(0,0,0,0.2) 30px)"
          }}
        ></div>
        
        {/* Additional decorative elements for the top drape */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-10 border-b-4 border-gold opacity-60"></div>
        </div>
      </div>
      
      {/* Left Curtain */}
      <motion.div 
        className="curtain-left fixed top-0 bottom-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.15)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          transformOrigin: "left", 
          backgroundImage: "linear-gradient(to right, rgba(120, 20, 15, 0.98) 0%, rgba(120, 20, 15, 0.85) 90%)",
          backgroundAttachment: "fixed",
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.7), 5px 0 15px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Curtain Folds - Left */}
        <div className="h-full w-full opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 80px)",
            backgroundSize: "80px 100%"
          }}
        ></div>
        
        {/* Gold trim on left curtain */}
        <div className="absolute right-0 top-0 bottom-0 w-5 opacity-30"
          style={{
            backgroundImage: "linear-gradient(to right, transparent, rgba(210, 160, 74, 0.4) 40%, rgba(210, 160, 74, 0.6) 80%, rgba(210, 160, 74, 0.3))"
          }}
        ></div>
      </motion.div>
      
      {/* Right Curtain */}
      <motion.div 
        className="curtain-right fixed top-0 bottom-0 right-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.15)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          transformOrigin: "right", 
          backgroundImage: "linear-gradient(to left, rgba(120, 20, 15, 0.98) 0%, rgba(120, 20, 15, 0.85) 90%)",
          backgroundAttachment: "fixed",
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.7), -5px 0 15px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Curtain Folds - Right */}
        <div className="h-full w-full opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(to left, transparent, transparent 40px, rgba(0,0,0,0.3) 40px, rgba(0,0,0,0.3) 80px)",
            backgroundSize: "80px 100%"
          }}
        ></div>
        
        {/* Gold trim on right curtain */}
        <div className="absolute left-0 top-0 bottom-0 w-5 opacity-30"
          style={{
            backgroundImage: "linear-gradient(to left, transparent, rgba(210, 160, 74, 0.4) 40%, rgba(210, 160, 74, 0.6) 80%, rgba(210, 160, 74, 0.3))"
          }}
        ></div>
      </motion.div>
      
      {/* Bottom drape */}
      <div className="absolute bottom-0 left-0 right-0 h-[40px] bg-red-curtain opacity-90 z-40 shadow-lg"
        style={{
          backgroundImage: "linear-gradient(to top, rgba(120, 20, 15, 0.95) 0%, rgba(120, 20, 15, 0.85) 100%)",
          boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.6)"
        }}
      >
        {/* Decorative Gold Pattern at bottom */}
        <div className="absolute bottom-0 h-[10px] w-full bg-gold opacity-40"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.2) 15px, rgba(0,0,0,0.2) 30px)"
          }}
        ></div>
      </div>
    </div>
  );
}
