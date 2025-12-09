import { Button } from '../ui/button';

export function FormNewsletter() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="newsletter subscription"
      className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Ingresa tu dirección de correo electrónico"
        required
        className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 backdrop-blur-xl text-[#Ffffff] placeholder:text-[#898989]"
        style={{
          background: 'black',
          boxShadow: 'inset 0 0 transparent',
        }}
      />
      <Button
        type="submit"
        className="text-white px-8 py-8 rounded-xl cursor-pointer"
        style={{
          background: 'transparent',
          textShadow: '0 0 10px white',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Suscríbete Ahora
      </Button>
    </form>
  );
}
