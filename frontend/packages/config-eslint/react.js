/** Config completa para apps web standalone: TS + React + hooks. */
const tseslint = require('typescript-eslint')
const reactPlugin = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const { typescriptRules, reactRules, baseRules } = require('./rules')

module.exports = tseslint.config(...tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx,js,jsx}'],
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooks,
  },
  settings: { react: { version: 'detect' } },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    ...typescriptRules,
    ...reactRules,
    ...baseRules,
  },
})
