import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { isWeb, Theme } from 'tamagui'

import { UIProvider } from './provider'

export type ThemeMode = 'system' | 'light' | 'dark'
export type ColorScheme = 'light' | 'dark'

type ThemeContextValue = {
  /** Preferencia elegida por el usuario. */
  mode: ThemeMode
  /** Esquema efectivo tras resolver `system`. */
  scheme: ColorScheme
  setMode: (mode: ThemeMode) => void
  /** Alterna claro/oscuro de forma explícita (deja de seguir al sistema). */
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'suculentapp:theme-mode'

function readStoredMode(): ThemeMode | null {
  if (!isWeb || typeof localStorage === 'undefined') return null
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' || value === 'system' ? value : null
}

// Provee tema claro/oscuro con seguimiento del sistema + override manual
// persistente (localStorage en web). En nativo sigue al sistema y permite
// alternar durante la sesión (la persistencia nativa requeriría AsyncStorage).
// Envuelve a UIProvider, así que las apps usan ESTE en la raíz.
export function ThemeProvider({
  children,
  defaultMode = 'system',
}: {
  children: ReactNode
  defaultMode?: ThemeMode
}) {
  const systemScheme = (useColorScheme() ?? 'light') as ColorScheme
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode() ?? defaultMode)
  const scheme: ColorScheme = mode === 'system' ? systemScheme : mode

  // Refleja el esquema en <html data-theme> para que el fondo del documento
  // (definido en CSS) acompañe al tema de Tamagui.
  useEffect(() => {
    if (!isWeb || typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', scheme)
  }, [scheme])

  const value = useMemo<ThemeContextValue>(() => {
    const setMode = (next: ThemeMode) => {
      setModeState(next)
      if (isWeb && typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next)
    }
    return {
      mode,
      scheme,
      setMode,
      toggle: () => setMode(scheme === 'dark' ? 'light' : 'dark'),
    }
  }, [mode, scheme])

  return (
    <ThemeContext.Provider value={value}>
      <UIProvider defaultTheme={scheme}>
        <Theme name={scheme}>{children}</Theme>
      </UIProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode debe usarse dentro de <ThemeProvider>')
  return ctx
}
