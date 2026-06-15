// Render web del icono: <svg> DOM nativo. Metro elige `icon.native.tsx` en su
// lugar; vite resuelve este archivo. Ambos comparten ICONS y useIconColor.
import { ICONS, type IconProps } from './icon-paths'
import { useIconColor } from './use-icon-color'

export function Icon({ name, size = 24, color, fill = false, strokeWidth = 2 }: IconProps) {
  const resolved = useIconColor(color)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? resolved : 'none'}
      stroke={fill ? 'none' : resolved}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden
    >
      {ICONS[name].map((el, i) =>
        el.t === 'path' ? (
          <path key={i} d={el.d} />
        ) : el.t === 'circle' ? (
          <circle key={i} cx={el.cx} cy={el.cy} r={el.r} />
        ) : el.t === 'line' ? (
          <line key={i} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} />
        ) : (
          <rect key={i} x={el.x} y={el.y} width={el.w} height={el.h} rx={'rx' in el ? el.rx : undefined} />
        ),
      )}
    </svg>
  )
}
