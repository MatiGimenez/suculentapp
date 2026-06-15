import { Input as TamaguiInput, styled } from 'tamagui'

// Campo de texto de marca, consistente en web y nativo.
export const Input = styled(TamaguiInput, {
  name: 'AppInput',
  fontFamily: '$body',
  backgroundColor: '$card',
  borderColor: '$borderColor',
  borderWidth: 1,
  borderRadius: 12,
  color: '$color',
  placeholderTextColor: '$placeholderColor',
  height: 44,
  paddingHorizontal: '$3',
  fontSize: '$5',

  focusStyle: {
    borderColor: '$primary',
    outlineWidth: 0,
  },
})

export type InputProps = React.ComponentProps<typeof Input>
