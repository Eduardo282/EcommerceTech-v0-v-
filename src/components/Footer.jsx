import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getFooterConfig } from "../services/strapi";

export function Footer() {
  const [footerConfig, setFooterConfig] = useState(null);

  useEffect(() => {
    getFooterConfig().then(setFooterConfig);
  }, []);

  const getColor = (key, fallback) => footerConfig?.[key] || fallback;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "black",
        boxShadow: "0 0 26px #2c2c30, inset -10px 0 18px #2c2c30",
      }}>
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 179, 8, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 179, 8, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Accent Horizontal Lines */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(234, 179, 8, 0.28) 100px,
              rgba(234, 179, 8, 0.28) 101px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <section className="lg:col-span-2">
            <header className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="relative">
                {/* 3D Isometric Box Effect with Cyan */}
                <div className="relative w-12 h-12 perspective-1000">
                  {/* Main cube face */}
                  <div
                    className="absolute inset-0 rounded-lg shadow-lg transform group-hover:scale-110 transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(251, 191, 36, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                      boxShadow: "0 0 20px rgba(234, 179, 8, 0.35)",
                    }}>
                    {/* Grid overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    {/* Glow center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-200 rounded-full opacity-80 blur-sm animate-pulse" />
                  </div>
                  {/* Top face */}
                  <div
                    className="absolute -top-2 left-1 right-1 h-2 transform skew-y-[-30deg] opacity-60 rounded-t"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(251, 191, 36, 0.5) 0%, rgba(245, 158, 11, 0.5) 100%)",
                    }}
                  />
                  {/* Side face */}
                  <div
                    className="absolute top-1 -right-2 bottom-1 w-2 transform skew-x-[-30deg] opacity-40 rounded-r"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(217, 119, 6, 0.55) 0%, rgba(245, 158, 11, 0.55) 100%)",
                    }}
                  />
                </div>
              </div>
              <div>
                <h3
                  className="text-xl font-display"
                  style={{
                    textShadow: "0 0 15px rgba(234, 179, 8, 0.35)",
                    color: getColor("titleLogoColor", "#fef3c7"),
                  }}>
                  EvoHance
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: getColor("descripcionLogoColor", "#fef3c7"),
                  }}>
                  Calidad en productos digitales
                </p>
              </div>
            </header>
            <p className="mb-6 max-w-md" style={{ color: getColor("descripcionColor", "#fef3c7") }}>
              Tu mercado único para plantillas de paneles de control, kits de
              UI, herramientas de automatización y productos digitales. <br />
              <span style={{ color: "#fef3c7" }}>
                Con la confianza de más de 100 desarrolladores en todo el mundo.
              </span>
            </p>

            {/* Contact Info */}
            <address className="space-y-2 mb-6 not-italic">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Mail className="h-4 w-4" style={{ color: getColor("adressColor", "#fef3c7") }} />
                <span className="text-sm" style={{ color: getColor("adressColor", "#fef3c7") }}>support@evohance.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <Phone className="h-4 w-4" style={{ color: getColor("adressColor", "#fef3c7") }} />
                <span className="text-sm" style={{ color: getColor("adressColor", "#fef3c7") }}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MapPin className="h-4 w-4" style={{ color: getColor("adressColor", "#fef3c7") }} />
                <span className="text-sm" style={{ color: getColor("adressColor", "#fef3c7") }}>Cd. de México, MX</span>
              </div>
            </address>

            <nav aria-label="social links" className="flex gap-3">
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px #2c2c30",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2c2c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px #2c2c30";
                }}>
                <Facebook className="h-5 w-5 text-[#f0e4b8] group-hover:text-[#0866ff]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px #2c2c30",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2c2c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px #2c2c30";
                }}>
                <Twitter className="h-5 w-5 text-[#f0e4b8] group-hover:text-[#39cdff]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px #2c2c30",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2c2c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px #2c2c30";
                }}>
                <Instagram className="h-5 w-5 text-[#f0e4b8] group-hover:text-[#c508ca]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px #2c2c30",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2c2c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px #2c2c30";
                }}>
                <Github className="h-5 w-5 text-[#f0e4b8] group-hover:text-[#271d2c]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: "rgba(18, 16, 10, 0.6)",
                  boxShadow: "0 0 10px #2c2c30",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px #2c2c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2c2c30";
                  e.currentTarget.style.boxShadow =
                    "0 0 10px #2c2c30";
                }}>
                <Linkedin className="h-5 w-5 text-[#f0e4b8] group-hover:text-[#0a66c2]" />
              </a>
            </nav>
          </section>

          {/* Categories */}
          <nav aria-label="footer categories">
            <h4
              className="mb-4 flex items-center gap-2 font-display"
              style={{
                color: getColor("titleColor",  "#fef3c7"),
              }}>
              <Sparkles
                className="h-4 w-4 text-amber-400"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(234, 179, 8, 0.6))",
                }}
              />
              Categorías
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Plantillas dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Paneles de administración
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Herramientas de automatización
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Plantillas de CV
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Kits de UI
                </a>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="footer support">
            <h4
              className="mb-4 font-display"
              style={{
                color: getColor("titleColor", "#fef3c7"),
              }}>
              Soporte
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor",   "#fef3c7") }}>
                  Documentación
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Referencia API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Comunidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor",   "#fef3c7") }}>
                  Contáctanos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}> 
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="footer company">
            <h4
              className="mb-4 font-display"
              style={{
                color: getColor("titleColor", "#fef3c7"),
              }}>
              Compañía
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Socios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:translate-x-1 inline-block"
                  style={{ color: getColor("enlaceColor", "#fef3c7") }}>
                  Programa de Afiliados
                </a>
              </li>
            </ul>
          </nav>
        </section>

        {/* Newsletter */}
        <section
          className="rounded-2xl p-8 mb-12 backdrop-blur-xl"
          style={{
            backgroundColor: getColor("fondoFormColor", "black"),
          }}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                className="text-2xl mb-2 font-display"
                style={{
                  color: getColor("titleFormColor", "#fef3c7"),
                }}>
                Mantente actualizado
              </h3>
              <p style={{ color: getColor("descripcionFormColor", "#fef3c7") }}>
                Suscríbete a nuestro boletín para recibir los últimos productos
                y ofertas exclusivas.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3"
              aria-label="footer newsletter">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Introduce tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-xl text-amber-100 placeholder-amber-300/40 focus:outline-none"
                style={{
                  boxShadow: "inset 0 0 10px #2c2c30",
                }}
              />
              <button
                type="submit"
                className="text-white px-6 py-3 rounded-xl transition-all hover:scale-105 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.65) 0%, rgba(245, 158, 11, 0.65) 100%)",
                  textShadow: "0 0 10px rgba(234, 179, 8, 0.5)",
                }}>
                Suscribirse
              </button>
            </form>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="pt-8 border-t-2 border-[#2c2c30]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: getColor("derechosAutorColor", "rgba(253, 230, 138, 0.7)") }}>© 2025 EvoHance.</p>
            <nav aria-label="legal">
              <ul className="flex gap-6 text-sm" style={{ color: getColor("enlacePoliticasColor", "rgba(253, 230, 138, 0.7)") }}>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors">
                    Términos de Servicio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-amber-300 transition-colors">
                    Política de Cookies
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}
