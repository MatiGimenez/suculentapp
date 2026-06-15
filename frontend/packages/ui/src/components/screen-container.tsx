import type { ReactNode } from 'react'
import { ScrollView, YStack } from 'tamagui'

export type ScreenContainerProps = {
  children: ReactNode
  /** Desactiva el scroll para pantallas que gestionan su propio layout. */
  scroll?: boolean
}

// Lienzo base de cada pantalla: fondo de tema, padding y scroll vertical.
export function ScreenContainer({ children, scroll = true }: ScreenContainerProps) {
  if (!scroll) {
    return (
      <YStack flex={1} backgroundColor="$background" padding="$4" gap="$4">
        {children}
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}
      >
        {children}
      </ScrollView>
    </YStack>
  )
}
