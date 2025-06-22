import express from "express";
import cors from 'cors'
import eventsRouter from "./routes/events/events.routes";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ limit: '5mb' }));
  app.use('/api/events', eventsRouter);
  return app;
}