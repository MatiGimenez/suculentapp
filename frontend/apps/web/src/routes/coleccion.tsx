// Mi colección — búsqueda + filtros por estado, grid de PlantCard del DS.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { PlantStatus } from '@suculentapp/core'
import { statusLabels, useCollection } from '@suculentapp/core'
import {
  Button,
  Icon,
  Input,
  PlantCard,
  ScreenContainer,
  Text,
  XStack,
  YStack,
} from '@suculentapp/ui'

const filters: { value: PlantStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: statusLabels.active },
  { value: 'propagating', label: statusLabels.propagating },
  { value: 'sold', label: statusLabels.sold },
]

export function Coleccion() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<PlantStatus | 'all'>('all')
  const plants = useCollection({
    query: query || undefined,
    status: status === 'all' ? undefined : status,
  })

  return (
    <ScreenContainer>
      <Text variant="title">Mi colección</Text>

      <XStack alignItems="center">
        <YStack position="absolute" left="$3" zIndex={1}>
          <Icon name="search" size={18} color="$muted" />
        </YStack>
        <Input
          flex={1}
          paddingLeft={42}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por especie o nombre…"
        />
      </XStack>

      <XStack gap="$2" flexWrap="wrap">
        {filters.map((f) => (
          <Button
            key={f.value}
            size="sm"
            tone={status === f.value ? 'primary' : 'outline'}
            onPress={() => setStatus(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </XStack>

      {plants.length === 0 ? (
        <YStack alignItems="center" gap="$2" paddingVertical="$8">
          <Icon name="cactus" size={40} color="$muted" strokeWidth={1.5} />
          <Text variant="caption" textAlign="center">
            No hay plantas que coincidan
          </Text>
        </YStack>
      ) : (
        <XStack flexWrap="wrap" gap="$3">
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              width="47%"
              plant={plant}
              onPress={() => navigate('/coleccion')}
            />
          ))}
        </XStack>
      )}
    </ScreenContainer>
  )
}
