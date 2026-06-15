import { createFont, isWeb } from 'tamagui'

// Escalas compartidas por ambas familias. Las claves numéricas se referencian
// en componentes como fontSize="$5", lineHeight="$5", etc.
const size = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  5: 15,
  6: 16,
  7: 18,
  8: 20,
  9: 23,
  10: 28,
  11: 34,
  12: 42,
  13: 50,
  14: 62,
  true: 15,
}

const lineHeight = {
  1: 16,
  2: 17,
  3: 18,
  4: 20,
  5: 22,
  6: 24,
  7: 26,
  8: 28,
  9: 30,
  10: 36,
  11: 42,
  12: 50,
  13: 58,
  14: 70,
  true: 22,
}

const weight = { 1: '300', 4: '400', 5: '500', 6: '600', 7: '700', 8: '800', 9: '900', true: '400' }

// Tracking por tamaño: se abre en cuerpos/etiquetas pequeñas (legibilidad) y se
// cierra en los grandes (Fraunces gana densidad y elegancia con tracking
// negativo). Suelo respetado: nunca por debajo de -0.04em (≈ -2px a 62px).
const letterSpacing = {
  1: 0.2,
  2: 0.1,
  3: 0,
  4: 0,
  5: 0,
  6: -0.1,
  7: -0.2,
  8: -0.3,
  9: -0.4,
  10: -0.6,
  11: -0.9,
  12: -1.2,
  13: -1.6,
  14: -2,
  true: 0,
}

// En nativo Tamagui usa `face` para mapear pesos a las familias concretas que
// expo-font carga (ver @expo-google-fonts/fraunces y /karla en apps/mobile).
const headingFace = {
  300: { normal: 'Fraunces_300Light' },
  400: { normal: 'Fraunces_400Regular' },
  500: { normal: 'Fraunces_500Medium' },
  600: { normal: 'Fraunces_600SemiBold' },
  700: { normal: 'Fraunces_700Bold' },
  900: { normal: 'Fraunces_900Black' },
}

const bodyFace = {
  300: { normal: 'Karla_300Light' },
  400: { normal: 'Karla_400Regular' },
  500: { normal: 'Karla_500Medium' },
  600: { normal: 'Karla_600SemiBold' },
  700: { normal: 'Karla_700Bold' },
  800: { normal: 'Karla_800ExtraBold' },
}

// Display: Fraunces (serif orgánico, elegante). Body: Karla (sans humanista).
// En web las familias se cargan vía @fontsource (ver apps/web/src/main.tsx).
export const headingFont = createFont({
  family: isWeb ? 'Fraunces, Georgia, serif' : 'Fraunces',
  size,
  lineHeight,
  weight,
  letterSpacing,
  face: headingFace,
})

export const bodyFont = createFont({
  family: isWeb ? 'Karla, system-ui, sans-serif' : 'Karla',
  size,
  lineHeight,
  weight,
  letterSpacing,
  face: bodyFace,
})
