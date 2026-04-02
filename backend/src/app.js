import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { env } from './config/env.js';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

configurePassport();

const app = express();

app.set('trust proxy', 1);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(
  session({
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: env.cookieSecure,
      sameSite: env.cookieSameSite,
      ...(env.cookieDomain ? { domain: env.cookieDomain } : {}),
    },
  })
);
app.use(passport.initialize());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
