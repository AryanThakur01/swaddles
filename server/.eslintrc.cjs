module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  files: ['src/**/*.ts'],
  extends: [
    'airbnb',
    'standard-with-typescript',
    'plugin: @typescript-eslint/recommended',
    'plugin: import/errors',
    'plugin: import/warnings',
    'plugin: import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'no-console': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import-resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
