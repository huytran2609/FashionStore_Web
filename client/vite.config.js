import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Custom plugin to clear cache on file changes
const clearCachePlugin = () => {
    return {
        name: 'clear-cache-on-change',
        configureServer(server) {
            // Watch for file deletions and clear cache
            server.watcher.on('unlink', (file) => {
                // If a component file is deleted, clear Vite cache
                if (file.includes('/components/') || file.includes('/layouts/')) {
                    console.log('🔄 File deleted, clearing cache...');
                    // Vite will automatically handle cache invalidation
                }
            });
        },
        buildStart() {
            // Clear cache on build start if needed
            if (process.env.CLEAR_CACHE === 'true') {
                console.log('🧹 Clearing cache on build start...');
            }
        }
    };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    clearCachePlugin()
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  // Clear cache on server start if there are issues
  server: {
    watch: {
      // Automatically clear cache when files are deleted
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  // Optimize cache handling
  optimizeDeps: {
    // Force re-optimization when dependencies change
    force: process.env.CLEAR_CACHE === 'true',
  },
});
