import { Sparkles } from 'lucide-react';

export function EtiquetaCategoria() {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 relative">
      <div className="absolute inset-0 bg-[#F9B61D10] rounded-full backdrop-blur-sm" />
      <Sparkles className="h-4 w-4 text-[#FFFFFF] animate-pulse relative z-10" />
      <span className="text-sm text-[#F9B61D] relative z-10 font-display">Explora Categorías</span>
    </div>
  );
}
