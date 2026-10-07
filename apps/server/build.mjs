// Bundles the server so the workspace @gd/types sources (TypeScript) are inlined.
// npm dependencies stay external and are resolved from node_modules at runtime.
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

await build({
  entryPoints: ['src/index.ts', 'src/createApp.ts'],
  outdir: 'dist',
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'cjs',
  sourcemap: true,
  external: Object.keys(pkg.dependencies),
});
