import js from '@eslint/js';
import globals from 'globals';
import prettierFn from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      '.env',
      '.env.*',
      'build',
      '.env.example',
      '.DS_Store',
      'npm-debug.log*',
    ],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['log', 'error', 'info', 'warn'] }],
      'prefer-const': 'warn',
    },
  },
  prettierFn,
];
