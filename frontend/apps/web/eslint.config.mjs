import suculentapp from '@suculentapp/config-eslint/react'
import prettier from 'eslint-config-prettier'

// App web standalone (Vite + React). Reglas TS + React + hooks del paquete
// compartido; prettier al final para desactivar conflictos de formato.
export default [
  ...suculentapp,
  prettier,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.tamagui/**',
      'vite.config.ts',
      'eslint.config.mjs',
    ],
  },
]
