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
      <div className="absolute top-0 left-0 right-0 h-[60px] bg-red-curtain opacity-80 z-40 shadow-lg"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(140, 28, 19, 0.8) 0%, rgba(140, 28, 19, 0.6) 100%)",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Decorative Gold Pattern */}
        <div className="h-[15px] w-full bg-gold opacity-30"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 30px)"
          }}
        ></div>
      </div>
      
      {/* Left Curtain */}
      <motion.div 
        className="curtain-left fixed top-0 bottom-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.2)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          transformOrigin: "left", 
          backgroundImage: "linear-gradient(to right, rgba(140, 28, 19, 0.9) 0%, rgba(140, 28, 19, 0.7) 90%)",
          backgroundAttachment: "fixed",
          boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Curtain Folds - Left */}
        <div className="h-full w-full opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 80px)",
            backgroundSize: "80px 100%"
          }}
        ></div>
      </motion.div>
      
      {/* Right Curtain */}
      <motion.div 
        className="curtain-right fixed top-0 bottom-0 right-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.2)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ 
          transformOrigin: "right", 
          backgroundImage: "linear-gradient(to left, rgba(140, 28, 19, 0.9) 0%, rgba(140, 28, 19, 0.7) 90%)",
          backgroundAttachment: "fixed",
          boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* Curtain Folds - Right */}
        <div className="h-full w-full opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(to left, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 80px)",
            backgroundSize: "80px 100%"
          }}
        ></div>
      </motion.div>
    </div>
  );
}
