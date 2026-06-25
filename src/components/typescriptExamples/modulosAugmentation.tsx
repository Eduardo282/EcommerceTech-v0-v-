// Archivo: global.d.ts (se guarda típicamente en la raíz de src/)

// 1. Convertimos el archivo en un módulo
export {}; 

// 2. Aumentamos el ámbito global
declare global {
  // Le decimos a TS que el objeto Window del navegador ahora tiene una nueva propiedad
  interface Window {
    miSistemaSeguridad: {
      initAuth: (clientId: string) => void;
      sessionToken: string | null;
    };
  }
}





// Archivo: App.tsx
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Sin el archivo .d.ts anterior, TypeScript marcaría un error diciendo 
    // "La propiedad 'miSistemaSeguridad' no existe en el tipo 'Window'".
    // Ahora, tienes autocompletado nativo en toda tu app.
    if (window.miSistemaSeguridad) {
      window.miSistemaSeguridad.initAuth('CLIENT_123');
    }
  }, []);

  return <div>Iniciando sistema...</div>;
}