import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/outputs': 'http://127.0.0.1:6001/',
    },
  },
  plugins: [react()],
});
