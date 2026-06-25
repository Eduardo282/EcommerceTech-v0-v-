// 1. Declaramos la constante con los estilos (as const lo hace inmutable para TS)
const BUTTON_VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
} as const;

// 2. Extraemos los tipos de las llaves ('primary' | 'secondary' | 'danger')
type Variant = keyof typeof BUTTON_VARIANTS;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; // Tipado perfecto derivado de la constante
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  // 3. Indexed access: BUTTON_VARIANTS[variant] siempre será un string de clases válido
  return (
    <button 
      className={`px-4 py-2 rounded-md font-medium transition-colors ${BUTTON_VARIANTS[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}