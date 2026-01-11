import { Link } from 'react-router-dom';

export function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[#09090b]">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
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
          className="w-24 h-24 text-green-500 relative z-10"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
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
          Ver mis pedidos
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
            className="ml-2 w-4 h-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
