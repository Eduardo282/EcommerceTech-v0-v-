import { Link } from 'react-router-dom';

export function PoliticaPrivacidadPage() {
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
        <h1 className="mb-8 text-5xl font-display">Política de Privacidad</h1>
        <div className="space-y-8 rounded-3xl border border-white/10 bg-[#111115] p-8 text-sm leading-7 text-gray-300">
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Datos que recopilamos</h2>
            <p>
              Recopilamos información de cuenta, compra y contacto necesaria para operar la
              plataforma, entregar productos y responder soporte.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Uso de la información</h2>
            <p>
              Usamos tus datos para procesar pedidos, validar accesos, enviar comunicaciones
              relevantes y mejorar la experiencia del servicio.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-bold text-white">Protección</h2>
            <p>
              Aplicamos medidas razonables de seguridad para resguardar tu información y limitar
              accesos no autorizados.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
