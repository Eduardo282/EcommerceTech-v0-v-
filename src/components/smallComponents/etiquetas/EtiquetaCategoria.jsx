const Sparkles = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M9 3v4" />
    <path d="M7 5h4" />
    <path d="M3 7h4" />
  </svg>
);

export function EtiquetaCategoria() {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 relative">
      <div className="absolute inset-0 bg-[#F9B61D10] rounded-full backdrop-blur-sm" />
      <Sparkles className="h-4 w-4 text-[#FFFFFF] animate-pulse relative z-10" />
      <span className="text-sm text-[#F9B61D] relative z-10 font-display">Explora Categorías</span>
    </div>
  );
}
