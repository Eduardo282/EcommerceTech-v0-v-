import { Button } from '../ui/button';

export function FormFooter() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="footer subscription"
      className="flex flex-col sm:flex-row max-w-xl"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="Introduce tu correo electrónico"
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
        Suscríbirse
      </Button>
    </form>
  );
}
