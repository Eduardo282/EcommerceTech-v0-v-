import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { getNewsletterConfig } from "../services/strapi";

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
        backgroundColor: "black",
      }}>
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Diagonal Accent Lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 80px,
              rgba(234, 179, 8, 0.38) 80px,
              rgba(234, 179, 8, 0.38) 81px
            )
          `,
        }}
      />

      {/* Animated Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            style={{
              background: "rgba(234, 179, 8, 0.1)",
              boxShadow: "0 0 20px rgba(234, 179, 8, 0.18)",
            }}>
            <Mail
              className="h-4 w-4 text-amber-300"
              style={{
                filter: "drop-shadow(0 0 5px rgba(234, 179, 8, 0.5))",
              }}
            />
            <span className="text-sm text-amber-200 font-display">
              Únete a nuestro boletín
            </span>
          </div>

          <h2
            className="text-5xl mb-6 font-display"
            style={{
              textShadow: "0 0 38px rgba(234, 179, 8, 0.28)",
              color: getColor("titleColor", "#fef3c7"),
            }}>
            Obtén ofertas exclusivas y actualizaciones
          </h2>

          <p className="text-xl mb-8" style={{ color: getColor("descripcionColor", "#fef3c7") }}>
            Suscríbete para recibir ofertas especiales, recursos gratuitos y
            ofertas únicas en la vida.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            aria-label="newsletter subscription"
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Ingresa tu dirección de correo electrónico"
              required
              className="flex-1 px-6 py-4 rounded-xl border-2 border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 backdrop-blur-xl text-amber-100 placeholder:text-amber-300/40"
              style={{
                background: "rgba(18, 16, 10, 0.6)",
                boxShadow: "inset 0 0 15px rgba(234, 179, 8, 0.1)",
              }}
            />
            <Button
              type="submit"
              className="text-white px-8 py-8 rounded-xl shadow-lg border-2 border-amber-400/50"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251, 191, 36, 0.68) 0%, rgba(245, 158, 11, 0.68) 100%)",
                boxShadow: "0 0 24px rgba(234, 179, 8, 0.32)",
                textShadow: "0 0 10px rgba(234, 179, 8, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 34px rgba(234, 179, 8, 0.46)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(234, 179, 8, 0.32)";
              }}>
              Suscríbete Ahora
            </Button>
          </form>

          <p className="text-sm mt-4" style={{ color: getColor("subtituloColor", "#fef3c7") }}>
            Sin spam, puedes darte de baja en cualquier momento. Respetamos tu
            privacidad.
          </p>
        </div>
      </div>
    </section>
  );
}
