import React, { useEffect } from 'react';
import Clock from './components/Clock.tsx';
import SocialLinks from './components/SocialLinks.tsx';
import Background from './components/Background.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';

const App: React.FC = () => {
  // Easter Egg: Change title when user switches tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Connection Lost...';
      } else {
        document.title = 'vanilla.cc';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden font-mono flex items-center justify-center selection:bg-white selection:text-black">
      <Background />

      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 animate-enter opacity-0">
        {/* Main Title - Static with Styled TLD */}
        <h1 className="text-white text-xl md:text-2xl font-semibold tracking-[-0.03em] mb-8 select-none cursor-default drop-shadow-2xl">
          vanilla<span className="text-[#666] font-normal">.cc</span>
        </h1>
        
        {/* Role - Static Text (Encryption Removed) */}
        <span className="text-[#666] text-xs md:text-sm font-medium tracking-wide mb-12 block select-none cursor-default h-5 hover:text-[#888] transition-colors duration-300">
          Anti-Cheat Analyst @ Epic Games
        </span>

        <SocialLinks />
      </main>

      <Clock />
      <MusicPlayer />
    </div>
  );
};

export default App;
