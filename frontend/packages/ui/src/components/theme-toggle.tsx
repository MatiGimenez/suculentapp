import { XStack } from 'tamagui'

import { Icon, type IconName } from '../icons'
import { type ThemeMode, useThemeMode } from '../theme-provider'
import { Text } from './text'

const OPTIONS: { mode: ThemeMode; label: string; icon: IconName }[] = [
  { mode: 'system', label: 'Auto', icon: 'monitor' },
  { mode: 'light', label: 'Claro', icon: 'sun' },
  { mode: 'dark', label: 'Oscuro', icon: 'moon' },
]

// Control segmentado de tema (Auto / Claro / Oscuro). Lee y escribe el modo del
// ThemeProvider; el segmento activo se eleva sobre el riel.
export function ThemeToggle() {
  const { mode, setMode } = useThemeMode()

  return (
    <XStack
      backgroundColor="$backgroundStrong"
      borderRadius={9999}
      padding="$1"
      gap="$1"
      alignSelf="center"
    >
      {OPTIONS.map((opt) => {
        const active = mode === opt.mode
        return (
          <XStack
            key={opt.mode}
            alignItems="center"
            gap="$2"
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderRadius={9999}
            cursor="pointer"
            backgroundColor={active ? '$card' : 'transparent'}
            hoverStyle={{ backgroundColor: active ? '$card' : '$backgroundHover' }}
            pressStyle={{ opacity: 0.85 }}
            onPress={() => setMode(opt.mode)}
          >
            <Icon name={opt.icon} size={15} color={active ? '$primary' : '$muted'} />
            <Text
              fontFamily="$body"
              fontSize="$3"
              fontWeight={active ? '700' : '500'}
              color={active ? '$color' : '$muted'}
            >
              {opt.label}
            </Text>
          </XStack>
        )
      })}
    </XStack>
  )
}
