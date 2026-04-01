import { validateEnv, env } from './config/env.js';
import { connectToDatabase } from './db/connect.js';

async function startServer() {
  validateEnv();
  await connectToDatabase();
  const { default: app } = await import('./app.js');

  app.listen(env.port, () => {
    console.log(`Backend listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
