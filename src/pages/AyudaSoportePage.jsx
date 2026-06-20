import { Link } from 'react-router-dom';

export function AyudaSoportePage() {
  const faqs = [
    {
      question: '¿Cómo recibo mi producto?',
      answer:
        'Las descargas digitales se habilitan después de confirmar el pago o iniciar sesión con tu cuenta.',
    },
    {
      question: '¿Qué hago si no veo mi compra?',
      answer:
        'Primero revisa tu correo y luego usa la página de rastreo de pedido para consultar el estado.',
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer:
        'Sí. El soporte cubre acceso, descarga, instalación básica y problemas asociados a la compra.',
    },
  ];

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

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">Ayuda & Soporte</p>
          <h1 className="mb-4 text-5xl font-display">Centro de Asistencia</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Encuentra ayuda rápida para tu cuenta, descargas, compras y acceso a productos
            digitales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-bold text-white">Soporte por correo</h2>
            <p className="mb-4 text-sm text-gray-400">
              Escríbenos para incidencias técnicas, acceso a productos o consultas de compra.
            </p>
            <a href="mailto:support@evohance.com" className="text-amber-400 hover:text-amber-300">
              support@evohance.com
            </a>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-bold text-white">Horario</h2>
            <p className="text-sm text-gray-400">Lunes a viernes</p>
            <p className="text-sm text-gray-400">09:00 a 18:00 (CDMX)</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-3 text-xl font-bold text-white">Acciones rápidas</h2>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/rastrear-pedido" className="text-amber-400 hover:text-amber-300">
                Rastrear un pedido
              </Link>
              <Link to="/politica-privacidad" className="text-amber-400 hover:text-amber-300">
                Revisar política de privacidad
              </Link>
              <Link to="/terminos-servicio" className="text-amber-400 hover:text-amber-300">
                Revisar términos de servicio
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111115] p-8">
          <h2 className="mb-4 text-2xl font-bold text-white">Preguntas frecuentes</h2>
          <div className="divide-y divide-white/10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-3 py-4 text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="text-xl text-amber-400 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-3 pb-4 pr-12 text-sm leading-6 text-gray-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
