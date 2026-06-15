import type { ReactNode } from 'react'
import { styled, Text, XStack } from 'tamagui'

import { Icon, type IconName } from '../icons'

export type BadgeTone = 'sage' | 'terra' | 'sand'

const BadgeFrame = styled(XStack, {
  name: 'Badge',
  alignItems: 'center',
  gap: '$1',
  borderRadius: 9999,
  paddingHorizontal: '$2',
  paddingVertical: '$1',

  variants: {
    tone: {
      sage: { backgroundColor: '$sage100' },
      terra: { backgroundColor: '$terra100' },
      sand: { backgroundColor: '$sand200' },
    },
  } as const,

  defaultVariants: {
    tone: 'sage',
  },
})

const toneTextColor: Record<BadgeTone, '$sage700' | '$terra700' | '$sage900'> = {
  sage: '$sage700',
  terra: '$terra700',
  sand: '$sage900',
}

export function Badge({
  children,
  tone = 'sage',
  icon,
  iconFill = false,
  ...props
}: {
  children: ReactNode
  tone?: BadgeTone
  /** Icono de línea opcional, antepuesto al texto. */
  icon?: IconName
  iconFill?: boolean
} & React.ComponentProps<typeof BadgeFrame>) {
  return (
    <BadgeFrame tone={tone} {...props}>
      {icon ? <Icon name={icon} size={12} color={toneTextColor[tone]} fill={iconFill} /> : null}
      <Text
        fontFamily="$body"
        fontSize="$1"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing={0.5}
        color={toneTextColor[tone]}
      >
        {children}
      </Text>
    </BadgeFrame>
  )
}
