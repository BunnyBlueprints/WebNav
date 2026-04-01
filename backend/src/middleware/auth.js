import { User } from '../models/User.js';
import { verifyAuthToken } from '../utils/tokens.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.webnav_token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const activeSession = user.activeSessions?.find((session) => session.sessionId === payload.sid);

    if (!activeSession) {
      return res.status(401).json({ message: 'Session is no longer active.' });
    }

    activeSession.lastSeenAt = new Date();
    await user.save();

    req.user = user;
    req.auth = {
      sessionId: payload.sid,
    };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session.' });
  }
}
