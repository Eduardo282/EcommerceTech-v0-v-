// Variadic tuple types: El hook toma un número indefinido de strings (nombres de llaves de LocalStorage)
// y devuelve una tupla estricta con exactamente la misma cantidad de elementos (booleanos o strings).
function useStorageKeys<T extends string[]>(...keys: T): { [K in keyof T]: string | null } {
  // Implementación simplificada
  return keys.map((key) => localStorage.getItem(key)) as any;
}

function App() {
  // Al pasar 3 parámetros, TS sabe que el array resultante tiene EXACTAMENTE 3 posiciones
  // y no te dejará acceder a un índice [3] o [4].
  const [token, theme, language] = useStorageKeys('auth_token', 'ui_theme', 'lang');

  return <div>{theme === 'dark' ? 'Modo oscuro' : 'Modo claro'}</div>;
}
