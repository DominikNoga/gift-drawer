import { Router } from 'express'
import { db } from '../../db/db';
const healthRouter = Router();

healthRouter.get('/ping', (_req, res) => res.json({ ok: true, ts: Date.now() }));

healthRouter.get('/check', async (_req, res) => {
  const start = Date.now();
  try {
    const r = await db.raw('select 1 as ok');
    res.json({
      ok: true,
      db: r?.rows?.[0]?.ok ?? r?.[0]?.ok ?? 1,
      elapsedMs: Date.now() - start,
      envHasPg: Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL),
      vercel: Boolean(process.env.VERCEL)
    });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: String(err), elapsedMs: Date.now() - start });
  }
});

export default healthRouter;
