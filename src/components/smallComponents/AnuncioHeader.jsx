import { Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';

export function AnuncioHeader({ headerConfig, getColor }) {
  const isActive = headerConfig?.mostrarAnuncio ?? true;
  if (!isActive) return null;

  const now = new Date();
  const start = headerConfig?.fechaInicioAnuncio ? new Date(headerConfig.fechaInicioAnuncio) : null;
  const end = headerConfig?.fechaFinAnuncio ? new Date(headerConfig.fechaFinAnuncio) : null;

  if (start && now < start) return null;
  if (end && now > end) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: getColor('fondoAnuncioColor', '#fff'),
      }}
      aria-label="site announcement"
    >
      <div className="absolute inset-0 animate-shimmer"></div>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm relative z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <Sparkles
              className="h-4 w-4 animate-pulse text-[#F9B61D]"
              style={{
                filter: 'drop-shadow(0 0 5px #F9B61D)',
              }}
            />
            <span
              style={{
                color: getColor('titleAnuncioColor', '#fff'),
              }}
            >
              {headerConfig?.titleAnuncio || 'Cargando...'}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="transition-colors cursor-pointer"
            style={{ color: getColor('enlacesAnuncioColor', '#fff') }}
          >
            Ayuda & Soporte
          </button>
          <button
            className="transition-colors cursor-pointer"
            style={{ color: getColor('enlacesAnuncioColor', '#fff') }}
          >
            Rastrear Pedido
          </button>
        </div>
      </div>
    </section>
  );
}

AnuncioHeader.propTypes = {
  headerConfig: PropTypes.shape({
    mostrarAnuncio: PropTypes.bool,
    fechaInicioAnuncio: PropTypes.string,
    fechaFinAnuncio: PropTypes.string,
    titleAnuncio: PropTypes.string,
    fondoAnuncioColor: PropTypes.string,
    titleAnuncioColor: PropTypes.string,
    enlacesAnuncioColor: PropTypes.string,
  }),
  getColor: PropTypes.func,
};
