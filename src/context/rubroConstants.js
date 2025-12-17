export const RUBROS = {
  TECHNOLOGY: 'TECHNOLOGY',
  GAMING: 'GAMING',
};

// Utilidad para adaptar los presets de la UI por rubro
export function getRubroTheme(rubro) {
  if (rubro === RUBROS.GAMING) {
    return {
      accent: '#7c3aed', // brillo de color morado
      icon: '#8b5cf6',
      panel: 'rgba(14,10,18,0.7)',
    };
  }
  // TECHNOLOGY default (tema de oro ya en el proyecto)
  return {
    accent: '#eab308',
    icon: '#fbbf24',
    panel: 'rgba(18,16,10,0.6)',
  };
}
