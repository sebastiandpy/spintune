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
      audioPath = './attached_assets/Olivia Rodrigo - brutal.mp3';
      hasAudio = true;
    } else if (album.id === 2 && currentTrack.id === 1) {
      audioPath = './attached_assets/ROSÉ - number one girl.mp3';
      hasAudio = true;
    } else if (album.id === 3 && currentTrack.id === 1) {
      audioPath = './attached_assets/Taylor Swift - willow.mp3';
      hasAudio = true;
    } else if (album.id === 4 && currentTrack.id === 1) {
      audioPath = './attached_assets/Maki - Sigurado.mp3';
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
            <div className="relative group overflow-hidden rounded-lg shadow-2xl border border-gold border-opacity-20">
              <img 
                src={album.imageUrl} 
                alt={`${album.title} by ${album.artist}`} 
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-dark to-transparent opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-gradient-to-t from-brown-dark to-transparent">
                <div className="font-display text-gold">{album.title}</div>
                <div className="text-cream text-sm">{album.artist}</div>
              </div>
            </div>
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
            <div className="w-full bg-brown-light bg-opacity-60 rounded-full h-3 overflow-hidden shadow-inner border border-gold border-opacity-10">
              <div 
                className="progress-bar h-full bg-gradient-to-r from-gold to-red-curtain transition-all duration-300"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: "0 0 10px rgba(210, 160, 74, 0.5)" 
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-cream text-opacity-80 px-1 font-medium">
              <span>0:00</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
          
          {/* Player Controls */}
          <div className="player-controls p-4 mb-8 bg-brown-dark bg-opacity-30 rounded-xl border border-gold border-opacity-10 shadow-lg">
            <div className="flex justify-center items-center gap-8">
              <motion.button 
                className="text-gold hover:text-cream transition-colors bg-brown-light bg-opacity-40 w-12 h-12 rounded-full flex items-center justify-center"
                onClick={previousTrack}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(110, 76, 54, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <SkipBack size={24} />
              </motion.button>
              
              <motion.button 
                className="w-16 h-16 rounded-full bg-red-curtain hover:bg-red-bright flex items-center justify-center transition-colors"
                onClick={togglePlay}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(192, 31, 29, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
              >
                {isPlaying ? (
                  <Pause size={32} className="text-white" />
                ) : (
                  <Play size={32} className="text-white ml-1" />
                )}
              </motion.button>
              
              <motion.button 
                className="text-gold hover:text-cream transition-colors bg-brown-light bg-opacity-40 w-12 h-12 rounded-full flex items-center justify-center"
                onClick={nextTrack}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(110, 76, 54, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}
              >
                <SkipForward size={24} />
              </motion.button>
            </div>
            
            {/* Current Playback Status */}
            {isPlaying && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-red-curtain rounded-full animate-pulse"></div>
                <span className="text-sm text-cream">Now Playing</span>
                <div className="w-2 h-2 bg-red-curtain rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
          
          {/* Track List */}
          <div className="track-list bg-brown-dark bg-opacity-40 rounded-xl p-6 max-h-72 overflow-y-auto border border-gold border-opacity-10 shadow-xl"
            style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-5 border-b border-gold border-opacity-20 pb-3">
              <Music size={20} className="text-gold" />
              <h3 className="font-display text-xl text-gold">Complete Tracklist</h3>
            </div>
            
            {/* Track Column Headers */}
            <div className="flex justify-between items-center mb-2 px-3 text-xs uppercase tracking-wider text-cream text-opacity-60 font-medium">
              <span>Track</span>
              <span>Duration</span>
            </div>
            
            <ul className="space-y-1.5">
              {album.tracks.map((track, index) => (
                <motion.li 
                  key={track.id}
                  className={`track-item px-3 py-2.5 rounded-md transition-all flex justify-between items-center cursor-pointer relative overflow-hidden group
                    ${index === currentTrackIndex ? 'bg-brown-light bg-opacity-50 shadow-md' : 'hover:bg-brown-light hover:bg-opacity-30'}`}
                  onClick={() => selectTrack(index)}
                  whileHover={{ 
                    backgroundColor: "rgba(110, 76, 54, 0.3)",
                    x: 1
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Highlight for currently playing track */}
                  {index === currentTrackIndex && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
                  )}
                  
                  <div className="flex items-center gap-3 flex-1 truncate pr-2">
                    {index === currentTrackIndex ? (
                      <Disc size={18} className="text-gold shrink-0 animate-spin-slow" />
                    ) : (
                      <span className="track-number w-5 h-5 flex items-center justify-center text-center rounded-full bg-brown-light bg-opacity-30 text-cream text-opacity-70 text-xs shrink-0 group-hover:bg-gold group-hover:bg-opacity-20">
                        {track.id}
                      </span>
                    )}
                    <span className={`track-title truncate ${index === currentTrackIndex ? 'text-gold font-medium' : 'group-hover:text-cream'}`}>
                      {track.title}
                    </span>
                  </div>
                  
                  <span className="track-duration text-cream text-opacity-60 text-sm font-mono">
                    {track.duration}
                  </span>
                </motion.li>
              ))}
            </ul>
            
            <div className="text-center mt-5 pt-3 border-t border-gold border-opacity-10">
              <p className="text-xs text-cream text-opacity-50 italic">
                {album.tracks.length} tracks · {album.artist}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
