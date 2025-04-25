import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5174,
        strictPort: true,
        allowedHosts: [
            'localhost',
            '127.0.0.1',
            'a9d3-79-97-102-189.ngrok-free.app'  // 👈 your current ngrok host
        ]
    }
});
