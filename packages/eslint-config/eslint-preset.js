module.exports = {
  extends: ['next', 'prettier', 'next/core-web-vitals'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    'no-console': 1,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-curly-brace-presence': [
      'error',
      {
        'props': 'never',
        'children': 'never'
      }
    ]
  },
}
