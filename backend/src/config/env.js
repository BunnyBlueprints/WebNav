import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'SESSION_SECRET', 'FRONTEND_URL'];

function parseBoolean(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  return value === 'true';
}

function parseOrigins(value, fallback) {
  const origins = String(value || fallback)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  return origins;
}

export function validateEnv() {
  const missing = requiredEnvVars.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  mongodbUri: process.env.MONGODB_URI ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  sessionSecret: process.env.SESSION_SECRET ?? '',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  allowedOrigins: parseOrigins(process.env.ALLOWED_ORIGINS, process.env.FRONTEND_URL ?? 'http://localhost:5173'),
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  googleCallbackUrl:
    process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:4000/api/auth/google/callback',
  githubClientId: process.env.GITHUB_CLIENT_ID ?? '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
  githubCallbackUrl:
    process.env.GITHUB_CALLBACK_URL ?? 'http://localhost:4000/api/auth/github/callback',
  cookieSameSite: process.env.COOKIE_SAME_SITE ?? (process.env.NODE_ENV === 'production' ? 'none' : 'lax'),
  cookieSecure: parseBoolean(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
  cookieDomain: process.env.COOKIE_DOMAIN ?? '',
};
