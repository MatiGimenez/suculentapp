import { useTheme } from 'tamagui'

// Resuelve el color de un icono a un valor pintable en ambas plataformas.
// Acepta un token de tema (`$muted`) — que se adapta a claro/oscuro — o un color
// CSS/hex literal. En web los tokens devuelven una CSS var (válida en `stroke`);
// en nativo, el valor concreto. Default: `$color` (texto del tema actual).
export function useIconColor(color?: string): string {
  const theme = useTheme()
  const token = color && color[0] === '$' ? color.slice(1) : null

  if (token) {
    const entry = (theme as Record<string, { get?: () => unknown; val?: unknown }>)[token]
    const value = entry?.get?.() ?? entry?.val
    return typeof value === 'string' ? value : 'currentColor'
  }
  if (color) return color

  const fallback = (theme as Record<string, { get?: () => unknown; val?: unknown }>).color
  const value = fallback?.get?.() ?? fallback?.val
  return typeof value === 'string' ? value : 'currentColor'
}
