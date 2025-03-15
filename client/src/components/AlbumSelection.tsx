import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { albums } from "@/data/albums";

export default function AlbumSelection() {
  const [_, navigate] = useLocation();

  return (
    <div className="albums-container">
      <h2 className="font-display text-3xl text-center mb-10 text-gold">Select an Album</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {albums.map((album) => (
          <div className="album-item" key={album.id}>
            <motion.div 
              className="album-card flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/player/${album.id}`)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="album-cover mb-4 relative w-full aspect-square shadow-xl rounded-lg overflow-hidden">
                <img 
                  src={album.imageUrl} 
                  alt={`${album.title} Album Cover`} 
                  className="w-full h-full object-cover" 
                />
                <div className="album-overlay absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <p className="text-white font-display text-xl">Play record?</p>
                </div>
              </div>
              <h3 className="font-display text-xl text-center">{album.title}</h3>
              <p className="text-cream text-opacity-80 text-center">{album.artist}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
