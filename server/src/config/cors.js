import { config } from './env.js';

const defaultOrigins = [
  'https://embeddable-sandbox.cdn.apollographql.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

export const allowedOrigins = Array.from(new Set([...defaultOrigins, ...config.frontendOrigins]));

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
