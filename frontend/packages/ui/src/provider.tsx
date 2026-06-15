import type { ReactNode } from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'

import { config } from './tamagui.config'

type UIProviderProps = {
  children: ReactNode
  defaultTheme?: TamaguiProviderProps['defaultTheme']
} & Omit<TamaguiProviderProps, 'config' | 'children' | 'defaultTheme'>

// Punto de entrada único que ambos shells (web/mobile) envuelven alrededor de
// su árbol. Por defecto arranca en tema claro.
export function UIProvider({ children, defaultTheme = 'light', ...props }: UIProviderProps) {
  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme} {...props}>
      {children}
    </TamaguiProvider>
  )
}
