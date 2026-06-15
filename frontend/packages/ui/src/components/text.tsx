import { styled, Text as TamaguiText } from 'tamagui'

// Tipografía con variantes semánticas. Display/title/heading usan Fraunces;
// el resto Karla. Se usa como <Text variant="title">...</Text>.
export const Text = styled(TamaguiText, {
  name: 'Text',
  fontFamily: '$body',
  color: '$color',

  variants: {
    variant: {
      // Display: Fraunces Black — el momento editorial, máximo carácter.
      display: {
        fontFamily: '$heading',
        fontSize: '$12',
        lineHeight: '$12',
        fontWeight: '900',
        letterSpacing: -1.2,
      },
      title: {
        fontFamily: '$heading',
        fontSize: '$10',
        lineHeight: '$10',
        fontWeight: '700',
        letterSpacing: -0.6,
      },
      heading: {
        fontFamily: '$heading',
        fontSize: '$8',
        lineHeight: '$8',
        fontWeight: '600',
        letterSpacing: -0.3,
      },
      subtitle: {
        fontFamily: '$heading',
        fontSize: '$7',
        lineHeight: '$7',
        fontWeight: '500',
        letterSpacing: -0.2,
      },
      body: {
        fontSize: '$5',
        lineHeight: '$5',
      },
      caption: {
        fontSize: '$3',
        lineHeight: '$4',
        color: '$muted',
      },
      // Eyebrow / etiqueta de dato — Karla en mayúsculas, tracking abierto.
      label: {
        fontSize: '$2',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: '$muted',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'body',
  },
})

export type TextProps = React.ComponentProps<typeof Text>
