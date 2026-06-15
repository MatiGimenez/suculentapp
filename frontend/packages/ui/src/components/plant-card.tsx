import type { ComponentProps } from 'react'
import type { Alert, Plant } from '@suculentapp/core'
import { statusLabels } from '@suculentapp/core'
import { XStack, YStack } from 'tamagui'

import { Icon, type IconName } from '../icons'
import { Badge } from './badge'
import { Card } from './card'
import { Text } from './text'

// Variedad botánica determinista por planta (en vez de emoji surtidos).
const plantIcons: IconName[] = ['cactus', 'leaf', 'sprout', 'flower']

export type PlantCardProps = {
  plant: Plant
  nextAlert?: Alert
  onPress?: () => void
} & Omit<ComponentProps<typeof Card>, 'children' | 'onPress'>

// Tarjeta de planta — agnóstica de plataforma. La navegación se inyecta vía
// `onPress` (router en web, navigation en mobile), no se acopla al shell.
// Acepta props extra de Card (p. ej. width) para usarse en grids.
export function PlantCard({ plant, nextAlert, onPress, ...cardProps }: PlantCardProps) {
  const icon = plantIcons[plant.id.charCodeAt(plant.id.length - 1) % plantIcons.length] ?? 'leaf'
  const due =
    nextAlert &&
    new Date(nextAlert.nextDue).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })

  return (
    <Card interactive padding={0} overflow="hidden" onPress={onPress} {...cardProps}>
      <YStack
        height={96}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$primarySurface"
      >
        <Icon name={icon} size={40} color="$primary" strokeWidth={1.75} />
      </YStack>
      <YStack padding="$3" gap="$1">
        <Text variant="body" fontWeight="700" numberOfLines={1}>
          {plant.commonName ?? 'Sin nombre'}
        </Text>
        <Text variant="caption" fontStyle="italic" numberOfLines={1}>
          {plant.species ?? '—'}
        </Text>
        <XStack alignItems="center" justifyContent="space-between" paddingTop="$1">
          <Badge tone={plant.status === 'active' ? 'sage' : 'terra'}>
            {statusLabels[plant.status]}
          </Badge>
          {due ? (
            <XStack alignItems="center" gap="$1">
              <Icon name="droplet" size={13} color="$muted" />
              <Text variant="caption">{due}</Text>
            </XStack>
          ) : null}
        </XStack>
      </YStack>
    </Card>
  )
}
