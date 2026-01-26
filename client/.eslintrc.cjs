module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vite.config.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Disable prop-types validation
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused vars with _ prefix
    'react/no-unescaped-entities': 'off', // Allow unescaped entities
    'react/display-name': 'off', // Disable display name requirement
    'no-loss-of-precision': 'warn', // Allow loss of precision (warn instead of error)
  },
}
