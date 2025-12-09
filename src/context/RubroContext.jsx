import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { RUBROS } from './rubroConstants';
import { RubroContext } from './RubroContextBase';

const LS_KEY = 'app.rubro.state';

export function RubroProvider({ children }) {
  const [rubro, setRubro] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.rubro ?? RUBROS.TECHNOLOGY;
      }
    } catch {
      // ignore
    }
    return RUBROS.TECHNOLOGY;
  });

  const [store, setStore] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.store ?? { name: null, description: null };
      }
    } catch {
      // ignore
    }
    return { name: null, description: null };
  });

  const [isSeller, setIsSeller] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.isSeller != null ? !!parsed.isSeller : false;
      }
    } catch {
      // ignore
    }
    return false;
  });

  // persist
  useEffect(() => {
    const payload = { rubro, store, isSeller };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
    // Toggle document class for global theming
    const root = document.documentElement;
    root.classList.remove('rubro-technology', 'rubro-gaming');
    root.classList.add(rubro === RUBROS.GAMING ? 'rubro-gaming' : 'rubro-technology');
  }, [rubro, store, isSeller]);

  const value = useMemo(
    () => ({ rubro, setRubro, store, setStore, isSeller, setIsSeller }),
    [rubro, store, isSeller]
  );

  return <RubroContext.Provider value={value}>{children}</RubroContext.Provider>;
}

RubroProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
