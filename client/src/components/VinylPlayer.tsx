import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Disc, Play, Pause, SkipBack, SkipForward, Music, Info, Volume2 } from "lucide-react";
import { albums } from "@/data/albums";
import Turntable from "@/components/ui/turntable";

interface VinylPlayerProps {
  albumId: number;
}

export default function VinylPlayer({ albumId }: VinylPlayerProps) {
  const [_, navigate] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);
  
  const album = albums.find(a => a.id === albumId);
  
  if (!album) {
    return <div>Album not found</div>;
  }
  
  const currentTrack = album.tracks[currentTrackIndex];
  const [showNotice, setShowNotice] = useState(false);
  
  useEffect(() => {
    // Create audio element based on the album and track
    let audioPath = '';
    let hasAudio = false;
    
    // Map the correct audio file based on album and track
    if (album.id === 1 && currentTrack.id === 1) {
      audioPath = '/attached_assets/Olivia Rodrigo - brutal.mp3';
      hasAudio = true;
    } else if (album.id === 2 && currentTrack.id === 1) {
      audioPath = '/attached_assets/ROSÉ - number one girl.mp3';
      hasAudio = true;
    } else if (album.id === 3 && currentTrack.id === 1) {
      audioPath = '/attached_assets/Taylor Swift - willow.mp3';
      hasAudio = true;
    } else if (album.id === 4 && currentTrack.id === 1) {
      audioPath = '/attached_assets/Maki - Sigurado.mp3';
      hasAudio = true;
    }
    
    // Show notice for tracks without actual audio files
    setShowNotice(!hasAudio && currentTrackIndex > 0);
    
    audioRef.current = new Audio(audioPath);
    
    // Set up event listeners
    audioRef.current.addEventListener('ended', handleTrackEnd);
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleTrackEnd);
      }
      
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [album.id, currentTrackIndex]);
  
  const handleTrackEnd = () => {
    nextTrack();
  };
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
      
      // Track progress for UI updates
      progressInterval.current = window.setInterval(() => {
        if (audioRef.current) {
          const calculatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(calculatedProgress);
        }
      }, 1000);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const nextTrack = () => {
    if (currentTrackIndex >= album.tracks.length - 1) {
      selectTrack(0);
    } else {
      selectTrack(currentTrackIndex + 1);
    }
  };
  
  const previousTrack = () => {
    if (currentTrackIndex <= 0) {
      selectTrack(album.tracks.length - 1);
    } else {
      selectTrack(currentTrackIndex - 1);
    }
  };
  
  const selectTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
    
    setCurrentTrackIndex(index);
    setProgress(0);
    
    // If we were playing, start the new track
    if (isPlaying) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error("Error playing audio:", error);
          });
          
          progressInterval.current = window.setInterval(() => {
            if (audioRef.current) {
              const calculatedProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
              setProgress(calculatedProgress);
            }
          }, 1000);
        }
      }, 100);
    }
  };
  
  return (
    <div className="vinyl-player-container max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button 
          className="flex items-center gap-2 text-gold hover:text-cream transition-colors px-4 py-2 rounded-lg hover:bg-brown-light hover:bg-opacity-50 border border-gold border-opacity-20"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
            }
            navigate('/');
          }}
        >
          <ArrowLeft size={20} />
          <span className="font-display">Back to albums</span>
        </button>
        
        <div className="album-info text-center">
          <h2 className="font-display text-4xl text-gold mb-2">{album.title}</h2>
          <div className="flex items-center justify-center gap-3 text-cream">
            <div className="h-px w-12 bg-gold opacity-40"></div>
            <Disc size={18} className="text-gold" />
            <p className="text-xl font-medium">{album.artist}</p>
            <Disc size={18} className="text-gold" />
            <div className="h-px w-12 bg-gold opacity-40"></div>
          </div>
        </div>
        
        <div className="w-28">
          {/* Empty div for spacing */}
        </div>
      </div>
      
      <div className="player-section flex flex-col lg:flex-row gap-8">
        {/* Left Column - Vinyl Record Display and Album Description */}
        <div className="vinyl-section flex flex-col flex-1">
          {/* Vinyl Record Turntable */}
          <div className="vinyl-container relative flex justify-center items-center p-4 mb-6">
            <div className="absolute inset-0 bg-brown-dark bg-opacity-30 rounded-xl shadow-inner"></div>
            <Turntable album={album} isPlaying={isPlaying} />
          </div>
          
          {/* Album Description - Positioned directly under the turntable */}
          <div className="album-description bg-brown bg-opacity-50 rounded-xl p-6 border border-gold border-opacity-10 shadow-lg mt-2">
            <div className="flex items-center gap-3 mb-4 border-b border-gold border-opacity-20 pb-3">
              <Info size={20} className="text-gold" />
              <h3 className="font-display text-xl text-gold">About this album</h3>
            </div>
            <p className="text-cream text-opacity-90 font-serif leading-relaxed">{album.description}</p>
          </div>
        </div>
        
        {/* Right Column - Track List and Controls */}
        <div className="controls-container flex-1">
          <div className="album-cover-display mb-6 w-full max-w-xs mx-auto">
            <img 
              src={album.imageUrl} 
              alt="Current Album Cover" 
              className="w-full aspect-square object-cover rounded-lg shadow-xl"
            />
          </div>
          
          {/* Current Track Display */}
          <div className="current-track-info mb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Music size={18} className="text-gold" />
              <h3 className="font-display text-2xl text-gold">{currentTrack.title}</h3>
            </div>
            <div className="flex items-center justify-center gap-2 text-cream text-opacity-80">
              <Volume2 size={14} className="opacity-70" />
              <p>{currentTrack.duration}</p>
            </div>
            
            {showNotice && (
              <div className="mt-3 p-3 bg-brown-light bg-opacity-50 rounded-md border border-gold border-opacity-20">
                <p className="text-cream text-sm flex items-center justify-center gap-2">
                  <Info size={14} className="text-gold" />
                  Only the first track of each album has audio available for demonstration.
                </p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container mb-6 px-2">
            <div className="w-full bg-brown-light bg-opacity-60 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="progress-bar h-full"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: "0 0 10px rgba(210, 160, 74, 0.3)" 
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-cream text-opacity-60 px-1">
              <span>0:00</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
          
          {/* Player Controls */}
          <div className="player-controls flex justify-center items-center gap-8 mb-8">
            <motion.button 
              className="text-gold hover:text-cream transition-colors"
              onClick={previousTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipBack size={30} />
            </motion.button>
            
            <motion.button 
              className="w-16 h-16 rounded-full bg-red-curtain hover:bg-red-bright flex items-center justify-center transition-colors"
              onClick={togglePlay}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(192, 31, 29, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
            >
              {isPlaying ? (
                <Pause size={30} className="text-white" />
              ) : (
                <Play size={30} className="text-white ml-1" />
              )}
            </motion.button>
            
            <motion.button 
              className="text-gold hover:text-cream transition-colors"
              onClick={nextTrack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward size={30} />
            </motion.button>
          </div>
          
          {/* Track List */}
          <div className="track-list bg-brown bg-opacity-40 rounded-lg p-5 max-h-64 overflow-y-auto border border-gold border-opacity-10"
            style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Music size={18} className="text-gold" />
              <h3 className="font-display text-xl text-gold">Tracks</h3>
            </div>
            
            <ul className="space-y-2">
              {album.tracks.map((track, index) => (
                <motion.li 
                  key={track.id}
                  className={`track-item p-3 hover:bg-brown-light rounded-md transition-colors flex justify-between items-center cursor-pointer ${
                    index === currentTrackIndex ? 'bg-brown-light border-l-4 border-gold pl-2' : ''
                  }`}
                  onClick={() => selectTrack(index)}
                  whileHover={{ 
                    backgroundColor: "rgba(110, 76, 54, 0.4)",
                    x: 2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {index === currentTrackIndex ? (
                      <Disc size={16} className="text-gold animate-spin-slow" />
                    ) : (
                      <span className="track-number w-6 text-center text-cream text-opacity-60">
                        {track.id}
                      </span>
                    )}
                    <span className={`track-title ${index === currentTrackIndex ? 'text-gold' : ''}`}>
                      {track.title}
                    </span>
                  </div>
                  <span className="track-duration text-cream text-opacity-60 text-sm">
                    {track.duration}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
