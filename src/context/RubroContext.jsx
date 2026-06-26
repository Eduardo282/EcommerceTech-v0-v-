import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { RUBROS } from './rubroConstants';
import { RubroContext } from './RubroContextBase';

const LS_KEY = 'app.rubro.state';
const DEFAULT_RUBRO_STATE = {
  isSeller: false,
  rubro: RUBROS.TECHNOLOGY,
  store: { name: null, description: null },
};

function readStoredRubroState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_RUBRO_STATE;

    const parsed = JSON.parse(raw);

    return {
      isSeller: parsed.isSeller != null ? Boolean(parsed.isSeller) : DEFAULT_RUBRO_STATE.isSeller,
      rubro: parsed.rubro ?? DEFAULT_RUBRO_STATE.rubro,
      store: parsed.store ?? DEFAULT_RUBRO_STATE.store,
    };
  } catch {
    return DEFAULT_RUBRO_STATE;
  }
}

function applyStateValue(value, previousValue) {
  return typeof value === 'function' ? value(previousValue) : value;
}

export function RubroProvider({ children }) {
  const [state, setState] = useState(readStoredRubroState);
  const { isSeller, rubro, store } = state;

  const setRubro = useCallback((value) => {
    setState((previous) => ({
      ...previous,
      rubro: applyStateValue(value, previous.rubro),
    }));
  }, []);

  const setStore = useCallback((value) => {
    setState((previous) => ({
      ...previous,
      store: applyStateValue(value, previous.store),
    }));
  }, []);

  const setIsSeller = useCallback((value) => {
    setState((previous) => ({
      ...previous,
      isSeller: applyStateValue(value, previous.isSeller),
    }));
  }, []);

  // persist
  useEffect(() => {
    const payload = { rubro, store, isSeller };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {
      // ignorar
    }
    // Ajustar la clase del documento para el tema global
    const root = document.documentElement;
    root.classList.remove('rubro-technology', 'rubro-gaming');
    root.classList.add(rubro === RUBROS.GAMING ? 'rubro-gaming' : 'rubro-technology');
  }, [rubro, store, isSeller]);

  const value = useMemo(
    () => ({ rubro, setRubro, store, setStore, isSeller, setIsSeller }),
    [rubro, setRubro, store, setStore, isSeller, setIsSeller]
  );

  return <RubroContext.Provider value={value}>{children}</RubroContext.Provider>;
}

RubroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
