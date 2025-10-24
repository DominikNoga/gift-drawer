import serverless from 'serverless-http';
import { createApp } from '../apps/server/src/createApp';

const app = createApp();

// optional but explicit; Node 20 is Vercel’s default
export const config = { runtime: 'nodejs20.x' };

export default serverless(app);
