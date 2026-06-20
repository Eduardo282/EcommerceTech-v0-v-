import { useState } from 'react';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '../../../lib/newsletterSubscription';

export function FormFooter() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const result = subscribeToNewsletter(email);

    if (!result.ok) {
      if (result.reason === 'invalid-email') {
        setStatusMessage('Ingresa un correo válido para suscribirte.');
        toast.error('Ingresa un correo válido para suscribirte');
        return;
      }

      setStatusMessage('Ese correo ya estaba suscrito.');
      toast.info('Ese correo ya estaba suscrito');
      return;
    }

    setStatusMessage(`Suscripción confirmada para ${result.email}.`);
    setEmail('');
    toast.success('Suscripción realizada', {
      description: `Te enviaremos novedades a ${result.email}`,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="footer subscription"
      className="flex flex-col sm:flex-row max-w-xl"
    >
      <label htmlFor="footer-email" className="sr-only">
        Dirección de correo electrónico
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="Introduce tu correo electrónico"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 backdrop-blur-xl text-[#Ffffff] placeholder:text-[#898989]"
        style={{
          background: 'black',
          boxShadow: 'inset 0 0 transparent',
        }}
      />
      <button
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
      </button>
      <p className="basis-full pt-2 text-sm text-[#B69A4A]" aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
}
