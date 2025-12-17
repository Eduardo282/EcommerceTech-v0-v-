import { XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#09090b]">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <XCircle className="w-24 h-24 text-red-500 relative z-10" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600 mb-4">
        Pago Cancelado
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8">
        El proceso de pago ha sido cancelado. No se ha realizado ningún cobro. Si tuviste algún problema, puedes intentarlo de nuevo.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 border border-white/10"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Volver al carrito
        </Link>
      </div>
    </div>
  );
}
