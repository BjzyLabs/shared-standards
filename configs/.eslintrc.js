module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    // Security and best practices
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    
    // Code quality
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    
    // React specific
    'react/prop-types': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Accessibility
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};