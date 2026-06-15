import react from '@vitejs/plugin-react'
import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { defineConfig } from 'vite'

// SPA con Vite + Tamagui (sin SSR). El plugin de Tamagui carga la config del
// design system y resuelve los entrypoints web. Aliaseamos react-native a
// react-native-web por si alguna dependencia lo requiere.
export default defineConfig({
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    // En el monorepo pnpm, @suculentapp/core/ui se consumen como fuente y sus
    // imports de react podían resolver a una copia distinta que la del app
    // (→ "Invalid hook call"). dedupe fuerza una única instancia.
    dedupe: ['react', 'react-dom', 'react-native-web'],
  },
  define: {
    'process.env.TAMAGUI_TARGET': JSON.stringify('web'),
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'zustand'],
  },
  plugins: [
    react(),
    // Sin extracción de CSS (modo runtime) para un baseline estable; la
    // optimización build-time se puede añadir luego con tamaguiExtractPlugin.
    tamaguiPlugin({
      config: '../../packages/ui/src/tamagui.config.ts',
      components: ['@suculentapp/ui', 'tamagui'],
    }),
  ],
})
