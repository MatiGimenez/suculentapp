const suculentapp = require('@suculentapp/config-eslint/react-native')
const prettier = require('eslint-config-prettier')

module.exports = [
  ...suculentapp,
  prettier,
  {
    ignores: [
      '.expo/**',
      'node_modules/**',
      'babel.config.js',
      'eslint.config.js',
      'metro.config.js',
    ],
  },
]
