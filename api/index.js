// Vercel Function serving the Express API. vercel.json rewrites /api/* here;
// Express still sees the original URL, so its /api/... routes match as usual.
const { createApp } = require('../apps/server/dist/createApp');

module.exports = createApp();
