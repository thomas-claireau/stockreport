import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
					@import "./src/styles/variables";
					@import "./src/styles/reset";
					@import "./src/styles/fonts";
					@import "./src/styles/global";
				`,
      },
    },
  },
});
