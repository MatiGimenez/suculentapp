import type { ReactNode } from 'react'
import { type GetProps, styled, XStack } from 'tamagui'

import { Text } from './text'

// Construido sobre XStack (no sobre el Button "sizable" de Tamagui) para evitar
// que `size="sm"` choque con el sistema de size tokens del Button — eso
// disparaba el warning "No font size found sm".
const ButtonFrame = styled(XStack, {
  name: 'AppButton',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  borderRadius: 9999,
  borderWidth: 0,
  cursor: 'pointer',
  userSelect: 'none',
  pressStyle: { opacity: 0.92, scale: 0.97 },

  variants: {
    tone: {
      primary: {
        backgroundColor: '$primary',
        hoverStyle: { backgroundColor: '$primaryHover' },
      },
      accent: {
        backgroundColor: '$accent',
        hoverStyle: { backgroundColor: '$accentHover' },
      },
      ghost: {
        backgroundColor: 'transparent',
        hoverStyle: { backgroundColor: '$sage100' },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        hoverStyle: { borderColor: '$primary' },
      },
    },
    size: {
      sm: { height: 36, paddingHorizontal: '$3' },
      md: { height: 44, paddingHorizontal: '$4' },
      lg: { height: 52, paddingHorizontal: '$5' },
    },
    block: {
      true: { alignSelf: 'stretch', flexGrow: 1 },
    },
  } as const,

  defaultVariants: {
    tone: 'primary',
    size: 'md',
  },
})

type Tone = 'primary' | 'accent' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const toneTextColor: Record<Tone, string> = {
  primary: '$sand50',
  accent: '$sand50',
  ghost: '$primary',
  outline: '$color',
}

const sizeFontSize: Record<Size, '$3' | '$5' | '$6'> = {
  sm: '$3',
  md: '$5',
  lg: '$6',
}

export type ButtonProps = GetProps<typeof ButtonFrame> & {
  children?: ReactNode
  /** Sobrescribe el color del texto (p. ej. botones sobre fondo de marca). */
  color?: string
}

export function Button({ children, tone = 'primary', size = 'md', color, ...props }: ButtonProps) {
  const resolvedTone = (tone ?? 'primary') as Tone
  const resolvedSize = (size ?? 'md') as Size

  return (
    <ButtonFrame tone={resolvedTone} size={resolvedSize} {...props}>
      {typeof children === 'string' ? (
        <Text
          fontFamily="$body"
          fontWeight="700"
          fontSize={sizeFontSize[resolvedSize]}
          color={color ?? toneTextColor[resolvedTone]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </ButtonFrame>
  )
}
