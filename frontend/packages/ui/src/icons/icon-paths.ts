// Geometría de iconos, agnóstica de plataforma. Set de línea consistente
// (rejilla 24, trazo 2, extremos redondeados) basado en Lucide (ISC) + un
// cactus propio para la identidad del producto. La consumen tanto el render web
// (<svg> DOM) como el nativo (react-native-svg) — una sola fuente de verdad.

export type IconElement =
  | { t: 'path'; d: string }
  | { t: 'circle'; cx: number; cy: number; r: number }
  | { t: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
  | { t: 'line'; x1: number; y1: number; x2: number; y2: number }

export const ICONS = {
  home: [
    { t: 'path', d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' },
    {
      t: 'path',
      d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    },
  ],
  leaf: [
    { t: 'path', d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' },
    { t: 'path', d: 'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12' },
  ],
  camera: [
    {
      t: 'path',
      d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
    },
    { t: 'circle', cx: 12, cy: 13, r: 3 },
  ],
  users: [
    { t: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { t: 'path', d: 'M16 3.128a4 4 0 0 1 0 7.744' },
    { t: 'path', d: 'M22 21v-2a4 4 0 0 0-3-3.87' },
    { t: 'circle', cx: 9, cy: 7, r: 4 },
  ],
  user: [
    { t: 'path', d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' },
    { t: 'circle', cx: 12, cy: 7, r: 4 },
  ],
  droplet: [
    {
      t: 'path',
      d: 'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z',
    },
  ],
  sprout: [
    {
      t: 'path',
      d: 'M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3',
    },
    { t: 'path', d: 'M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4' },
    { t: 'path', d: 'M5 21h14' },
  ],
  shovel: [
    {
      t: 'path',
      d: 'M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z',
    },
    {
      t: 'path',
      d: 'M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z',
    },
    { t: 'path', d: 'm9 15 7.879-7.878' },
  ],
  spray: [
    { t: 'path', d: 'M3 3h.01' },
    { t: 'path', d: 'M7 5h.01' },
    { t: 'path', d: 'M11 7h.01' },
    { t: 'path', d: 'M3 7h.01' },
    { t: 'path', d: 'M7 9h.01' },
    { t: 'path', d: 'M3 11h.01' },
    { t: 'rect', x: 15, y: 5, w: 4, h: 4 },
    { t: 'path', d: 'm19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2' },
    { t: 'path', d: 'm13 14 8-2' },
    { t: 'path', d: 'm13 19 8-2' },
  ],
  sparkles: [
    {
      t: 'path',
      d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
    },
    { t: 'path', d: 'M20 2v4' },
    { t: 'path', d: 'M22 4h-4' },
    { t: 'circle', cx: 4, cy: 20, r: 2 },
  ],
  'arrow-right': [
    { t: 'path', d: 'M5 12h14' },
    { t: 'path', d: 'm12 5 7 7-7 7' },
  ],
  'map-pin': [
    {
      t: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { t: 'circle', cx: 12, cy: 10, r: 3 },
  ],
  star: [
    {
      t: 'path',
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
    },
  ],
  heart: [
    {
      t: 'path',
      d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
    },
  ],
  'message-circle': [
    {
      t: 'path',
      d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719',
    },
  ],
  sun: [
    { t: 'circle', cx: 12, cy: 12, r: 4 },
    { t: 'path', d: 'M12 2v2' },
    { t: 'path', d: 'M12 20v2' },
    { t: 'path', d: 'm4.93 4.93 1.41 1.41' },
    { t: 'path', d: 'm17.66 17.66 1.41 1.41' },
    { t: 'path', d: 'M2 12h2' },
    { t: 'path', d: 'M20 12h2' },
    { t: 'path', d: 'm6.34 17.66-1.41 1.41' },
    { t: 'path', d: 'm19.07 4.93-1.41 1.41' },
  ],
  moon: [
    {
      t: 'path',
      d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
    },
  ],
  flower: [
    {
      t: 'path',
      d: 'M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1',
    },
    { t: 'circle', cx: 12, cy: 8, r: 2 },
    { t: 'path', d: 'M12 10v12' },
    { t: 'path', d: 'M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z' },
    { t: 'path', d: 'M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z' },
  ],
  search: [
    { t: 'path', d: 'm21 21-4.34-4.34' },
    { t: 'circle', cx: 11, cy: 11, r: 8 },
  ],
  gauge: [
    { t: 'path', d: 'm12 14 4-4' },
    { t: 'path', d: 'M3.34 19a10 10 0 1 1 17.32 0' },
  ],
  'triangle-alert': [
    { t: 'path', d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' },
    { t: 'path', d: 'M12 9v4' },
    { t: 'path', d: 'M12 17h.01' },
  ],
  info: [
    { t: 'circle', cx: 12, cy: 12, r: 10 },
    { t: 'path', d: 'M12 16v-4' },
    { t: 'path', d: 'M12 8h.01' },
  ],
  monitor: [
    { t: 'rect', x: 2, y: 3, w: 20, h: 14, rx: 2 },
    { t: 'line', x1: 8, y1: 21, x2: 16, y2: 21 },
    { t: 'line', x1: 12, y1: 17, x2: 12, y2: 21 },
  ],
  // Cactus propio — la firma de la marca.
  cactus: [
    { t: 'path', d: 'M9 21V8a3 3 0 0 1 6 0v13' },
    { t: 'path', d: 'M9 13H6a2 2 0 0 1-2-2v-1' },
    { t: 'path', d: 'M15 11h2a2 2 0 0 1 2 2v1' },
    { t: 'path', d: 'M7 21h10' },
  ],
} satisfies Record<string, IconElement[]>

export type IconName = keyof typeof ICONS

export type IconProps = {
  name: IconName
  /** Lado del cuadro en px (rejilla 24). */
  size?: number
  /** Token de tema (`$muted`, `$primary`…) o color CSS/hex. Default `$color`. */
  color?: string
  /** Rellena en vez de trazar (útil para estrella/corazón activos). */
  fill?: boolean
  strokeWidth?: number
}
