import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
        './src/RosLibNode.js': './src/RosLib.js',
        canvas: './canvas',
        ws: '../util/shim/WebSocket',
        '@xmldom/xmldom': '../util/shim/@xmldom/xmldom',
        '../util/decompressPng': '../util/shim/decompressPng',
        }
    }
});
