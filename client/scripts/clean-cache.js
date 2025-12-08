#!/usr/bin/env node

/**
 * Script to clean Vite and build caches
 * Run this when experiencing cache-related issues
 */

import { rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const cacheDirs = [
    join(rootDir, 'node_modules', '.vite'),
    join(rootDir, 'node_modules', '.cache'),
    join(rootDir, 'dist'),
    join(rootDir, '.tailwindcss-cache'),
];

console.log('🧹 Cleaning caches...\n');

let cleaned = 0;
cacheDirs.forEach((dir) => {
    if (existsSync(dir)) {
        try {
            rmSync(dir, { recursive: true, force: true });
            console.log(`✅ Removed: ${dir}`);
            cleaned++;
        } catch (error) {
            console.error(`❌ Failed to remove ${dir}:`, error.message);
        }
    } else {
        console.log(`⏭️  Skipped (not found): ${dir}`);
    }
});

console.log(`\n✨ Cleaned ${cleaned} cache directory(ies)`);
console.log('💡 You can now restart your dev server with: npm run dev\n');

