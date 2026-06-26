import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import PropTypes from 'prop-types';
import { getHeroConfig } from '../services/strapi';
import { getThemeColor } from '../lib/themeColors';
import { VentasButton } from './smallComponents/VentasButton';
import { FeaturedProducts } from './FeaturedProducts';

export function Hero({
  trendingProducts,
  featuredProductsConfig,
  onAddToCart,
  onToggleWishlist,
  onViewProduct,
  wishlistItems,
  onVentasClick,
}) {
  const { resolvedTheme } = useTheme();
  const [heroConfig, setHeroConfig] = useState(null);
  const [showTrending, setShowTrending] = useState(false);
  const [showMascot, setShowMascot] = useState(false);

  useEffect(() => {
    getHeroConfig().then(setHeroConfig);
    const timer = setTimeout(() => {
      setShowMascot(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getColor = (key, fallback) => getThemeColor(heroConfig, key, fallback, resolvedTheme);

  return (
    <section
      className="relative overflow-hidden py-24 min-h-[620px] bg-background dark:bg-[var(--hero-bg-fallback,transparent)]"
      style={{
        '--hero-bg-fallback': getColor('fondoHeroColor', '#fff'),
      }}
    >
      {/* Orbes de fondo animados - Solo visibles en dark mode o como efecto sutil */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#2c2c3050] dark:bg-[#2c2c3050]  rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"
      />

      {/* Líneas horizontales de neón - Conditional color */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 26px,
            var(--hero-lines, #F9B61D40) 26px,
            var(--hero-lines, #F9B61D40) 27px
          )`,
          '--hero-lines': '#F9B61D40', // Keep original for dark.
        }}
        aria-hidden="true"
      />

      {/* Grid vertical - Dark mode mainly */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 dark:opacity-5"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9InJnYmEoMjM0LDE3OSw4LDAuMTUpIiBzdHJva2Utb3BhY2l0eT0iLjE1Ij48cGF0aCBkPSJNMCAxMEg2MCIvPjxwYXRoIGQ9Ik0xMCAwVjYwIi8+PC9nPjwvc3ZnPg==')",
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierdo */}
          <header className="space-y-12">
            {/* Caja de líneas de neón */}
            <div className="relative">
              <div className="absolute -left-8 top-0 bottom-0 w-1 bg-linear-to-b from-border via-border to-transparent" />
              <div className="absolute -left-8 top-0 w-8 h-px bg-linear-to-r from-border to-transparent" />

              <div className="space-y-10">
                <h1 className="text-[48px] leading-[1.1] font-display">
                  <span
                    className="block text-foreground dark:text-[var(--hero-title,#fff)]"
                    style={{ '--hero-title': getColor('titleHeroColor', '#fff') }}
                  >
                    {heroConfig?.titleHero || 'Cargando...'}
                  </span>
                  <span
                    className="block mt-4 text-[48px] text-foreground dark:text-[var(--hero-title-2,#fff)]"
                    style={{ '--hero-title-2': getColor('titleHeroColor2', '#fff') }}
                  >
                    {heroConfig?.titleHero2 || 'Cargando...'}
                  </span>
                </h1>

                <VentasButton onClick={onVentasClick} />
              </div>
            </div>

            {/* Descripción */}
            <section className="relative max-w-md">
              <p
                className="leading-relaxed max-w-md text-sm text-muted-foreground dark:text-[var(--hero-desc,#fff)]"
                style={{ '--hero-desc': getColor('descripcionHeroColor', '#fff') }}
              >
                {heroConfig?.descripcionHero || 'Cargando...'}
              </p>
            </section>

            {/* Mascot Character & Button Wrapper */}
            <div
              className={`mt-12 relative z-30 transition-all duration-1000 ease-out flex flex-col items-center w-fit ${
                showMascot ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[200px]'
              }`}
            >
              {/* Mascot */}
              <div className="relative z-10 animate-float translate-x-[45px]">
                <svg
                  width="108"
                  height="108"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-[0_0_24px_rgba(249,182,29,0.28)]"
                >
                  <title>EvoHance mascot</title>
                  <defs>
                    <linearGradient id="mascotShell" x1="30" y1="36" x2="72" y2="78">
                      <stop stopColor="#F9B61D" />
                      <stop offset="1" stopColor="#8A5A05" />
                    </linearGradient>
                    <linearGradient id="mascotScreen" x1="35" y1="44" x2="65" y2="71">
                      <stop stopColor="#17171b" />
                      <stop offset="1" stopColor="#050505" />
                    </linearGradient>
                    <filter id="mascotGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="3"
                        floodColor="#F9B61D"
                        floodOpacity="0.45"
                      />
                    </filter>
                  </defs>
                  {/* Back glow */}
                  <circle cx="50" cy="58" r="31" fill="#F9B61D" opacity="0.08" />
                  {/* Body */}
                  <rect
                    x="30"
                    y="40"
                    width="40"
                    height="35"
                    rx="10"
                    fill="url(#mascotShell)"
                    stroke="#E4D9AF"
                    strokeOpacity="0.65"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="35"
                    y="45"
                    width="30"
                    height="25"
                    rx="7"
                    fill="url(#mascotScreen)"
                    stroke="#F9B61D"
                    strokeOpacity="0.35"
                  />
                  {/* Eyes */}
                  <circle
                    cx="42"
                    cy="55"
                    r="3"
                    fill="#F9B61D"
                    filter="url(#mascotGlow)"
                    className="animate-blink"
                  />
                  <circle
                    cx="58"
                    cy="55"
                    r="3"
                    fill="#F9B61D"
                    filter="url(#mascotGlow)"
                    className="animate-blink"
                  />
                  {/* Mouth */}
                  <rect x="43" y="62" width="14" height="2" rx="1" fill="#E4D9AF" opacity="0.9" />
                  {/* Head Antenna */}
                  <line
                    x1="50"
                    y1="40"
                    x2="50"
                    y2="25"
                    stroke="#E4D9AF"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="22"
                    r="4"
                    fill="#F9B61D"
                    opacity="0.45"
                    className="animate-ping"
                  />
                  <circle cx="50" cy="22" r="4" fill="#F9B61D" />
                  <circle cx="72" cy="33" r="6" fill="#8A2F2F" opacity="0.65" />
                  {/* Arms holding the button - Adjusted to look like holding from top */}
                  <path
                    d="M30 60 Q 15 65, 20 90"
                    stroke="#F9B61D"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M70 60 Q 85 65, 80 90"
                    stroke="#F9B61D"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Hand Paws */}
                  <circle cx="20" cy="92" r="6" fill="#F9B61D" />
                  <circle cx="80" cy="92" r="6" fill="#F9B61D" />
                  {/* Subtle boosters */}
                  <path
                    d="M41 84 L38 94 L44 94 Z"
                    fill="#E4D9AF"
                    opacity="0.8"
                    className="animate-pulse"
                  />
                  <path
                    d="M59 84 L56 94 L62 94 Z"
                    fill="#E4D9AF"
                    opacity="0.8"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Connected Button */}
              <div
                className={`transition-transform duration-500 ${showMascot ? 'translate-y-[-10px]' : ''}`}
              >
                <button
                  onClick={() => setShowTrending(!showTrending)}
                  className="flex items-center gap-3 px-8 py-3 backdrop-blur-xl bg-black/40 text-base font-bold text-white hover:bg-black/60 hover:scale-105 transition-all group/toggle relative z-20"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 duration-1000"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
                  </span>
                  <span className="uppercase tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {showTrending ? 'Volver' : 'Productos en Tendencias'}
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Contenido derecho - Imagen de tecnología profesional */}
          <aside className="relative h-[500px] flex items-center justify-center perspective-1000">
            {/* Mascot Character Removed */}

            <div className="relative w-[1500px] h-[550px] -translate-x-20 -ml-30">
              {/* Contenedor de imagen principal */}
              <div
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
                  showTrending
                    ? 'opacity-0 scale-90 blur-lg pointer-events-none'
                    : 'opacity-100 scale-100 blur-0 animate-float'
                }`}
              >
                <div className="absolute inset-0 bg-[#2c2c30] blur-[100px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                {/* Imagen de tecnología */}
                <img
                  src="/assets/hero-box.png"
                  alt="EvoHance Digital Assets"
                  className="w-[50%] h-[100%] object-contain translate-x-56"
                />
              </div>

              {/* Contenedor de Productos en Tendencia */}
              <div
                className={`w-full absolute inset-0 h-full flex flex-col justify-center transition-all duration-700 ease-in-out transform ${
                  showTrending
                    ? 'opacity-100 scale-100 blur-0 translate-y-0'
                    : 'opacity-0 scale-110 blur-md translate-y-10 pointer-events-none'
                }`}
              >
                <div className="bg-background/50 dark:bg-black/20 backdrop-blur-xl rounded-3xl p-4 h-full shadow-2xl overflow-hidden">
                  <div className="h-full">
                    <FeaturedProducts
                      products={trendingProducts}
                      onAddToCart={onAddToCart}
                      onToggleWishlist={onToggleWishlist}
                      onViewProduct={onViewProduct}
                      wishlistItems={wishlistItems}
                      title="Tendencias"
                      subtitle={featuredProductsConfig?.descripcionTendencias || 'Lo más popular'}
                      config={featuredProductsConfig}
                      embedded={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </section>
  );
}

Hero.propTypes = {
  trendingProducts: PropTypes.array,
  featuredProductsConfig: PropTypes.object,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  onViewProduct: PropTypes.func,
  onVentasClick: PropTypes.func,
  wishlistItems: PropTypes.array,
};
