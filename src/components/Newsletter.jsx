import { useEffect, useState } from 'react';
import { getNewsletterConfig } from '../services/strapi';
import { EtiquetaNewsletter } from './smallComponents/etiquetas/EtiquetaNewsletter';
import { FormNewsletter } from './smallComponents/forms/FormNewsletter';

export function Newsletter() {
  const [newsletterConfig, setNewsletterConfig] = useState(null);

  useEffect(() => {
    getNewsletterConfig().then(setNewsletterConfig);
  }, []);

  const getColor = (key, fallback) => newsletterConfig?.[key] || fallback;

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        backgroundColor: 'black',
      }}
    >
      {/* Patrón de cuadrícula de fondo */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F9B61D30 1px, transparent 1px),
            linear-gradient(to bottom, #F9B61D30 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Líneas de neón diagonal */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 80px,
              #F9B61D30 80px,
              #F9B61D30 81px
            )
          `,
        }}
      />

      {/* Brillo animado */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F9B61D20] rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F9B61D20] rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <EtiquetaNewsletter />

          <h2
            className="text-5xl mb-6 font-display"
            style={{
              color: getColor('titleColor', '#fff'),
            }}
          >
            Obtén ofertas exclusivas y actualizaciones
          </h2>

          <p className="text-xl mb-8" style={{ color: getColor('descripcionColor', '#fff') }}>
            Suscríbete para recibir ofertas especiales, recursos gratuitos y ofertas únicas en la
            vida.
          </p>

          <FormNewsletter />

          <p className="text-sm mt-4" style={{ color: getColor('subtituloColor', '#fff') }}>
            Sin spam, puedes darte de baja en cualquier momento. Respetamos tu privacidad.
          </p>
        </div>
      </div>
    </section>
  );
}
