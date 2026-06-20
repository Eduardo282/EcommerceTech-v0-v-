import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export function RastrearPedidoPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!orderId.trim() || !email.trim()) {
      toast.error('Completa el ID de pedido y el correo');
      return;
    }

    setResult({
      orderId: orderId.trim().toUpperCase(),
      status: 'Procesando',
      updatedAt: 'Hoy, hace unos minutos',
      detail: 'Tu pedido fue localizado y está siendo validado para entrega digital.',
    });
    toast.success('Pedido localizado');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20">
      <div className="fixed inset-0 -z-10 bg-[#0a0a0a]" />
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto max-w-3xl px-4">
        <Link
          to="/ayuda-soporte"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-amber-400 transition-colors hover:border-amber-400/40 hover:bg-white/5"
        >
          <span aria-hidden="true">←</span>
          Volver a Ayuda y Soporte
        </Link>

        <div className="mb-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">Rastrear Pedido</p>
          <h1 className="mb-4 text-5xl font-display">Consulta tu compra</h1>
          <p className="text-lg text-gray-400">
            Ingresa tu ID de pedido y el correo con el que realizaste la compra.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#111115] p-8 shadow-2xl"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm text-gray-300">
              ID de pedido
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ORD-2026-001"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-500"
              />
            </label>
            <label className="text-sm text-gray-300">
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-amber-500"
              />
            </label>
          </div>

          <button className="mt-6 rounded-2xl bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400">
            Consultar estado
          </button>
        </form>

        {result && (
          <div className="mt-8 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">
            <p className="text-sm uppercase tracking-wide text-amber-300">Resultado</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Pedido {result.orderId}</h2>
            <p className="mt-3 text-sm text-gray-300">Estado: {result.status}</p>
            <p className="mt-1 text-sm text-gray-400">Última actualización: {result.updatedAt}</p>
            <p className="mt-4 text-sm text-gray-300">{result.detail}</p>
          </div>
        )}
      </div>
    </div>
  );
}
