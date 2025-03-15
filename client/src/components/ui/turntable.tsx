import { motion } from "framer-motion";
import VinylRecord from "./vinyl-record";
import { Album } from "@/data/albums";

interface TurntableProps {
  album: Album;
  isPlaying: boolean;
}

export default function Turntable({ album, isPlaying }: TurntableProps) {
  return (
    <div className="turntable relative w-full max-w-md aspect-square rounded-lg bg-brown-light p-6 shadow-2xl">
      <div className="absolute inset-4 rounded-full bg-brown"></div>
      
      {/* The spinning vinyl record */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%]">
        <VinylRecord isPlaying={isPlaying} labelImageUrl={album.imageUrl} />
      </div>
      
      {/* Turntable arm */}
      <motion.div 
        className="arm-container absolute top-[15%] right-[15%] origin-bottom-right"
        animate={{ rotate: isPlaying ? 20 : -45 }}
        transition={{ duration: 0.5 }}
      >
        <div className="arm w-24 h-2 bg-gold rounded-full shadow-md"></div>
        <div className="arm-head w-3 h-4 bg-gold absolute -left-1 -top-2 rounded-sm"></div>
      </motion.div>
    </div>
  );
}
