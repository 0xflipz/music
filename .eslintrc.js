module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'max-len': ['error', { 
      code: 140,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true
    }],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
} 