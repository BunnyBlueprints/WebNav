import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const tokenLifetime = '7d';

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: env.cookieSameSite,
    secure: env.cookieSecure,
    ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
  };
}

export function signAuthToken(userId, sessionId) {
  return jwt.sign({ sub: userId, sid: sessionId }, env.jwtSecret, { expiresIn: tokenLifetime });
}

export function verifyAuthToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export function setAuthCookie(res, userId, sessionId, remember = true) {
  const token = signAuthToken(userId, sessionId);

  const cookieOptions = {
    ...getCookieOptions(),
  };

  if (remember) {
    cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
  }

  res.cookie('webnav_token', token, cookieOptions);
}

export function clearAuthCookie(res) {
  res.clearCookie('webnav_token', {
    ...getCookieOptions(),
  });
}
