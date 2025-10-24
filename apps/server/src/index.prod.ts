import serverless from 'serverless-http';
import { createApp } from "./createApp";

const app = createApp();
export default serverless(app);