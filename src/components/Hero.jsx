import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden py-24 min-h-[620px]"
      style={{
        backgroundColor: "black",
      }}>
      {/* Animated Background Orbs */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#2c2c3050] rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"
      />

      {/* Horizontal Neon Lines Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 26px,
            rgba(234,179,8,0.28) 26px,
            rgba(234,179,8,0.28) 27px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Vertical Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9InJnYmEoMjM0LDE3OSw4LDAuMTUpIiBzdHJva2Utb3BhY2l0eT0iLjE1Ij48cGF0aCBkPSJNMCAxMEg2MCIvPjxwYXRoIGQ9Ik0xMCAwVjYwIi8+PC9nPjwvc3ZnPg==')",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <header className="space-y-12">
            {/* Neon Border Box with Lines */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-linear-to-b from-[#2c2c30] via-[#2c2c30] to-transparent" />
              <div className="absolute -left-8 top-0 w-8 h-px bg-linear-to-r from-[#2c2c30] to-transparent" />

              <div className="space-y-10">
                <h1 className="text-[58px] leading-[1.1] font-display tracking-wider uppercase">
                  <span className="block drop-shadow-gold text-white">Evo</span>
                  <span className="block mt-4 text-7xl gold-text">Hance</span>
                </h1>

                <button
                  className="bg-[#2c2c30] text-amber-100 cursor-pointer px-10 py-5 text-base rounded-xl backdrop-blur-xl group transition-all inline-flex items-center justify-center gap-2 font-medium tracking-wide"
                  style={{
                    boxShadow: "0 0 20px #2c2c30",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px #2c2c30";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 20px #2c2c30";
                  }}>
                  Vende tus productos (Próximamente)
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform text-amber-300" />
                </button>
              </div>
            </div>

            {/* Description */}
            <section className="relative max-w-md">
              <p className="text-amber-200/80 leading-relaxed max-w-md text-sm">
                Mercado de activos digitales, diseño y Herramientas de la mejor
                calidad para creadores y profesionales que buscan destacar en el
                mundo digital.
              </p>
            </section>
          </header>

          {/* Right Content - 3D Isometric Elements */}
          <aside
            aria-hidden="true"
            className="relative h-[500px] animate-float">
            {/* Main 3D Frame Structure */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px]">
              {/* Isometric Grid Frame */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 48%, rgba(234,179,8,0.25) 48%, rgba(234,179,8,0.25) 52%, transparent 52%)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Central Display Panel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 perspective-1000">
                <div
                  className="relative w-full h-full transform rotate-y-12 rotate-x-6"
                  style={{ transformStyle: "preserve-3d" }}>
                  {/* Panel Frame */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#15130c]/80 via-[#1d1a10]/75 to-[#090a0f]/80 rounded-2xl border-2 border-amber-400/30 shadow-2xl shadow-amber-500/20 backdrop-blur-xl overflow-hidden">
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(234,179,8,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.15) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Content placeholder */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-linear-to-br from-amber-200/30 to-yellow-300/20 rounded-full blur-xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-amber-100 rounded-full opacity-90 shadow-2xl shadow-amber-200/40 animate-pulse" />
                  </div>

                  {/* 3D depth effect - top */}
                  <div className="absolute -top-3 left-2 right-2 h-3 bg-linear-to-r from-amber-500 to-amber-700 transform skew-y-[-20deg] opacity-60 rounded-t-lg" />

                  {/* 3D depth effect - side */}
                  <div className="absolute top-2 -right-3 bottom-2 w-3 bg-linear-to-b from-amber-700 to-amber-800 transform skew-x-[-20deg] opacity-50 rounded-r-lg" />
                </div>
              </div>

              {/* Floating Isometric Elements */}
              {/* Top Right Cube */}
              <div className="absolute -top-8 right-12 w-20 h-20 animate-float animation-delay-1000">
                <div className="relative w-full h-full perspective-1000">
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500 to-amber-700 transform rotate-45 rounded-lg border-2 border-amber-300/30 shadow-lg shadow-amber-500/30" />
                </div>
              </div>

              {/* Bottom Left Icon */}
              <div className="absolute -bottom-12 left-16 w-24 h-24 animate-float animation-delay-2000">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-linear-to-br from-[#1d1a10]/80 to-[#0f0e09]/80 rounded-2xl border-2 border-amber-400/40 shadow-xl shadow-amber-500/30 backdrop-blur-sm transform rotate-12">
                    <div className="absolute inset-2 bg-linear-to-br from-amber-400 to-yellow-600 rounded-lg" />
                  </div>
                  {/* 3D effect */}
                  <div className="absolute -bottom-2 left-1 right-1 h-2 bg-amber-900/60 transform skew-y-[-15deg] rounded-b-lg blur-sm" />
                </div>
              </div>

              {/* Right Floating Element */}
              <div className="absolute top-20 -right-8 w-16 h-16 animate-float animation-delay-3000">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-linear-to-br from-amber-400/80 to-amber-600/80 rounded-full border-2 border-amber-300/40 shadow-lg shadow-amber-500/40" />
                </div>
              </div>

              {/* Brain/Pattern Element - bottom */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-20 animate-float animation-delay-4000">
                <div className="relative w-full h-full perspective-1000">
                  <div className="absolute inset-0 bg-linear-to-br from-[#1d1a10]/70 to-[#090a0f]/70 rounded-2xl border-2 border-amber-400/30 shadow-xl shadow-amber-500/20 backdrop-blur-sm overflow-hidden">
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 40%, rgba(234,179,8,0.35) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(245,158,11,0.35) 0%, transparent 55%)",
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
                  filter: "drop-shadow(0 0 2px rgba(234, 179, 8, 0.4))",
                }}>
                <line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="20%"
                  stroke="rgba(234, 179, 8, 0.28)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="80%"
                  stroke="rgba(234, 179, 8, 0.28)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1="50%"
                  y1="50%"
                  x2="90%"
                  y2="60%"
                  stroke="rgba(234, 179, 8, 0.28)"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              </svg>
            </div>
          </aside>
        </section>
      </div>
    </section>
  );
}
