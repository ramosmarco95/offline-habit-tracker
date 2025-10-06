import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	build: {
		sourcemap: true,
		rollupOptions: {
			// Build the service worker as a separate entry so it ends up at dist/sw.js
			input: {
				main: resolve(__dirname, 'index.html'),
				sw: resolve(__dirname, 'src/sw/sw.ts'),
			},
			output: {
				// Put built entry files (like the service worker) at the dist root with predictable names
				entryFileNames: '[name].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});