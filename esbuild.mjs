import { build } from 'esbuild';

build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    keepNames: true,
    sourcesContent: false,
    sourcemap: false,
    target: 'esnext',
    platform: 'node',
    format: 'esm',
    outfile: 'dist/app/index.mjs',
    banner: {
      js: `import { createRequire } from 'module';const require = createRequire(import.meta.url);`,
    }
  })