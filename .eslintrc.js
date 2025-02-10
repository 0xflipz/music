module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'max-len': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
} 