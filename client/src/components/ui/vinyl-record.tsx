import { motion } from "framer-motion";

interface VinylRecordProps {
  isPlaying: boolean;
  labelImageUrl: string;
}

export default function VinylRecord({ isPlaying, labelImageUrl }: VinylRecordProps) {
  return (
    <motion.div 
      className="vinyl-record relative w-full h-full rounded-full shadow-xl"
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={isPlaying ? { 
        duration: 8, 
        ease: "linear", 
        repeat: Infinity 
      } : { duration: 0.5 }}
    >
      {/* Record grooves */}
      <div className="vinyl-grooves absolute inset-0 rounded-full"></div>
      
      {/* Record shine effect */}
      <div className="record-shine absolute inset-0 rounded-full"></div>
      
      {/* Center label */}
      <div className="vinyl-label absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full flex items-center justify-center">
        <div className="center-hole w-[15%] h-[15%] rounded-full bg-vinyl"></div>
      </div>
      
      {/* Album artwork mini */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] rounded-full overflow-hidden">
        <img 
          src={labelImageUrl} 
          alt="Album mini" 
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}
