const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

for (const key of requiredEnvVars) {
  if (!process.env[key]?.trim()) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

const parseOrigins = (value) =>
  (value || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

export const config = Object.freeze({
  frontendOrigins: parseOrigins(process.env.FRONTEND_ORIGIN),
  isProduction: process.env.NODE_ENV === 'production',
  jwtSecret: process.env.JWT_SECRET,
  mongoDbName: process.env.MONGODB_DB || undefined,
  mongoUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
});
