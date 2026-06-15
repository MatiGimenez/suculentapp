// Paleta "invernadero": verde botánico vivo sobre papel claro y un cálido
// destello de floración (clay-coral). Reemplaza a la vieja paleta "desierto"
// (arena cálida + salvia apagada): el fondo crema se sustituye por un blanco
// con un susurro verde para que los verdes respiren, la salvia se profundiza a
// un verde más seguro y la terracota se aviva.
//
// Todos los valores derivan de OKLCH y están verificados para contraste WCAG AA
// (cuerpo ≥4.5:1, texto grande/bold ≥3:1). Las CLAVES se mantienen idénticas a
// la paleta anterior: son la fuente de verdad de los tokens `$sage700`,
// `$sand50`, etc. usados en web y mobile. Sólo cambian los valores (+ terra100).
export const palette = {
  // Papel — neutro casi blanco con un matiz verde mínimo (no crema cálida).
  sand50: '#f8fbf9',
  sand100: '#eff4f1',
  sand200: '#dee5e0',
  sand300: '#c6cfc8',
  // Verde — el alma de la marca. Más profundo y saturado: de hoja a bosque.
  sage100: '#dcf0df',
  sage300: '#9ac8a2',
  sage500: '#4c925f',
  sage700: '#25653b',
  sage900: '#143621',
  // Floración cálida — clay-coral más vivo que la terracota apagada anterior.
  terra100: '#fce2d3',
  terra300: '#e9af91',
  terra500: '#d8653b',
  terra700: '#9d4220',
  white: '#ffffff',
  ink: '#112719',
} as const

export type PaletteColor = keyof typeof palette
