// Perfil — avatar, reputación, plan y estadísticas de la colección.
import { useAppStore } from '@suculentapp/core'
import {
  Badge,
  Card,
  Icon,
  ScreenContainer,
  Text,
  ThemeToggle,
  XStack,
  YStack,
} from '@suculentapp/ui'

export function Perfil() {
  const user = useAppStore((s) => s.user)
  const plants = useAppStore((s) => s.plants)
  const propagating = plants.filter((p) => p.status === 'propagating').length

  const stats = [
    { value: plants.length, label: 'Plantas' },
    { value: propagating, label: 'Propagando' },
    { value: user.aiScansUsed, label: 'Scans IA' },
  ]

  return (
    <ScreenContainer>
      <YStack alignItems="center" gap="$2">
        <YStack
          width={88}
          height={88}
          borderRadius={9999}
          backgroundColor="$sage700"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="$sand50" variant="title">
            {user.name?.[0] ?? '?'}
          </Text>
        </YStack>
        <Text variant="heading">{user.name}</Text>
        <XStack alignItems="center" gap="$1">
          <Icon name="map-pin" size={14} color="$muted" />
          <Text variant="caption">{user.location}</Text>
        </XStack>
        <XStack gap="$2">
          <Badge tone="terra" icon="star" iconFill>
            {user.reputation.toFixed(1)}
          </Badge>
          <Badge tone="sand" icon={user.plan === 'premium' ? 'sparkles' : undefined}>
            {user.plan === 'premium' ? 'Premium' : 'Plan Free'}
          </Badge>
        </XStack>
      </YStack>

      <XStack gap="$3">
        {stats.map((s) => (
          <Card key={s.label} flex={1} alignItems="center" gap="$1">
            <Text variant="title" color="$primary">
              {s.value}
            </Text>
            <Text variant="label">{s.label}</Text>
          </Card>
        ))}
      </XStack>

      {/* Apariencia */}
      <YStack gap="$2" paddingTop="$2">
        <Text variant="label">Apariencia</Text>
        <ThemeToggle />
      </YStack>
    </ScreenContainer>
  )
}
