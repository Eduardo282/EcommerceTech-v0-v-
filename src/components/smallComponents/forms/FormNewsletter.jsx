import { useState } from 'react';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '../../../lib/newsletterSubscription';

export function FormNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await subscribeToNewsletter(email);
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.reason === 'invalid-email') {
        toast.error('Ingresa un correo válido para suscribirte');
        return;
      }

      toast.error('No pudimos completar la suscripción');
      return;
    }

    if (result.alreadySubscribed) {
      toast.info('Ese correo ya estaba suscrito');
      return;
    }

    setEmail('');
    toast.success(
      result.delivery?.delivered ? 'Suscripción realizada' : 'Suscripción guardada',
      {
        description: result.delivery?.delivered
          ? `Revisa tu correo: ${result.email}`
          : 'El mensaje quedó en cola hasta configurar el proveedor de email.',
      }
    );
  }

  function handleSubmitError(error) {
    setIsSubmitting(false);
    toast.error('Servidor no disponible', {
      description: error?.message || 'Revisa que el backend esté encendido.',
    });
  }

  async function submitSafely(event) {
    try {
      await handleSubmit(event);
    } catch (error) {
      handleSubmitError(error);
    }
  }

  return (
    <form
      onSubmit={submitSafely}
      aria-label="newsletter subscription"
      className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Dirección de correo electrónico
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Ingresa tu dirección de correo electrónico"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-xl border border-[#F9B61D]/20 px-6 py-4 text-white outline-none backdrop-blur-xl transition focus:border-[#F9B61D]/70 focus:ring-2 focus:ring-[#F9B61D]/30 placeholder:text-[#898989]"
        style={{
          background: 'black',
          boxShadow: 'inset 0 0 20px rgba(249,182,29,0.05)',
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-[#F9B61D] px-8 py-4 font-bold text-black transition hover:bg-[#ffd15a] disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? 'Enviando...' : 'Suscríbete Ahora'}
      </button>
    </form>
  );
}
