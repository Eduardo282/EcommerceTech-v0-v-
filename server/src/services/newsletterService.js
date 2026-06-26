import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStorageDir() {
  return process.env.NEWSLETTER_STORAGE_DIR || path.resolve(process.cwd(), 'storage');
}

function getSubscribersPath() {
  return path.join(getStorageDir(), 'newsletter-subscribers.json');
}

function getOutboxPath() {
  return path.join(getStorageDir(), 'newsletter-outbox.json');
}

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

function toDisplayName(email) {
  const rawName = email
    .split('@')[0]
    .replace(/[._-]+/g, ' ')
    .trim();
  if (!rawName) return 'creador';

  return rawName
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw error;
  }
}

async function writeJson(filePath, data) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export function buildNewsletterWelcome(email) {
  const name = toDisplayName(email);
  const subject = `${name}, bienvenida/o a EvoHance`;
  const text = `Hola ${name}!

Gracias por suscribirte a EvoHance.

Desde ahora vas a recibir ofertas exclusivas, recursos gratuitos y novedades para mejorar tus proyectos digitales.

— Equipo EvoHance`;

  const html = `
    <div style="font-family:Arial,sans-serif;background:#050505;color:#E4D9AF;padding:32px;border-radius:18px">
      <p style="color:#F9B61D;text-transform:uppercase;letter-spacing:2px;font-size:12px">EvoHance Newsletter</p>
      <h1 style="margin:0 0 16px;font-size:28px;color:#E4D9AF">Hola ${name}!</h1>
      <p style="font-size:16px;line-height:1.6;color:#f5f0d0">
        Gracias por suscribirte. Desde ahora vas a recibir ofertas exclusivas,
        recursos gratuitos y novedades para mejorar tus proyectos digitales.
      </p>
      <p style="margin-top:24px;color:#B69A4A">— Equipo EvoHance</p>
    </div>
  `;

  return { subject, text, html };
}

async function saveOutboxEmail(email, message, status = 'pending-config') {
  const outbox = await readJson(getOutboxPath(), []);
  const entry = {
    id: crypto.randomUUID(),
    email,
    status,
    createdAt: new Date().toISOString(),
    ...message,
  };

  await writeJson(getOutboxPath(), [entry, ...outbox]);
  return entry;
}

async function sendWithResend(email, message) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;

  if (!apiKey || !from) {
    await saveOutboxEmail(email, message);
    return { delivered: false, provider: 'outbox', reason: 'missing-email-config' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: message.subject,
      html: message.html,
      text: message.text,
    }),
  });

  if (!response.ok) {
    await saveOutboxEmail(email, message, 'failed');
    return { delivered: false, provider: 'resend', reason: 'provider-error' };
  }

  const payload = await response.json();
  return { delivered: true, provider: 'resend', id: payload.id };
}

export async function subscribeToNewsletter(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > 254) {
    const error = new Error('Invalid email address.');
    error.statusCode = 400;
    throw error;
  }

  const subscribers = await readJson(getSubscribersPath(), []);
  const alreadySubscribed = subscribers.some((subscriber) => subscriber.email === normalizedEmail);

  if (!alreadySubscribed) {
    await writeJson(getSubscribersPath(), [
      {
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
      },
      ...subscribers,
    ]);
  }

  const message = buildNewsletterWelcome(normalizedEmail);
  const delivery = alreadySubscribed
    ? { delivered: false, provider: 'none', reason: 'already-subscribed' }
    : await sendWithResend(normalizedEmail, message);

  return {
    ok: true,
    email: normalizedEmail,
    alreadySubscribed,
    delivery,
  };
}
