import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#09090b]">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
        <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
        ¡Pago Exitoso!
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-8">
        Gracias por tu compra. Hemos recibido tu pago correctamente y estamos procesando tu pedido.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-200 shadow-lg shadow-green-900/20"
        >
          Volver a la tienda
        </Link>
        <Link
          to="/mis-pedidos" // Asumiendo que esto exista o solo ir por ahora
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gray-300 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200"
        >
          Ver mis pedidos <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
