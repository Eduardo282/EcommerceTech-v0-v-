function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function isValidNewsletterEmail(email) {
  const normalized = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export async function subscribeToNewsletter(email) {
  const normalized = normalizeEmail(email);

  if (!isValidNewsletterEmail(normalized)) {
    return { ok: false, reason: 'invalid-email' };
  }

  const apiUrl = import.meta.env.VITE_API_URL || '';
  const response = await fetch(`${apiUrl}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: normalized }),
  });

  if (!response.ok) {
    return { ok: false, reason: 'server-error' };
  }

  return response.json();
}
