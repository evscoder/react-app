import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const rootEnvDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
  const env = loadEnv(mode, rootEnvDir, '');

  return {
    base: './',
    plugins: [react(), tailwindcss()],
    css: {
      modules: {
        localsConvention: 'dashes'
      }
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      host: true
    }
  };
});
