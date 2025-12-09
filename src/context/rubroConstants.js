export const RUBROS = {
  TECHNOLOGY: 'TECHNOLOGY',
  GAMING: 'GAMING',
};

// Utility to adapt UI presets by rubro
export function getRubroTheme(rubro) {
  if (rubro === RUBROS.GAMING) {
    return {
      accent: '#7c3aed', // purple glow
      icon: '#8b5cf6',
      panel: 'rgba(14,10,18,0.7)',
    };
  }
  // TECHNOLOGY default (gold theme already in project)
  return {
    accent: '#eab308',
    icon: '#fbbf24',
    panel: 'rgba(18,16,10,0.6)',
  };
}
