import { Sparkles } from 'lucide-react';

export function VentasButton() {
  return (
    <button
      className="bg-[#2c2c30] text-white cursor-pointer px-10 py-5 text-base rounded-xl backdrop-blur-xl group transition-all inline-flex items-center justify-center gap-2 font-medium tracking-wide"
      style={{
        boxShadow: '0 0 20px #2c2c30',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 30px #2c2c30';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
      }}
    >
      Vende tus productos (Próximamente)
      <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform text-[#F9B61D]" />
    </button>
  );
}
