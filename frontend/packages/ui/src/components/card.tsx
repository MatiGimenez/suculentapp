import { styled, YStack } from 'tamagui'

// Contenedor base: superficie con borde suave y sombra sutil. La variante
// `interactive` añade hover/press para tarjetas pulsables (ej. PlantCard).
export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: '$card',
  borderRadius: 18,
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: '$4',
  shadowColor: '$shadowColor',
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 1,

  variants: {
    interactive: {
      true: {
        cursor: 'pointer',
        hoverStyle: { borderColor: '$sage300', y: -3, shadowColor: '$shadowColorHover' },
        pressStyle: { y: 0, scale: 0.98, opacity: 0.97 },
      },
    },
    flat: {
      true: { shadowOpacity: 0, shadowRadius: 0 },
    },
  } as const,
})

export type CardProps = React.ComponentProps<typeof Card>
