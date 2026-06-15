// === Configuración / theming ===
export { config, default as tamaguiConfig, type AppConfig } from './tamagui.config'
export { UIProvider } from './provider'
export {
  ThemeProvider,
  useThemeMode,
  type ThemeMode,
  type ColorScheme,
} from './theme-provider'
export { palette, type PaletteColor } from './tokens'
export { bodyFont, headingFont } from './fonts'
export { themes } from './themes'

// === Iconografía (un set de línea compartido web/native) ===
export { Icon, ICONS, type IconName, type IconProps } from './icons'

// === Componentes del design system ===
export { Text, type TextProps } from './components/text'
export { ThemeToggle } from './components/theme-toggle'
export { Button, type ButtonProps } from './components/button'
export { Card, type CardProps } from './components/card'
export { Input, type InputProps } from './components/input'
export { Badge, type BadgeTone } from './components/badge'
export { PlantCard, type PlantCardProps } from './components/plant-card'
export { TabBar, type TabItem, type TabBarProps } from './components/tab-bar'
export { ScreenContainer, type ScreenContainerProps } from './components/screen-container'

// === Primitivas de Tamagui re-exportadas (un único punto de import) ===
export {
  XStack,
  YStack,
  Spacer,
  Separator,
  ScrollView,
  Image,
  Theme,
  View,
  useTheme,
  useMedia,
  getTokens,
} from 'tamagui'
