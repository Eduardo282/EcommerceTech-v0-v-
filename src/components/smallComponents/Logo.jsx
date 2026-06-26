import { useId } from 'react';

export function Logo() {
  const id = useId().replace(/:/g, '');
  const shellGradientId = `${id}-logo-shell`;
  const panelGradientId = `${id}-logo-panel`;
  const glowFilterId = `${id}-logo-glow`;

  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <div className="absolute inset-2 rounded-2xl bg-[#F9B61D]/10 blur-md transition-all duration-300 group-hover:bg-[#F9B61D]/18" />

      <svg
        aria-hidden="true"
        className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-105"
        fill="none"
        viewBox="0 0 56 56"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={shellGradientId} x1="9" x2="47" y1="6" y2="50">
            <stop stopColor="#FFE08A" />
            <stop offset="0.45" stopColor="#F9B61D" />
            <stop offset="1" stopColor="#8A5A05" />
          </linearGradient>
          <linearGradient id={panelGradientId} x1="16" x2="40" y1="16" y2="42">
            <stop stopColor="#15151A" />
            <stop offset="1" stopColor="#050506" />
          </linearGradient>
          <filter id={glowFilterId} x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="0" floodColor="#F9B61D" floodOpacity="0.42" stdDeviation="2" />
          </filter>
        </defs>

        <rect
          fill={`url(#${panelGradientId})`}
          filter={`url(#${glowFilterId})`}
          height="40"
          rx="12"
          stroke={`url(#${shellGradientId})`}
          strokeWidth="1.15"
          width="40"
          x="8"
          y="8"
        />
        <rect
          fill="none"
          height="32"
          rx="10"
          stroke="#E4D9AF"
          strokeOpacity="0.1"
          strokeWidth="0.35"
          width="32"
          x="12"
          y="12"
        />

        <path
          d="M21 25V23c0-3.9 3.1-7 7-7s7 3.1 7 7v2"
          stroke="#F9B61D"
          strokeLinecap="round"
          strokeWidth="0.95"
        />
        <path
          d="M20.5 25.5h15L34.8 38H21.2l-.7-12.5Z"
          fill="#0B0B10"
          stroke="#E4D9AF"
          strokeLinejoin="round"
          strokeOpacity="0.68"
          strokeWidth="0.7"
        />
        <path d="M25 31h6M25 34.5h4" stroke="#F9B61D" strokeLinecap="round" strokeWidth="0.8" />
        <path d="M39 13l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill="#E4D9AF" opacity="0.95" />
      </svg>
    </div>
  );
}
