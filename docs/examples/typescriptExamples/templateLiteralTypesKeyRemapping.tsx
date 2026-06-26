type ConfigState = {
  theme: 'light' | 'dark';
  layout: 'sidebar' | 'topbar';
};

// Magia negra de TS: Iteramos sobre ConfigState y generamos funciones "onChange"
// Ej: 'theme' -> 'onThemeChange'
type ConfigHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

// Combinamos las propiedades originales con los handlers generados
type ConfigPanelProps = ConfigState & ConfigHandlers<ConfigState>;

function ConfigPanel(props: ConfigPanelProps) {
  return (
    <div className="p-6 bg-white rounded-xl">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        // TypeScript te auto-completará esto y validará que le pases 'light' o 'dark'
        onClick={() => props.onThemeChange('dark')}
      >
        Activar Modo Oscuro
      </button>
    </div>
  );
}
