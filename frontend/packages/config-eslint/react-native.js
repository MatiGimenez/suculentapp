/** Config para apps/mobile: TS + hooks (Expo / React Native). */
const tseslint = require('typescript-eslint')
const reactHooks = require('eslint-plugin-react-hooks')
const { typescriptRules, reactRules, baseRules } = require('./rules')

module.exports = tseslint.config(...tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx}'],
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    ...typescriptRules,
    ...reactRules,
    ...baseRules,
  },
})
