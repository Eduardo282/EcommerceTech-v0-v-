import { useState, useCallback } from 'react';
import { useRubro } from '../context/useRubro';
import { RUBROS } from '../context/rubroConstants';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import PropTypes from 'prop-types';

export function RubroSelector({ titleColor }) {
  const { rubro, setRubro, isSeller } = useRubro();
  const [open, setOpen] = useState(false);
  const { data } = useQuery(GET_ME);
  const authed = !!data?.me;

  // Acorde a los requisitos: el selector debe estar deshabilitado para todos (invitado, cliente, vendedor).
  const locked = true;

  // La implementación de la restricción ahora se maneja globalmente en App.jsx para evitar conflictos
  // Solo usamos authed aquí para el texto del tooltip

  const toggle = useCallback(() => {
    if (locked) return;
    setOpen((o) => !o);
  }, [locked]);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 sm:px-4 h-9 rounded-xl text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed outline-none"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={locked}
        title={
          isSeller
            ? 'Rubro bloqueado para cuentas vendedoras'
            : authed
              ? 'Rubro fijo para cuentas de cliente'
              : 'Rubro fijo para invitados'
        }
      >
        {rubro === RUBROS.GAMING ? (
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
            style={{ color: '#ff0000' }}
          >
            <line x1="6" x2="10" y1="12" y2="12" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="15" x2="15.01" y1="13" y2="13" />
            <line x1="18" x2="18.01" y1="11" y2="11" />
            <rect width="20" height="12" x="2" y="6" rx="2" />
          </svg>
        ) : (
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
            style={{ color: '#00ff0090' }}
          >
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="6" height="6" x="9" y="9" rx="1" />
            <path d="M15 2v2" />
            <path d="M15 20v2" />
            <path d="M2 15h2" />
            <path d="M2 9h2" />
            <path d="M20 15h2" />
            <path d="M20 9h2" />
            <path d="M9 2v2" />
            <path d="M9 20v2" />
          </svg>
        )}
        <span className="sm:block" style={{ color: titleColor || 'white' }}>
          {rubro === RUBROS.GAMING ? 'Gaming' : 'Technology'}
        </span>
      </button>

      {open && !locked && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[220px] rounded-xl border-2 p-2 z-50"
          style={{
            background: 'rgba(6,10,18,0.95)',
            borderColor: 'rgba(56,189,248,0.45)',
            boxShadow: '0 12px 28px rgba(0,0,0,.55), 0 0 18px rgba(56,189,248,0.25)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p className="px-3 py-2 text-xs text-cyan-200/80">Selecciona tu rubro</p>
          <button
            className="w-full text-left px-3 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: 'rgba(56,189,248,0.25)',
              background: rubro === RUBROS.TECHNOLOGY ? 'rgba(56,189,248,0.06)' : 'transparent',
            }}
            onClick={() => {
              setRubro(RUBROS.TECHNOLOGY);
              setOpen(false);
            }}
          >
            Technology
          </button>
          <button
            className="w-full mt-1 text-left px-3 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: 'rgba(56,189,248,0.25)',
              background: rubro === RUBROS.GAMING ? 'rgba(56,189,248,0.06)' : 'transparent',
            }}
            onClick={() => {
              setRubro(RUBROS.GAMING);
              setOpen(false);
            }}
          >
            Gaming
          </button>
        </div>
      )}
    </div>
  );
}

RubroSelector.propTypes = {
  compact: PropTypes.bool,
  titleColor: PropTypes.string,
};
