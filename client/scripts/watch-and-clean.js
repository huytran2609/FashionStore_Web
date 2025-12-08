#!/usr/bin/env node

/**
 * Watch script to automatically clean cache when files are deleted
 * This helps prevent cache-related errors when refactoring
 */

import { watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const srcDir = join(rootDir, 'src');

let isCleaning = false;

const cleanCache = () => {
    if (isCleaning) return;
    isCleaning = true;
    
    console.log('\n🧹 Auto-cleaning cache due to file change...');
    try {
        execSync('node scripts/clean-cache.js', { 
            cwd: rootDir,
            stdio: 'inherit' 
        });
        console.log('✅ Cache cleaned. Please restart your dev server if needed.\n');
    } catch (error) {
        console.error('❌ Error cleaning cache:', error.message);
    } finally {
        isCleaning = false;
    }
};

console.log('👀 Watching for file deletions in src/...');
console.log('💡 This will auto-clean cache when component files are deleted\n');

watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (eventType === 'rename' && filename) {
        // Check if it's a component/layout file
        if (filename.includes('/components/') || 
            filename.includes('/layouts/') ||
            filename.includes('/pages/')) {
            console.log(`📝 Detected change: ${filename}`);
            // Small delay to ensure file is actually deleted
            setTimeout(cleanCache, 500);
        }
    }
});

console.log('Press Ctrl+C to stop watching...\n');

