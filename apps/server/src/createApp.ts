import express from "express";
import cors from 'cors'
import eventsRouter from "./routes/events/events.routes";
import wishesRouter from "./routes/wishes/wishes.routes";
import healthRouter from "./routes/healthcheck/router";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ limit: '5mb' }));
  app.use('/api/events', eventsRouter);
  app.use('/api/wishes', wishesRouter);
  app.use('/api/health', healthRouter);
  return app;
}