import { useEffect, useState } from 'react';
import { getHeroConfig } from '../services/strapi';
import { VentasButton } from './smallComponents/VentasButton';

export function Hero() {
  const [heroConfig, setHeroConfig] = useState(null);

  useEffect(() => {
    getHeroConfig().then(setHeroConfig);
  }, []);

  const getColor = (key, fallback) => heroConfig?.[key] || fallback;

  return (
    <section
      className="relative overflow-hidden py-24 min-h-[620px]"
      style={{
        backgroundColor: getColor('fondoHeroColor', 'black'),
      }}
    >
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
            #F9B61D40 26px,
            #F9B61D40 27px
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
          backgroundSize: '60px 60px',
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
                <h1 className="text-[48px] leading-[1.1] font-display">
                  <span className="block" style={{ color: getColor('titleHeroColor', '#fef3c7') }}>
                    {heroConfig?.titleHero || 'Cargando...'}
                  </span>
                  <span
                    className="block mt-4 text-[48px]"
                    style={{ color: getColor('titleHeroColor2', '#fef3c7') }}
                  >
                    {heroConfig?.titleHero2 || 'Cargando...'}
                  </span>
                </h1>

                <VentasButton />
              </div>
            </div>

            {/* Description */}
            <section className="relative max-w-md">
              <p
                className="leading-relaxed max-w-md text-sm"
                style={{ color: getColor('descripcionHeroColor', '#fef3c7') }}
              >
                {heroConfig?.descripcionHero || 'Cargando...'}
              </p>
            </section>
          </header>

          {/* Right Content - Professional Tech Image */}
          <aside className="relative h-[500px] flex items-center justify-center perspective-1000">
            <div className="relative w-[450px] h-[450px] animate-float">
              {/* Main Image Container */}
              <div className="relative w-full h-full group perspective-1000">
                <div className="absolute inset-0 bg-[#2c2c30] blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                {/* Tech Image */}
                <img
                  src="/assets/hero-box.png"
                  alt="EvoHance Digital Assets"
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </section>
  );
}
