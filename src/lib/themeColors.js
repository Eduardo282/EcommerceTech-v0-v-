const LIGHT_DEFAULTS = {
  adressColor: '#475569',
  descripcionColor: '#3f3f46',
  descripcionCategoriasColor: '#64748b',
  descripcionDestacadosColor: '#64748b',
  descripcionFormColor: '#64748b',
  descripcionHeroColor: '#3f3f46',
  descripcionLogoColor: '#64748b',
  derechosAutorColor: '#64748b',
  enlaceColor: '#475569',
  enlacePoliticasColor: '#475569',
  enlacesNavColor: '#111827',
  fondoCategoriasColor: '#ffffff',
  fondoDestacadosColor: '#ffffff',
  fondoFormColor: '#f8fafc',
  fondoHeaderColor: '#ffffff',
  fondoHeroColor: '#ffffff',
  fondoNavColor: '#ffffff',
  hoverEnlaceNav: '#b45309',
  hoverEnlacePoliticasColor: '#b45309',
  logoText1Color: '#111827',
  logoText2Color: '#111827',
  subtituloColor: '#6b7280',
  titleCategoriasColor: '#111827',
  titleCategoriasColor2: '#111827',
  titleColor: '#111827',
  titleDestacadosColor: '#111827',
  titleFormColor: '#111827',
  titleHeroColor: '#111827',
  titleHeroColor2: '#92400e',
  titleNoticiasColor: '#b45309',
  titleRubroColor: '#15803d',
};

export function getThemeColor(config, key, fallback, resolvedTheme) {
  const theme = resolvedTheme === 'light' ? 'light' : 'dark';
  const suffix = theme === 'light' ? 'Light' : 'Dark';
  const themedValue = config?.[`${key}${suffix}`];

  if (themedValue) return themedValue;
  if (theme === 'light') return LIGHT_DEFAULTS[key] || fallback;

  return config?.[key] || fallback;
}
