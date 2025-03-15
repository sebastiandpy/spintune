import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Disc, Info, Play } from "lucide-react";
import { albums } from "@/data/albums";

export default function AlbumSelection() {
  const [_, navigate] = useLocation();

  return (
    <div className="albums-container px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl text-gold mb-2">Select an Album</h2>
        <div className="flex items-center justify-center gap-2 text-cream text-opacity-70">
          <Disc size={16} />
          <p className="text-sm italic">Click on an album to play its record</p>
          <Disc size={16} />
        </div>
        <div className="w-24 h-1 bg-gold bg-opacity-30 mx-auto mt-4"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl mx-auto">
        {albums.map((album) => (
          <div className="album-item" key={album.id}>
            <motion.div 
              className="album-card flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/player/${album.id}`)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)"
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
            >
              <div className="album-cover mb-5 relative w-full aspect-square overflow-hidden rounded-lg border-2 border-gold border-opacity-20"
                style={{ 
                  boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(210, 160, 74, 0.1)" 
                }}
              >
                <img 
                  src={album.imageUrl} 
                  alt={`${album.title} Album Cover`} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Grunge/Vinyl Texture Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-5 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiLz48L3N2Zz4=')",
                    backgroundSize: "cover",
                    opacity: 0.3
                  }}
                ></div>
                
                {/* Hover Overlay */}
                <div className="album-overlay absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 p-5">
                  <motion.div 
                    className="bg-gold bg-opacity-20 rounded-full p-3 mb-4"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(210, 160, 74, 0.3)" }}
                  >
                    <Play size={24} className="text-white" />
                  </motion.div>
                  
                  <div className="bg-black bg-opacity-60 p-4 rounded-md max-w-[90%]">
                    <p className="text-white font-display text-lg mb-2 flex items-center justify-center">
                      <Info size={14} className="mr-1" />
                      Album Details
                    </p>
                    <p className="text-white text-sm leading-relaxed text-center opacity-80">
                      {album.description.length > 120 
                        ? album.description.substring(0, 120) + '...'
                        : album.description
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-display text-xl text-center text-cream">{album.title}</h3>
              <p className="text-gold text-opacity-80 text-center font-medium">{album.artist}</p>
              <div className="mt-2 text-xs text-cream text-opacity-60 flex items-center gap-1 italic">
                <Disc size={10} />
                <span>{album.tracks.length} tracks</span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
