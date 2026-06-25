import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const tempDir = await mkdtemp(path.join(os.tmpdir(), 'newsletter-'));

process.env.NEWSLETTER_STORAGE_DIR = tempDir;
delete process.env.RESEND_API_KEY;
delete process.env.NEWSLETTER_FROM;

const { buildNewsletterWelcome, subscribeToNewsletter } = await import('./newsletterService.js');

const message = buildNewsletterWelcome('lalito9270@gmail.com');
assert.match(message.subject, /Lalito9270/);
assert.match(message.text, /Hola Lalito9270/);

const first = await subscribeToNewsletter('LALITO9270@gmail.com ');
assert.equal(first.ok, true);
assert.equal(first.email, 'lalito9270@gmail.com');
assert.equal(first.alreadySubscribed, false);
assert.equal(first.delivery.provider, 'outbox');

const duplicate = await subscribeToNewsletter('lalito9270@gmail.com');
assert.equal(duplicate.alreadySubscribed, true);
assert.equal(duplicate.delivery.reason, 'already-subscribed');

await assert.rejects(() => subscribeToNewsletter('bad-email'), /Invalid email/);

await rm(tempDir, { recursive: true, force: true });
console.log('newsletterService checks passed');
