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
    passport.authenticate(provider, { session: false }, (error, user) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.redirect('/api/auth/oauth/failure');
      }

      req.user = user;
      return next();
    })(req, res, next);
  };
}

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, getCurrentUser);
router.post('/logout', logout);
router.put('/profile', requireAuth, updateProfile);
router.post('/profile/avatar', requireAuth, uploadAvatar);
router.delete('/profile/avatar', requireAuth, removeAvatar);
router.post('/profile/password', requireAuth, changePassword);
router.post('/profile/two-factor', requireAuth, updateTwoFactor);
router.get('/sessions', requireAuth, getActiveSessions);

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
  handleOAuthSuccess
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
  handleOAuthSuccess
);

router.get('/oauth/failure', handleOAuthFailure);

export default router;
