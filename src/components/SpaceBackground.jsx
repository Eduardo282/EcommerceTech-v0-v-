export function SpaceBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b14] via-[#1b2735] to-[#090a0f]" />

      {/* Nebula effects - larger and more dramatic */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/8 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-cyan-500/6 rounded-full mix-blend-screen filter blur-[120px] opacity-60 animate-blob animation-delay-4000" />
      <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-yellow-500/5 rounded-full mix-blend-screen filter blur-[80px] opacity-50 animate-blob" />

      {/* Milky Way effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -rotate-45 blur-xl" />
      </div>

      {/* Stars Layer 1 - Tiny distant stars (atmosphere) */}
      <div className="stars-small absolute inset-0" />

      {/* Stars Layer 2 - Medium stars */}
      <div className="stars-medium absolute inset-0" />

      {/* Stars Layer 3 - Bright prominent stars */}
      <div className="stars-large absolute inset-0" />

      {/* Extra bright focal stars */}
      <div
        className="absolute top-[20%] right-[30%] w-3 h-3 bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
        style={{ animation: "twinkle 3s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[60%] left-[20%] w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_15px_4px_rgba(14,165,233,0.7)]"
        style={{ animation: "twinkle 4s ease-in-out infinite 1s" }}
      />
      <div
        className="absolute top-[40%] right-[60%] w-2 h-2 bg-yellow-200 rounded-full shadow-[0_0_15px_4px_rgba(245,158,11,0.6)]"
        style={{ animation: "twinkle 5s ease-in-out infinite 2s" }}
      />
      <div
        className="absolute bottom-[30%] right-[50%] w-2 h-2 bg-purple-300 rounded-full shadow-[0_0_15px_4px_rgba(139,92,246,0.6)]"
        style={{ animation: "twinkle 4.5s ease-in-out infinite 0.5s" }}
      />

      {/* Shooting stars */}
      <div className="shooting-star absolute top-[15%] right-[20%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
      <div
        className="shooting-star absolute top-[45%] right-[70%] w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_10px_2px_rgba(14,165,233,0.8)]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="shooting-star absolute top-[70%] right-[40%] w-1 h-1 bg-purple-300 rounded-full shadow-[0_0_10px_2px_rgba(139,92,246,0.8)]"
        style={{ animationDelay: "6s" }}
      />
    </div>
  );
}
