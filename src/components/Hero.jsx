import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0b14] via-[#1a1a2e] to-[#0f1423] py-20 min-h-[600px]">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

      {/* Horizontal Neon Lines Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 20px,
            rgba(139, 92, 246, 0.3) 20px,
            rgba(139, 92, 246, 0.3) 21px
          )`,
        }}
      />

      {/* Vertical Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMzksOTIsMjQ2LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Neon Border Box with Lines */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-400 to-transparent" />
              <div className="absolute -left-8 top-0 w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />

              <div className="space-y-6">
                <h1
                  className="text-7xl tracking-tight leading-tight uppercase"
                  style={{
                    textShadow:
                      "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
                  }}>
                  <span className="block text-white">Virtual</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
                    Marketplace
                  </span>
                </h1>

                <Button className="glass-light border-2 border-purple-500/30 text-white hover:bg-purple-500/10 px-8 py-6 text-lg rounded-xl backdrop-blur-xl group transition-all hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20">
                  <span className="flex items-center gap-2">
                    Explore Now (Coming Soon)
                    <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="relative max-w-md">
              <p className="text-gray-300 leading-relaxed text-sm">
                A virtual marketplace to allow the users to trade and stake our
                $CMETA token and their NFTs. Negotiate with the digital avatars
                of other users to sell your NFTs at the best prices and generate
                passive income while playing.
              </p>

              {/* Decorative Star */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white to-transparent" />
                <div className="absolute w-6 h-6 bg-white rounded-full opacity-80 blur-sm animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Content - 3D Isometric Elements */}
          <div className="relative h-[500px] animate-float">
            {/* Main 3D Frame Structure */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
              {/* Isometric Grid Frame */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 48%, rgba(139, 92, 246, 0.3) 48%, rgba(139, 92, 246, 0.3) 52%, transparent 52%)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Central Display Panel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 perspective-1000">
                <div
                  className="relative w-full h-full transform rotate-y-12 rotate-x-6"
                  style={{ transformStyle: "preserve-3d" }}>
                  {/* Panel Frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/80 to-blue-900/80 rounded-2xl border-2 border-purple-400/40 shadow-2xl shadow-purple-500/30 backdrop-blur-xl overflow-hidden">
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Content placeholder */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-white/20 to-purple-300/20 rounded-full blur-xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full opacity-90 shadow-2xl shadow-white/50 animate-pulse" />
                  </div>

                  {/* 3D depth effect - top */}
                  <div className="absolute -top-3 left-2 right-2 h-3 bg-gradient-to-r from-purple-600 to-blue-600 transform skew-y-[-20deg] opacity-60 rounded-t-lg" />

                  {/* 3D depth effect - side */}
                  <div className="absolute top-2 -right-3 bottom-2 w-3 bg-gradient-to-b from-purple-800 to-blue-900 transform skew-x-[-20deg] opacity-50 rounded-r-lg" />
                </div>
              </div>

              {/* Floating Isometric Elements */}
              {/* Top Right Cube */}
              <div className="absolute -top-8 right-12 w-20 h-20 animate-float animation-delay-1000">
                <div className="relative w-full h-full perspective-1000">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 transform rotate-45 rounded-lg border-2 border-purple-300/30 shadow-lg shadow-purple-500/40" />
                </div>
              </div>

              {/* Bottom Left Icon */}
              <div className="absolute -bottom-12 left-16 w-24 h-24 animate-float animation-delay-2000">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80 rounded-2xl border-2 border-blue-400/40 shadow-xl shadow-blue-500/30 backdrop-blur-sm transform rotate-12">
                    <div className="absolute inset-2 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg" />
                  </div>
                  {/* 3D effect */}
                  <div className="absolute -bottom-2 left-1 right-1 h-2 bg-purple-900/60 transform skew-y-[-15deg] rounded-b-lg blur-sm" />
                </div>
              </div>

              {/* Right Floating Element */}
              <div className="absolute top-20 -right-8 w-16 h-16 animate-float animation-delay-3000">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/80 to-orange-500/80 rounded-full border-2 border-yellow-300/40 shadow-lg shadow-yellow-500/40" />
                </div>
              </div>

              {/* Brain/Pattern Element - bottom */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-20 animate-float animation-delay-4000">
                <div className="relative w-full h-full perspective-1000">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-purple-800/60 rounded-2xl border-2 border-blue-400/30 shadow-xl shadow-blue-500/20 backdrop-blur-sm overflow-hidden">
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 40%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                      }}
                    />
                  </div>
                  {/* Shadow */}
                  <div className="absolute -bottom-1 left-2 right-2 h-1 bg-black/40 blur-sm rounded-full" />
                </div>
              </div>

              {/* Connecting Lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(139, 92, 246, 0.5))",
                }}>
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="20%"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="80%"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="90%"
                  y2="60%"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
