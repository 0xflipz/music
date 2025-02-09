module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off'
  },
  // Remove useEslintrc and extensions options as they're not valid
  parserOptions: {
    project: './tsconfig.json',
  },
} 