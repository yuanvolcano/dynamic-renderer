export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
