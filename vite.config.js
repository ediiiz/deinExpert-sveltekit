import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  ssr: {
    noExternal: ['Chart.js']
  },
  server: {
    port: 5172,
  },
};

export default config;
