import serverless from 'serverless-http';
import { createApp } from "../apps/server/src/createApp";

const app = createApp();
export const config = { runtime: 'nodejs20.x' };
export default serverless(app);