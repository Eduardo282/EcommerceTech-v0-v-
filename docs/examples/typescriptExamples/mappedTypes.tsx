type ClientData = {
  id: string;
  companyName: string;
  rfc: string;
  employeeCount: number;
};

// Mapped Type: Iteramos sobre todas las llaves (K) de un tipo (T).
// Hacemos que todas sean opcionales (?) y que su valor sea un string (el mensaje de error).
type FormErrors<T> = {
  [K in keyof T]?: string;
};

function ClientForm() {
  // Ahora el estado de errores siempre estará sincronizado con las propiedades de ClientData.
  // Si mañana agregas "email" a ClientData, FormErrors aceptará "email" automáticamente.
  const [errors, setErrors] = React.useState<FormErrors<ClientData>>({});

  const validate = () => {
    // TS te autocompleta .companyName y exige que el valor sea string
    setErrors({ companyName: 'El nombre de la empresa es obligatorio' });
  };

  return <button onClick={validate}>Validar</button>;
}
