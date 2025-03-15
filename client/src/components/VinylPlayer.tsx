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
      <div className="flex justify-between items-center mb-6">
        <button 
          className="flex items-center gap-2 text-gold hover:text-cream transition-colors px-3 py-2 rounded-lg hover:bg-brown-light hover:bg-opacity-30"
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
          <h2 className="font-display text-3xl text-gold mb-1">{album.title}</h2>
          <div className="flex items-center justify-center gap-2 text-cream text-opacity-80">
            <Disc size={16} className="text-gold" />
            <p className="text-xl">{album.artist}</p>
            <Disc size={16} className="text-gold" />
          </div>
        </div>
        
        <div className="w-28">
          {/* Empty div for spacing */}
        </div>
      </div>
      
      {/* Album Description */}
      <div className="album-description bg-brown bg-opacity-40 rounded-lg p-5 mb-8 text-center border border-gold border-opacity-10"
        style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Info size={16} className="text-gold" />
          <h3 className="font-display text-lg text-gold">About this album</h3>
        </div>
        <p className="text-cream text-opacity-90 italic leading-relaxed">{album.description}</p>
      </div>
      
      <div className="player-section flex flex-col lg:flex-row gap-8">
        {/* Vinyl Record Display */}
        <div className="vinyl-container relative flex-1 flex justify-center items-center">
          <Turntable album={album} isPlaying={isPlaying} />
        </div>
        
        {/* Track List and Controls */}
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
            <h3 className="font-display text-2xl text-gold">{currentTrack.title}</h3>
            <p className="text-cream text-opacity-80">{currentTrack.duration}</p>
            
            {showNotice && (
              <div className="mt-2 p-2 bg-brown-light bg-opacity-50 rounded-md">
                <p className="text-cream text-sm">
                  <i className="ri-information-line mr-1"></i>
                  Only the first track of each album has audio available for demonstration.
                </p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="progress-container mb-6 w-full bg-brown-light rounded-full h-2 overflow-hidden">
            <div 
              className="progress-bar h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Player Controls */}
          <div className="player-controls flex justify-center items-center gap-6 mb-8">
            <button 
              className="text-gold hover:text-cream transition-colors"
              onClick={previousTrack}
            >
              <i className="ri-skip-back-fill text-3xl"></i>
            </button>
            
            <button 
              className="w-16 h-16 rounded-full bg-red-curtain hover:bg-red-bright flex items-center justify-center transition-colors shadow-lg"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <i className="ri-pause-fill text-4xl"></i>
              ) : (
                <i className="ri-play-fill text-4xl"></i>
              )}
            </button>
            
            <button 
              className="text-gold hover:text-cream transition-colors"
              onClick={nextTrack}
            >
              <i className="ri-skip-forward-fill text-3xl"></i>
            </button>
          </div>
          
          {/* Track List */}
          <div className="track-list bg-brown bg-opacity-40 rounded-lg p-4 max-h-60 overflow-y-auto">
            <h3 className="font-display text-xl mb-4 text-gold">Tracks</h3>
            
            <ul className="space-y-2">
              {album.tracks.map((track, index) => (
                <li 
                  key={track.id}
                  className={`track-item p-2 hover:bg-brown-light rounded transition-colors flex justify-between items-center cursor-pointer ${
                    index === currentTrackIndex ? 'bg-brown-light bg-opacity-50' : ''
                  }`}
                  onClick={() => selectTrack(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="track-number w-6 text-center text-cream text-opacity-60">
                      {track.id}
                    </span>
                    <span className="track-title">{track.title}</span>
                  </div>
                  <span className="track-duration text-cream text-opacity-60">
                    {track.duration}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
