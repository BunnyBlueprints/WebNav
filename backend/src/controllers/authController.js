import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { clearAuthCookie, setAuthCookie } from '../utils/tokens.js';

function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function getSessionDetails(req) {
  return {
    sessionId: crypto.randomUUID(),
    userAgent: String(req.headers['user-agent'] || 'Unknown device').slice(0, 240),
    ipAddress: String(req.ip || req.headers['x-forwarded-for'] || ''),
    createdAt: new Date(),
    lastSeenAt: new Date(),
  };
}

function attachSessionToUser(user, req) {
  const session = getSessionDetails(req);
  user.activeSessions = [session, ...(user.activeSessions || []).slice(0, 9)];
  return session;
}

function sanitizeProfilePayload(body) {
  return {
    name: String(body.name || '').trim(),
    email: normalizeEmail(body.email || ''),
    bio: String(body.bio || '').trim().slice(0, 280),
  };
}

function isSupportedAvatarDataUrl(value) {
  return /^data:image\/(png|jpeg|jpg|gif);base64,/i.test(value);
}

function estimateBase64Bytes(dataUrl) {
  const base64 = dataUrl.split(',')[1] || '';
  return Buffer.byteLength(base64, 'base64');
}

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const normalizedEmail = normalizeEmail(email);
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash,
    lastLoginAt: new Date(),
  });

  const session = attachSessionToUser(user, req);
  await user.save();

  setAuthCookie(res, user._id.toString(), session.sessionId);

  return res.status(201).json({
    message: 'Account created successfully.',
    user: user.toSafeObject(),
  });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });

  if (!user || !user.passwordHash) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  user.lastLoginAt = new Date();
  const session = attachSessionToUser(user, req);
  await user.save();

  setAuthCookie(res, user._id.toString(), session.sessionId);

  return res.status(200).json({
    message: 'Signed in successfully.',
    user: user.toSafeObject(),
  });
}

export async function getCurrentUser(req, res) {
  return res.status(200).json({
    user: req.user.toSafeObject(),
  });
}

export function logout(req, res) {
  if (req.user && req.auth?.sessionId) {
    req.user.activeSessions = (req.user.activeSessions || []).filter(
      (session) => session.sessionId !== req.auth.sessionId
    );
    req.user.save().catch(() => {});
  }

  clearAuthCookie(res);

  req.logout?.(() => {});

  return res.status(200).json({ message: 'Signed out successfully.' });
}

export async function handleOAuthSuccess(req, res) {
  const user = req.user;

  user.lastLoginAt = new Date();
  const session = attachSessionToUser(user, req);
  await user.save();

  setAuthCookie(res, user._id.toString(), session.sessionId);

  return res.redirect(`${env.frontendUrl}?auth=success`);
}

export function handleOAuthFailure(_req, res) {
  return res.redirect(`${env.frontendUrl}?auth=error`);
}

export async function updateProfile(req, res) {
  const { name, email, bio } = sanitizeProfilePayload(req.body);

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const existingUser = await User.findOne({
    email,
    _id: { $ne: req.user._id },
  });

  if (existingUser) {
    return res.status(409).json({ message: 'That email is already in use.' });
  }

  req.user.name = name;
  req.user.email = email;
  req.user.bio = bio;
  await req.user.save();

  return res.status(200).json({
    message: 'Profile updated successfully.',
    user: req.user.toSafeObject(),
  });
}

export async function uploadAvatar(req, res) {
  const { avatarDataUrl } = req.body;

  if (!avatarDataUrl || typeof avatarDataUrl !== 'string') {
    return res.status(400).json({ message: 'Avatar image is required.' });
  }

  if (!isSupportedAvatarDataUrl(avatarDataUrl)) {
    return res.status(400).json({ message: 'Only JPG, JPEG, PNG, and GIF images are supported.' });
  }

  if (estimateBase64Bytes(avatarDataUrl) > 800 * 1024) {
    return res.status(400).json({ message: 'Avatar image must be 800KB or smaller.' });
  }

  req.user.avatarUrl = avatarDataUrl;
  await req.user.save();

  return res.status(200).json({
    message: 'Profile image updated successfully.',
    user: req.user.toSafeObject(),
  });
}

export async function removeAvatar(req, res) {
  req.user.avatarUrl = '';
  await req.user.save();

  return res.status(200).json({
    message: 'Profile image removed successfully.',
    user: req.user.toSafeObject(),
  });
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  if (!newPassword || String(newPassword).length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long.' });
  }

  if (req.user.passwordHash) {
    const isValidPassword = await bcrypt.compare(String(currentPassword || ''), req.user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }
  }

  req.user.passwordHash = await bcrypt.hash(String(newPassword), 12);
  await req.user.save();

  return res.status(200).json({
    message: 'Password updated successfully.',
    user: req.user.toSafeObject(),
  });
}

export async function updateTwoFactor(req, res) {
  req.user.twoFactorEnabled = Boolean(req.body.enabled);
  await req.user.save();

  return res.status(200).json({
    message: req.user.twoFactorEnabled
      ? 'Two-factor authentication enabled.'
      : 'Two-factor authentication disabled.',
    user: req.user.toSafeObject(),
  });
}

export async function getActiveSessions(req, res) {
  return res.status(200).json({
    sessions: (req.user.activeSessions || []).map((session) => ({
      id: session.sessionId,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      createdAt: session.createdAt,
      lastSeenAt: session.lastSeenAt,
      current: session.sessionId === req.auth?.sessionId,
    })),
  });
}
