import { Router } from 'express';
import passport from 'passport';
import {
  changePassword,
  getActiveSessions,
  getCurrentUser,
  handleOAuthFailure,
  handleOAuthSuccess,
  login,
  logout,
  removeAvatar,
  register,
  updateProfile,
  updateTwoFactor,
  uploadAvatar,
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { env } from '../config/env.js';

const router = Router();

function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function ensureProviderConfigured(providerName, isConfigured) {
  return (_req, res, next) => {
    if (!isConfigured) {
      return res
        .status(503)
        .json({ message: `${providerName} OAuth is not configured on the server.` });
    }

    return next();
  };
}

function authenticateOAuth(provider) {
  return (req, res, next) => {
    passport.authenticate(provider, { session: false }, (error, user, info) => {
      try {
        if (error) {
          console.error(`OAuth ${provider} authentication error:`, error);
          return res.redirect(`${env.frontendUrl}?auth=error`);
        }

        if (!user) {
          console.warn(`OAuth ${provider} authentication failed: no user returned`);
          return res.redirect(`${env.frontendUrl}?auth=error`);
        }

        req.user = user;
        return next();
      } catch (err) {
        console.error(`OAuth ${provider} middleware error:`, err);
        return res.redirect(`${env.frontendUrl}?auth=error`);
      }
    })(req, res, next);
  };
}

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/me', requireAuth, asyncHandler(getCurrentUser));
router.post('/logout', asyncHandler(logout));
router.put('/profile', requireAuth, asyncHandler(updateProfile));
router.post('/profile/avatar', requireAuth, asyncHandler(uploadAvatar));
router.delete('/profile/avatar', requireAuth, asyncHandler(removeAvatar));
router.post('/profile/password', requireAuth, asyncHandler(changePassword));
router.post('/profile/two-factor', requireAuth, asyncHandler(updateTwoFactor));
router.get('/sessions', requireAuth, asyncHandler(getActiveSessions));

router.get(
  '/google',
  ensureProviderConfigured('Google', Boolean(env.googleClientId && env.googleClientSecret)),
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false,
  })
);
router.get(
  '/google/callback',
  ensureProviderConfigured('Google', Boolean(env.googleClientId && env.googleClientSecret)),
  authenticateOAuth('google'),
  asyncHandler(handleOAuthSuccess)
);

router.get(
  '/github',
  ensureProviderConfigured('GitHub', Boolean(env.githubClientId && env.githubClientSecret)),
  passport.authenticate('github', { scope: ['user:email'], session: false })
);
router.get(
  '/github/callback',
  ensureProviderConfigured('GitHub', Boolean(env.githubClientId && env.githubClientSecret)),
  authenticateOAuth('github'),
  asyncHandler(handleOAuthSuccess)
);

router.get('/oauth/failure', asyncHandler(handleOAuthFailure));

export default router;
