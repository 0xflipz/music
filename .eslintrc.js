module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'react/no-unescaped-entities': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'max-len': ['error', { 
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
  },
  // Remove useEslintrc and extensions options as they're not valid
  parserOptions: {
    project: './tsconfig.json',
  },
} 