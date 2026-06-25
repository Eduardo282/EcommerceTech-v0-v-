import React from 'react';

// Si pasamos la prop 'isLink' como true, obligamos a pasar un 'href' y evitamos 'onClick'
type ButtonProps<IsLink extends boolean> = IsLink extends true
  ? { isLink: true; href: string; onClick?: never; children: React.ReactNode }
  : { isLink?: false; href?: never; onClick: () => void; children: React.ReactNode };

function ActionElement<T extends boolean>(props: ButtonProps<T>) {
  if (props.isLink) {
    return <a href={props.href} className="text-blue-500">{props.children}</a>;
  }
  return <button onClick={props.onClick} className="bg-blue-500 text-white">{props.children}</button>;
}

// Uso:
// ✅ Correcto: Es un enlace, requiere href
<ActionElement isLink={true} href="/dashboard">Ir al Dashboard</ActionElement>

// ❌ Error de TS: Si es un botón (isLink false o undefined), no puede recibir href
<ActionElement onClick={() => console.log('click')}>Guardar</ActionElement>