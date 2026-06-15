// Home / Dashboard — misma UI que la pantalla mobile, construida con el design
// system (@suculentapp/ui). Demuestra la paridad web/native "write once".
import { useNavigate } from 'react-router-dom'
import { alertTypeIcon, alertTypeLabels, useAppStore, useTodayTasks } from '@suculentapp/core'
import {
  Button,
  Card,
  Icon,
  type IconName,
  PlantCard,
  ScreenContainer,
  Text,
  XStack,
  YStack,
} from '@suculentapp/ui'

export function Home() {
  const navigate = useNavigate()
  const user = useAppStore((s) => s.user)
  const plants = useAppStore((s) => s.plants)
  const alerts = useAppStore((s) => s.alerts)
  const completeAlert = useAppStore((s) => s.completeAlert)
  const tasks = useTodayTasks()
  const recent = plants.slice(0, 4)

  return (
    <ScreenContainer>
      <XStack alignItems="center" justifyContent="space-between">
        <YStack gap="$1">
          <Text variant="caption">Hola de nuevo,</Text>
          <XStack alignItems="center" gap="$2">
            <Text variant="title">{user.name}</Text>
            <Icon name="cactus" size={24} color="$primary" />
          </XStack>
        </YStack>
        <YStack
          width={48}
          height={48}
          borderRadius={9999}
          backgroundColor="$sage700"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="$sand50" fontWeight="700" fontSize="$7">
            {user.name?.[0] ?? '?'}
          </Text>
        </YStack>
      </XStack>

      {/* Panel de hoy */}
      <Card backgroundColor="$sage700" borderWidth={0} gap="$3">
        <XStack alignItems="center" gap="$2">
          <Icon name={tasks.length > 0 ? 'droplet' : 'sparkles'} size={20} color="$sand50" />
          <Text variant="subtitle" color="$sand50" flex={1}>
            {tasks.length > 0
              ? `${tasks.length} planta${tasks.length === 1 ? '' : 's'} necesita${
                  tasks.length === 1 ? '' : 'n'
                } atención hoy`
              : 'Todo al día'}
          </Text>
        </XStack>
        {tasks.map(({ alert, plant }) => (
          <XStack
            key={alert.id}
            alignItems="center"
            justifyContent="space-between"
            gap="$2"
            backgroundColor="rgba(15,42,25,0.38)"
            borderRadius={12}
            paddingHorizontal="$3"
            paddingVertical="$2"
          >
            <XStack alignItems="center" gap="$2" flex={1}>
              <Icon name={alertTypeIcon[alert.type] as IconName} size={16} color="$sand50" />
              <Text color="$sand50" fontSize="$3" flex={1}>
                {alertTypeLabels[alert.type]} — {plant?.commonName ?? 'planta'}
              </Text>
            </XStack>
            <Button
              size="sm"
              backgroundColor="$sand50"
              color="$sage700"
              onPress={() => completeAlert(alert.id)}
            >
              Listo
            </Button>
          </XStack>
        ))}
      </Card>

      {/* CTA reconocedor */}
      <Card
        interactive
        backgroundColor="$accentSurface"
        borderColor="$terra300"
        borderStyle="dashed"
        borderWidth={2}
        flat
        onPress={() => navigate('/reconocedor')}
      >
        <XStack alignItems="center" gap="$3">
          <YStack
            width={44}
            height={44}
            borderRadius={12}
            backgroundColor="$terra500"
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="camera" size={22} color="$sand50" />
          </YStack>
          <YStack flex={1} gap="$1">
            <Text color="$terra700" fontWeight="700" fontSize="$6">
              Reconocedor IA
            </Text>
            <Text variant="caption">Identificá cualquier suculenta con una foto</Text>
          </YStack>
          {user.aiScansUsed === 0 ? (
            <YStack
              backgroundColor="$terra700"
              borderRadius={9999}
              paddingHorizontal="$2"
              paddingVertical="$1"
            >
              <Text color="$sand50" fontSize="$1" fontWeight="700" letterSpacing={0.4}>
                1 GRATIS
              </Text>
            </YStack>
          ) : null}
        </XStack>
      </Card>

      {/* Plantas recientes */}
      <XStack alignItems="center" justifyContent="space-between">
        <Text variant="heading">Plantas recientes</Text>
        <XStack
          alignItems="center"
          gap="$1"
          cursor="pointer"
          hoverStyle={{ opacity: 0.7 }}
          onPress={() => navigate('/coleccion')}
        >
          <Text variant="label" color="$accent">
            Ver todas
          </Text>
          <Icon name="arrow-right" size={14} color="$accent" />
        </XStack>
      </XStack>
      <XStack flexWrap="wrap" gap="$3">
        {recent.map((plant) => (
          <PlantCard
            key={plant.id}
            width="47%"
            plant={plant}
            nextAlert={alerts.find((a) => a.plantId === plant.id && a.type === 'watering')}
            onPress={() => navigate('/coleccion')}
          />
        ))}
      </XStack>
    </ScreenContainer>
  )
}
