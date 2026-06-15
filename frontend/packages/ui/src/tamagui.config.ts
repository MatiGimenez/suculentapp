import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui, createTokens } from 'tamagui'

import { bodyFont, headingFont } from './fonts'
import { themes } from './themes'
import { palette } from './tokens'

// El color DEBE pasar por createTokens para que se envuelva en `Variable` y el
// tipo de `typeof config` sea válido; con un objeto crudo la augmentation
// colapsa los style props (backgroundColor, padding, etc.).
const brandColor = createTokens({ color: palette }).color

// Partimos del preset v4 (escalas de space/size/radius/zIndex, media queries,
// shorthands y animaciones) y sobreescribimos fuentes, color y temas de marca.
export const config = createTamagui({
  ...defaultConfig,
  fonts: {
    ...defaultConfig.fonts,
    body: bodyFont,
    heading: headingFont,
  },
  tokens: {
    ...defaultConfig.tokens,
    color: brandColor,
  },
  themes,
})

export type AppConfig = typeof config

// NOTA: no usamos `declare module 'tamagui' { interface TamaguiCustomConfig
// extends AppConfig }`. Con TypeScript 5.9 + Tamagui 2.3 esa augmentation
// colapsa StackStyleBase y elimina TODOS los style props (incluso con el
// defaultConfig sin tocar). En runtime el config real se aplica vía
// TamaguiProvider, así que el theming/tokens funcionan igual; sólo se pierde el
// autocompletado estricto de nombres de token. Revisar al alinear versiones.
// Consecuencia: el prop `animation` tampoco está tipado, así que el motion se
// expresa con hoverStyle/pressStyle (transform/opacity), que aplican en web
// (pseudo-clases) y nativo (estado de press) sin depender del driver.

export default config
