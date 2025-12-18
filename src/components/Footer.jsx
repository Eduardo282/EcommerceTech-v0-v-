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
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getFooterConfig } from '../services/strapi';
import { Logo } from './smallComponents/Logo';
import { Link } from 'react-router-dom';
import { FormFooter } from './smallComponents/forms/FormFooter';

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
        backgroundColor: 'black',
        boxShadow: '0 0 26px #2c2c30, inset -10px 0 18px #2c2c30',
      }}
    >
      {/* Patrón de cuadrícula */}
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

      {/* Líneas horizontales */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              #F9B61D30 100px,
              #F9B61D30 101px
            )
          `,
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Marca */}
          <section className="lg:col-span-2">
            <header className="flex items-center gap-3 mb-4 group cursor-pointer">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                <Logo />

                <div>
                  <span
                    className="text-xl font-display"
                    style={{ color: getColor('logoText1Color', '#fff') }}
                  >
                    {footerConfig?.logoText1 || 'Cargando...'}
                  </span>
                  <span
                    className="text-xl font-display"
                    style={{ color: getColor('logoText2Color', '#fff') }}
                  >
                    {footerConfig?.logoText2 || 'Cargando...'}
                  </span>
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full animate-pulse shadow-lg"
                    style={{
                      boxShadow: '0 0 10px ' + '#F9B61D',
                      background: '#F9B61D',
                    }}
                  />
                  <p
                    className="text-sm font-display"
                    style={{
                      color: getColor('descripcionLogoColor', '#fff'),
                    }}
                  >
                    Calidad en productos digitales
                  </p>
                </div>
              </Link>
            </header>
            <p className="mb-6 max-w-md" style={{ color: getColor('descripcionColor', '#fff') }}>
              Tu mercado único para plantillas de paneles de control, kits de UI, herramientas de
              automatización y productos digitales. <br />
              <span style={{ color: getColor('descripcionLogoColor', '#fff') }}>
                Con la confianza de más de 100 desarrolladores en todo el mundo.
              </span>
            </p>

            {/* Información de contacto */}
            <address className="space-y-2 mb-6 not-italic">
              <div className="flex items-center gap-2 transition-colors cursor-pointer">
                <Mail className="h-4 w-4" style={{ color: 'white' }} />
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  support@evohance.com
                </span>
              </div>
              <div className="flex items-center gap-2 transition-colors cursor-pointer">
                <Phone className="h-4 w-4" style={{ color: 'white' }} />
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-2 transition-colors cursor-pointer">
                <MapPin className="h-4 w-4" style={{ color: 'white' }} />
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  Cd. de México, MX
                </span>
              </div>
            </address>

            <nav aria-label="social links" className="flex gap-3">
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: '#111115',
                  boxShadow: '0 0 10px #2c2c30',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 10px #2c2c30';
                }}
              >
                <Facebook className="h-5 w-5 text-[#E4D9AF] group-hover:text-[#0866ff]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: '#111115',
                  boxShadow: '0 0 10px #2c2c30',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 10px #2c2c30';
                }}
              >
                <Twitter className="h-5 w-5 text-[#E4D9AF] group-hover:text-[#39cdff]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: '#111115',
                  boxShadow: '0 0 10px #2c2c30',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 10px #2c2c30';
                }}
              >
                <Instagram className="h-5 w-5 text-[#E4D9AF] group-hover:text-[#c508ca]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: '#111115',
                  boxShadow: '0 0 10px #2c2c30',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 10px #2c2c30';
                }}
              >
                <Github className="h-5 w-5 text-[#E4D9AF] group-hover:text-[#271d2c]" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 border-[#2c2c30] backdrop-blur-sm group"
                style={{
                  background: '#111115',
                  boxShadow: '0 0 10px #2c2c30',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 20px #2c2c30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2c2c30';
                  e.currentTarget.style.boxShadow = '0 0 10px #2c2c30';
                }}
              >
                <Linkedin className="h-5 w-5 text-[#E4D9AF] group-hover:text-[#0a66c2]" />
              </a>
            </nav>
          </section>

          {/* Categorías */}
          <nav aria-label="footer categories">
            <h4
              className="mb-4 flex items-center gap-2 font-display"
              style={{
                color: getColor('titleColor', '#fff'),
              }}
            >
              <Sparkles
                className="h-4 w-4 text-[#E4D9AF]"
                style={{
                  filter: 'drop-shadow(0 0 5px #E4D9AF)',
                }}
              />
              Categorías
            </h4>
            <ul className="space-y-2">
              {(footerConfig?.menuLinks?.categorias || []).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="transition-colors hover:translate-x-1 inline-block"
                    style={{ color: getColor('enlaceColor', '#fff') }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Soporte */}
          <nav aria-label="footer support">
            <h4
              className="mb-4 font-display"
              style={{
                color: getColor('titleColor', '#fff'),
              }}
            >
              Soporte
            </h4>
            <ul className="space-y-2">
              {(footerConfig?.menuLinks?.soporte || []).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="transition-colors hover:translate-x-1 inline-block"
                    style={{ color: getColor('enlaceColor', '#fff') }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Compañía */}
          <nav aria-label="footer company">
            <h4
              className="mb-4 font-display"
              style={{
                color: getColor('titleColor', '#fff'),
              }}
            >
              Compañía
            </h4>
            <ul className="space-y-2">
              {(footerConfig?.menuLinks?.compania || []).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="transition-colors hover:translate-x-1 inline-block"
                    style={{ color: getColor('enlaceColor', '#fff') }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Noticias */}
        <section
          className="rounded-2xl p-8 mb-12 backdrop-blur-xl"
          style={{
            backgroundColor: getColor('fondoFormColor', '#fff'),
          }}
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3
                className="text-2xl mb-2 font-display"
                style={{
                  color: getColor('titleFormColor', '#fff'),
                }}
              >
                Mantente actualizado
              </h3>
              <p style={{ color: getColor('descripcionFormColor', '#fff') }}>
                Suscríbete a nuestro boletín para recibir los últimos productos y ofertas
                exclusivas.
              </p>
            </div>
            <FormFooter />
          </div>
        </section>

        {/* Barra inferior */}
        <section className="pt-8 border-t-2 border-[#2c2c30]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm" style={{ color: getColor('derechosAutorColor', '#fff') }}>
              © 2025 EvoHance.
            </p>
            <nav aria-label="legal">
              <ul
                className="flex gap-6 text-sm"
                style={{ color: getColor('enlacePoliticasColor', '#fff') }}
              >
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                    onMouseEnter={(e) =>
                      (e.target.style.color = getColor('hoverEnlacePoliticasColor', '#fff'))
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = getColor('enlacePoliticasColor', '#fff'))
                    }
                    style={{ color: getColor('enlacePoliticasColor', '#fff') }}
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors"
                    onMouseEnter={(e) =>
                      (e.target.style.color = getColor('hoverEnlacePoliticasColor', '#fff'))
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = getColor('enlacePoliticasColor', '#fff'))
                    }
                    style={{ color: getColor('enlacePoliticasColor', '#fff') }}
                  >
                    Términos de Servicio
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
