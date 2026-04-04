import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { env } from './env.js';
import { User } from '../models/User.js';

async function upsertOAuthUser({
  provider,
  providerId,
  email,
  name,
  avatarUrl,
}) {
  try {
    const providerField = provider === 'google' ? 'providers.googleId' : 'providers.githubId';

    let user = await User.findOne({ [providerField]: providerId });

    if (user) {
      if (avatarUrl && !user.avatarUrl) {
        user.avatarUrl = avatarUrl;
        await user.save();
      }

      return user;
    }

    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      user = await User.create({
        name: name || email?.split('@')[0] || 'WebNav User',
        email: email?.toLowerCase() ?? `${provider}_${providerId}@webnav.local`,
        avatarUrl: avatarUrl ?? '',
        providers: provider === 'google' ? { googleId: providerId } : { githubId: providerId },
      });

      return user;
    }

    user.name = user.name || name;
    user.avatarUrl = user.avatarUrl || avatarUrl || '';
    user.providers = user.providers || {};
    user.providers.googleId =
      provider === 'google' ? providerId : user.providers?.googleId ?? null;
    user.providers.githubId =
      provider === 'github' ? providerId : user.providers?.githubId ?? null;
    await user.save();

    return user;
  } catch (error) {
    console.error(`Error upserting OAuth user (${provider}):`, error);
    throw error;
  }
}

export function configurePassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  if (env.googleClientId && env.googleClientSecret) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.googleClientId,
          clientSecret: env.googleClientSecret,
          callbackURL: env.googleCallbackUrl,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const avatarUrl = profile.photos?.[0]?.value;
            const user = await upsertOAuthUser({
              provider: 'google',
              providerId: profile.id,
              email,
              name: profile.displayName,
              avatarUrl,
            });

            done(null, user);
          } catch (error) {
            console.error('Google OAuth error:', error);
            done(error, null);
          }
        }
      )
    );
  }

  if (env.githubClientId && env.githubClientSecret) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: env.githubClientId,
          clientSecret: env.githubClientSecret,
          callbackURL: env.githubCallbackUrl,
          scope: ['user:email'],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const primaryEmail =
              profile.emails?.find((entry) => entry.primary)?.value || profile.emails?.[0]?.value;
            const avatarUrl = profile.photos?.[0]?.value;
            const user = await upsertOAuthUser({
              provider: 'github',
              providerId: profile.id,
              email: primaryEmail,
              name: profile.displayName || profile.username,
              avatarUrl,
            });

            done(null, user);
          } catch (error) {
            console.error('GitHub OAuth error:', error);
            done(error, null);
          }
        }
      )
    );
  }
}
