import React, { useState, useRef, useEffect } from 'react';

interface Track {
  title: string;
  url: string;
}

// Configuration:
// We use simple filenames assuming they are in the same directory as index.html
// or served from the root.
const TRACKS: Track[] = [
  { title: 'PPC - ROA & Hades66', url: '1.mp3' },
];

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume] = useState(0.4); 

  useEffect(() => {
    // Pick a random track on mount
    if (TRACKS.length > 0) {
      const randomIndex = Math.floor(Math.random() * TRACKS.length);
      setCurrentTrack(TRACKS[randomIndex]);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            // Auto-play policy or file error
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, volume]);

  const togglePlay = () => {
    // If no track is loaded, don't try to play
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    if (TRACKS.length > 1) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * TRACKS.length);
      } while (TRACKS[nextIndex] === currentTrack);
      
      setCurrentTrack(TRACKS[nextIndex]);
      setIsPlaying(true);
    } else {
      // Loop single track
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  const handleError = () => {
    // Silent fail to avoid console spam if file is missing
    console.warn(`Audio file not found: ${currentTrack?.url}. Please ensure '1.mp3' is in the root folder.`);
    setIsPlaying(false);
  };

  const skipTrack = () => {
     handleEnded();
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-x-3 text-xs font-mono tracking-wide animate-enter" style={{ animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards' }}>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={handleEnded}
        onError={handleError}
      />
      
      <div className="flex items-center gap-x-3 text-[#999] transition-colors duration-300 hover:text-[#ccc]">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="hover:text-white transition-colors focus:outline-none cursor-pointer p-1"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
              <rect x="2" y="1" width="2" height="10" />
              <rect x="8" y="1" width="2" height="10" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
              <path d="M3 1v10l8-5z" />
            </svg>
          )}
        </button>

        {/* Track Info */}
        <div className="flex items-center gap-x-2 select-none group cursor-default">
           <span className="hidden md:inline-block opacity-50">listening to</span>
           <span 
             onClick={skipTrack}
             className="cursor-pointer hover:text-white hover:underline decoration-white/30 underline-offset-4 transition-all"
             title="Click to skip"
           >
             {currentTrack.title.toLowerCase()}
           </span>
        </div>

        {/* Visualizer */}
        {isPlaying && (
          <div className="flex gap-0.5 items-end h-3 ml-1 opacity-80">
            <div className="w-0.5 bg-current animate-[bounce_1s_infinite] h-2"></div>
            <div className="w-0.5 bg-current animate-[bounce_1.2s_infinite] h-3"></div>
            <div className="w-0.5 bg-current animate-[bounce_0.8s_infinite] h-1"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
