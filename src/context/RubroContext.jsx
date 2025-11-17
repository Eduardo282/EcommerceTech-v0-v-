import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const RUBROS = {
  TECHNOLOGY: "TECHNOLOGY",
  GAMING: "GAMING",
};

const RubroContext = createContext(null);

const LS_KEY = "app.rubro.state";

export function RubroProvider({ children }) {
  const [rubro, setRubro] = useState(RUBROS.TECHNOLOGY);
  const [store, setStore] = useState({ name: null, description: null });
  const [isSeller, setIsSeller] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.rubro) setRubro(parsed.rubro);
        if (parsed?.store) setStore(parsed.store);
        if (parsed?.isSeller != null) setIsSeller(!!parsed.isSeller);
      }
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    const payload = { rubro, store, isSeller };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {}
    // Toggle document class for global theming
    const root = document.documentElement;
    root.classList.remove("rubro-technology", "rubro-gaming");
    root.classList.add(
      rubro === RUBROS.GAMING ? "rubro-gaming" : "rubro-technology"
    );
  }, [rubro, store, isSeller]);

  const value = useMemo(
    () => ({ rubro, setRubro, store, setStore, isSeller, setIsSeller }),
    [rubro, store, isSeller]
  );

  return (
    <RubroContext.Provider value={value}>{children}</RubroContext.Provider>
  );
}

export function useRubro() {
  const ctx = useContext(RubroContext);
  if (!ctx) throw new Error("useRubro must be used within RubroProvider");
  return ctx;
}

// Utility to adapt UI presets by rubro
export function getRubroTheme(rubro) {
  if (rubro === RUBROS.GAMING) {
    return {
      accent: "#7c3aed", // purple glow
      icon: "#8b5cf6",
      panel: "rgba(14,10,18,0.7)",
    };
  }
  // TECHNOLOGY default (gold theme already in project)
  return {
    accent: "#eab308",
    icon: "#fbbf24",
    panel: "rgba(18,16,10,0.6)",
  };
}
