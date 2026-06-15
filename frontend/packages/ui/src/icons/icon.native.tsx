// Render nativo del icono con react-native-svg (ya presente en apps/mobile).
// Metro resuelve este archivo para iOS/Android; web usa `icon.tsx`.
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg'

import { ICONS, type IconProps } from './icon-paths'
import { useIconColor } from './use-icon-color'

export function Icon({ name, size = 24, color, fill = false, strokeWidth = 2 }: IconProps) {
  const resolved = useIconColor(color)
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill ? resolved : 'none'}
      stroke={fill ? 'none' : resolved}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name].map((el, i) =>
        el.t === 'path' ? (
          <Path key={i} d={el.d} />
        ) : el.t === 'circle' ? (
          <Circle key={i} cx={el.cx} cy={el.cy} r={el.r} />
        ) : el.t === 'line' ? (
          <Line key={i} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} />
        ) : (
          <Rect key={i} x={el.x} y={el.y} width={el.w} height={el.h} rx={'rx' in el ? el.rx : undefined} />
        ),
      )}
    </Svg>
  )
}
