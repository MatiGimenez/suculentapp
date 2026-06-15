import { Text, XStack, YStack } from 'tamagui'

import { Icon, type IconName } from '../icons'

export type TabItem = {
  key: string
  label: string
  icon: IconName
}

export type TabBarProps = {
  items: readonly TabItem[]
  activeKey: string
  onSelect: (key: string) => void
}

// Barra de navegación inferior — sólo visual. El comportamiento (cambiar de
// ruta/screen) lo decide cada shell vía `onSelect`. Iconos de línea del DS.
export function TabBar({ items, activeKey, onSelect }: TabBarProps) {
  return (
    <XStack
      borderTopWidth={1}
      borderTopColor="$borderColor"
      backgroundColor="$background"
      paddingBottom="$2"
    >
      {items.map((item) => {
        const active = item.key === activeKey
        return (
          <YStack
            key={item.key}
            flex={1}
            alignItems="center"
            paddingVertical="$2"
            gap="$1"
            cursor="pointer"
            onPress={() => onSelect(item.key)}
            pressStyle={{ opacity: 0.6 }}
          >
            <YStack
              width={40}
              height={28}
              borderRadius={9999}
              alignItems="center"
              justifyContent="center"
              backgroundColor={active ? '$primarySurface' : 'transparent'}
            >
              <Icon name={item.icon} size={20} color={active ? '$primary' : '$muted'} />
            </YStack>
            <Text
              fontFamily="$body"
              fontSize={11}
              lineHeight={13}
              color={active ? '$primary' : '$muted'}
              fontWeight={active ? '700' : '500'}
            >
              {item.label}
            </Text>
          </YStack>
        )
      })}
    </XStack>
  )
}
