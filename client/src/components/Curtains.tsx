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
    <div className="curtains fixed inset-0 z-30 pointer-events-none">
      <motion.div 
        className="curtain-left bg-red-curtain opacity-70 fixed top-0 bottom-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.2)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
      <motion.div 
        className="curtain-right bg-red-curtain opacity-70 fixed top-0 bottom-0 w-1/2 h-full"
        initial={{ transform: "scaleX(1)" }}
        animate={{ transform: curtainsOpen ? "scaleX(0.2)" : "scaleX(1)" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
}
