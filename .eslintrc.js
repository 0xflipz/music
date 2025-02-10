module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
    '@next/next/no-img-element': 'off',
    'max-len': ['warn', { 
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true
    }],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
} 