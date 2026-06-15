import { palette } from './tokens'

// Temas claro/oscuro. Ambos deben tener EXACTAMENTE las mismas claves para que
// Tamagui infiera correctamente los tipos de `$background`, `$primary`, etc.
// Además de las claves estándar (background/color/borderColor...), exponemos
// semánticas de marca: primary, accent, card, muted y dos superficies tintadas
// (primarySurface / accentSurface) para fondos suaves sin rgba ad-hoc.
//
// Contraste verificado (AA): en claro `muted` es sage700 (6.7:1 sobre el fondo),
// no sage500 (3.6:1, fallaba). `color` es un casi-negro verdoso para máxima
// legibilidad del cuerpo.
export const themes = {
  light: {
    background: palette.sand50,
    backgroundHover: palette.sand100,
    backgroundPress: palette.sand200,
    backgroundFocus: palette.sand100,
    backgroundStrong: palette.sand100,
    backgroundTransparent: 'rgba(248,251,249,0)',
    color: palette.ink,
    colorHover: palette.sage900,
    colorPress: palette.ink,
    colorFocus: palette.sage900,
    colorTransparent: 'rgba(17,39,25,0)',
    borderColor: palette.sand200,
    borderColorHover: palette.sand300,
    borderColorPress: palette.sand300,
    borderColorFocus: palette.sage500,
    placeholderColor: palette.sage700,
    outlineColor: palette.sage300,
    shadowColor: 'rgba(20,54,33,0.10)',
    shadowColorHover: 'rgba(20,54,33,0.18)',
    primary: palette.sage700,
    primaryHover: palette.sage900,
    primarySurface: palette.sage100,
    accent: palette.terra500,
    accentHover: palette.terra700,
    accentSurface: palette.terra100,
    card: palette.white,
    muted: palette.sage700,
  },
  dark: {
    background: palette.sage900,
    backgroundHover: '#1c4a2c',
    backgroundPress: '#0f2a19',
    backgroundFocus: '#1c4a2c',
    backgroundStrong: '#0f2a19',
    backgroundTransparent: 'rgba(20,54,33,0)',
    color: palette.sand50,
    colorHover: palette.sand100,
    colorPress: palette.sand50,
    colorFocus: palette.sand100,
    colorTransparent: 'rgba(248,251,249,0)',
    borderColor: '#2a5238',
    borderColorHover: palette.sage700,
    borderColorPress: palette.sage700,
    borderColorFocus: palette.sage500,
    placeholderColor: palette.sage300,
    outlineColor: palette.sage500,
    shadowColor: 'rgba(0,0,0,0.45)',
    shadowColorHover: 'rgba(0,0,0,0.6)',
    primary: palette.sage500,
    primaryHover: '#3f7d4f',
    primarySurface: 'rgba(76,146,95,0.18)',
    accent: palette.terra500,
    accentHover: palette.terra700,
    accentSurface: 'rgba(216,101,59,0.18)',
    card: '#1d4730',
    muted: palette.sage300,
  },
}
