import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    'node_modules/**',
    '**/node_modules',
    '**/dist',
    '**/coverage',
    '**/dist/',
    '**/examples/',
    '.yarn',
  ]),
  {
    extends: [
      ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
      ),
      eslintPluginUnicorn.configs.recommended,
    ],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-query-selector': 'off',
      quotes: ['error', 'single'],
    },
  },
]);
