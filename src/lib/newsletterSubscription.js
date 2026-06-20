const NEWSLETTER_STORAGE_KEY = 'newsletter_subscribers';

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function isValidNewsletterEmail(email) {
  const normalized = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export function subscribeToNewsletter(email) {
  const normalized = normalizeEmail(email);

  if (!isValidNewsletterEmail(normalized)) {
    return { ok: false, reason: 'invalid-email' };
  }

  const existingSubscribers = JSON.parse(localStorage.getItem(NEWSLETTER_STORAGE_KEY) || '[]');

  if (existingSubscribers.includes(normalized)) {
    return { ok: false, reason: 'duplicate-email', email: normalized };
  }

  localStorage.setItem(
    NEWSLETTER_STORAGE_KEY,
    JSON.stringify([...existingSubscribers, normalized])
  );

  return { ok: true, email: normalized };
}
