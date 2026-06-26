import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import PropTypes from 'prop-types';
import { useCmsConfig } from '../context/useCmsConfig';
import { getThemeColor } from '../lib/themeColors';
import { Logo } from './smallComponents/Logo';
import { Link } from 'react-router-dom';
import { FormFooter } from './smallComponents/forms/FormFooter';

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com',
    hoverClass: 'group-hover:text-[#0866ff]',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    label: 'Facebook',
  },
  {
    href: 'https://x.com',
    hoverClass: 'group-hover:text-[#39cdff]',
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
    label: 'X',
  },
  {
    href: 'https://www.instagram.com',
    hoverClass: 'group-hover:text-[#c508ca]',
    icon: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
    label: 'Instagram',
  },
  {
    href: 'https://github.com',
    hoverClass: 'group-hover:text-[#f0f6fc]',
    icon: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com',
    hoverClass: 'group-hover:text-[#0a66c2]',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    label: 'LinkedIn',
  },
];

const DEFAULT_FOOTER_LINKS = {
  categorias: [
    { label: 'Plantillas dashboard', href: '/plantillas-dashboard' },
    { label: 'Plantillas Auth', href: '/plantillas-auth' },
    { label: 'Componentes de UI/UX', href: '/componentes-ui-ux' },
    { label: 'Libros de programación', href: '/libros-programacion' },
    { label: 'Guías de estudio', href: '/guias-estudio' },
    { label: 'Controladores', href: '/controladores' },
  ],
  soporte: [
    { label: 'Centro de ayuda', href: '/centro-de-ayuda' },
    { label: 'Documentación', href: '/documentacion' },
    { label: 'Referencia API', href: '/referencia-api' },
    { label: 'Comunidad', href: '/comunidad' },
    { label: 'Contáctanos', href: '/contactanos' },
    { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
  ],
  compania: [
    { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { label: 'Blog', href: '/blog' },
    { label: 'Socios', href: '/socios' },
    { label: 'Programa de Afiliados', href: '/programa-afiliados' },
  ],
};

const FOOTER_ROUTE_BY_LABEL = {
  'centro de ayuda': '/centro-de-ayuda',
  documentacion: '/documentacion',
  'referencia api': '/referencia-api',
  comunidad: '/comunidad',
  contactanos: '/contactanos',
  'preguntas frecuentes': '/preguntas-frecuentes',
  'sobre nosotros': '/sobre-nosotros',
  blog: '/blog',
  socios: '/socios',
  'programa de afiliados': '/programa-afiliados',
};

function normalizeLabel(label) {
  return String(label ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizeFooterLinks(links, fallbackLinks) {
  const sourceLinks = Array.isArray(links) && links.length > 0 ? links : fallbackLinks;

  return sourceLinks.map((link) => {
    const label = link.label ?? '';
    const mappedHref = FOOTER_ROUTE_BY_LABEL[normalizeLabel(label)];

    return {
      ...link,
      href: mappedHref || link.href || '#',
      label,
    };
  });
}

function isInternalLink(href) {
  return href.startsWith('/') || href.startsWith('#');
}

export function Footer() {
  const { resolvedTheme } = useTheme();
  const { footerConfig } = useCmsConfig();

  const isDark = resolvedTheme !== 'light';
  const getColor = (key, fallback) => getThemeColor(footerConfig, key, fallback, resolvedTheme);
  const footerIconColor = isDark ? '#ffffff' : '#111827';
  const footerSocialBackground = isDark ? '#111115' : '#f8fafc';
  const footerSocialBorder = isDark ? '#2c2c30' : '#e2e8f0';
  const footerSocialIconColor = isDark ? '#E4D9AF' : '#111827';
  const footerLinks = useMemo(() => {
    const menuLinks = footerConfig?.menuLinks || {};

    return {
      categorias: normalizeFooterLinks(menuLinks.categorias, DEFAULT_FOOTER_LINKS.categorias),
      soporte: normalizeFooterLinks(menuLinks.soporte, DEFAULT_FOOTER_LINKS.soporte),
      compania: normalizeFooterLinks(menuLinks.compania, DEFAULT_FOOTER_LINKS.compania),
    };
  }, [footerConfig]);

  return (
    <footer
      className="relative overflow-hidden bg-background"
      style={{
        boxShadow: isDark
          ? '0 0 26px #2c2c30, inset -10px 0 18px #2c2c30'
          : '0 -8px 26px rgba(15, 23, 42, 0.08)',
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
              <Link to="/" className="flex items-center gap-3 group cursor-pointer text-foreground">
                <Logo />

                <div>
                  <span className="text-xl font-display text-foreground">
                    {footerConfig?.logoText1 || 'Cargando...'}
                  </span>
                  <span className="text-xl font-display text-foreground">
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
              <a
                href="mailto:support@evohance.com"
                className="flex items-center gap-2 transition-opacity hover:opacity-75 cursor-pointer"
              >
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
                  className="h-4 w-4"
                  style={{ color: footerIconColor }}
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  support@evohance.com
                </span>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 transition-opacity hover:opacity-75 cursor-pointer"
              >
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
                  className="h-4 w-4"
                  style={{ color: footerIconColor }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  +1 (555) 123-4567
                </span>
              </a>
              <a
                href="https://maps.google.com/?q=Ciudad+de+Mexico,+Mexico"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-opacity hover:opacity-75 cursor-pointer"
              >
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
                  className="h-4 w-4"
                  style={{ color: footerIconColor }}
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm" style={{ color: getColor('adressColor', '#fff') }}>
                  Cd. de México, MX
                </span>
              </a>
            </address>

            <nav aria-label="social links" className="flex gap-3">
              {SOCIAL_LINKS.map(({ href, hoverClass, icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-lg transition-all hover:scale-110 border-2 backdrop-blur-sm group"
                  style={{
                    background: footerSocialBackground,
                    borderColor: footerSocialBorder,
                    boxShadow: `0 0 10px ${footerSocialBorder}`,
                  }}
                >
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
                    className={`h-5 w-5 ${hoverClass}`}
                    style={{ color: footerSocialIconColor }}
                  >
                    {icon}
                  </svg>
                </a>
              ))}
            </nav>
          </section>

          {/* Categorías */}
          <FooterLinks
            ariaLabel="footer categories"
            getColor={getColor}
            links={footerLinks.categorias}
            showSparkle
            title="Categorías"
          />

          {/* Soporte */}
          <FooterLinks
            ariaLabel="footer support"
            getColor={getColor}
            links={footerLinks.soporte}
            title="Soporte"
          />

          {/* Compañía */}
          <FooterLinks
            ariaLabel="footer company"
            getColor={getColor}
            links={footerLinks.compania}
            title="Compañía"
          />
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
                  <Link
                    to="/politica-privacidad"
                    className="text-[var(--legal-link)] transition-colors hover:text-[var(--legal-link-hover)]"
                    style={{
                      '--legal-link': getColor('enlacePoliticasColor', '#fff'),
                      '--legal-link-hover': getColor('hoverEnlacePoliticasColor', '#fff'),
                    }}
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terminos-servicio"
                    className="text-[var(--legal-link)] transition-colors hover:text-[var(--legal-link-hover)]"
                    style={{
                      '--legal-link': getColor('enlacePoliticasColor', '#fff'),
                      '--legal-link-hover': getColor('hoverEnlacePoliticasColor', '#fff'),
                    }}
                  >
                    Términos de Servicio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}

function FooterLinks({ ariaLabel, getColor, links, showSparkle = false, title }) {
  return (
    <nav aria-label={ariaLabel}>
      <h4
        className="mb-4 flex items-center gap-2 font-display"
        style={{ color: getColor('titleColor', '#fff') }}
      >
        {showSparkle && (
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
            className="h-4 w-4 text-[#E4D9AF]"
            style={{ filter: 'drop-shadow(0 0 5px #E4D9AF)' }}
          >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          </svg>
        )}
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href || link.label}>
            {isInternalLink(link.href) ? (
              <Link
                to={link.href}
                className="transition-colors hover:translate-x-1 inline-block"
                style={{ color: getColor('enlaceColor', '#fff') }}
              >
                {link.label}
              </Link>
            ) : (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:translate-x-1 inline-block"
                style={{ color: getColor('enlaceColor', '#fff') }}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

FooterLinks.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  getColor: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  showSparkle: PropTypes.bool,
  title: PropTypes.string.isRequired,
};
