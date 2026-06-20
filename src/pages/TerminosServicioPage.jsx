import { Link } from 'react-router-dom';

export function TerminosServicioPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          to="/ayuda-soporte"
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-amber-400 transition-colors hover:border-amber-400/40 hover:bg-white/5"
        >
          <span aria-hidden="true">←</span>
          Volver a Ayuda y Soporte
        </Link>

        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">Legal</p>
        <h1 className="mb-8 text-5xl font-display">Términos de Servicio</h1>
        <div className="space-y-8 rounded-3xl border border-white/10 bg-[#111115] p-8 text-sm leading-7 text-gray-300">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Uso permitido</h2>
            <p>
              Los productos digitales y contenidos adquiridos están sujetos a la licencia indicada
              en cada ficha y no pueden redistribuirse sin autorización.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Compras y entregas</h2>
            <p>
              Las entregas digitales se habilitan tras la confirmación del pago. El acceso puede
              depender del estado de la cuenta o verificación de compra.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Soporte y limitaciones</h2>
            <p>
              El soporte cubre incidencias razonables asociadas al producto adquirido. No incluye
              personalización a medida salvo que se indique expresamente.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
