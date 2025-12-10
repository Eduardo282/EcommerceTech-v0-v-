import { useEffect, useState } from 'react';
import { getTrustBannerConfig } from '../services/strapi';
import { features } from '../data/trustBanner';

export function TrustBanner() {
  const [trustBannerConfig, setTrustBannerConfig] = useState(null);

  useEffect(() => {
    getTrustBannerConfig().then(setTrustBannerConfig);
  }, []);

  const getColor = (key, fallback) => trustBannerConfig?.[key] || fallback;

  const featuresTrust = trustBannerConfig?.features || features;

  return (
    <section
      className="py-12 relative z-0 overflow-hidden"
      style={{
        backgroundColor: 'black',
      }}
    >
      {/* Soft grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F9B61D20 1px, transparent 1px),
            linear-gradient(to bottom, #F9B61D20 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
        }}
      />
      <style>{`
        @keyframes scroll-left-to-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll-left-to-right 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-4 overflow-hidden relative">
        <div className="animate-scroll">
          {[...featuresTrust, ...featuresTrust].map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 px-4 text-center group hover:cursor-pointer"
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <feature.icon className="h-7 w-7" />
              </div>
              <h3
                className="text-sm mb-1 font-display"
                style={{
                  color: getColor('titleConfianzaColor', '#fef3c7'),
                }}
              >
                {feature.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: getColor('descripcionConfianzaColor', '#fde68a') }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
