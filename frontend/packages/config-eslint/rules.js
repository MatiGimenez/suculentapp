/**
 * Solo objetos de reglas (sin plugins). Seguro para extender configs que ya
 * registran sus propios plugins (p. ej. eslint-config-next).
 *
 * Filosofía: `error` para cosas que rompen el runtime, `warn` para malas
 * prácticas con excepciones legítimas.
 */
const typescriptRules = {
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/explicit-function-return-type': 'off',
}

const reactRules = {
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
}

const baseRules = {
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
  'no-var': 'error',
}

module.exports = { typescriptRules, reactRules, baseRules }
