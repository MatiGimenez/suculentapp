// Reconocedor IA — placeholder. Se construirá con el flujo de cámara/scan;
// por ahora muestra el lienzo del design system listo para esa feature.
import { Card, Icon, ScreenContainer, Text, YStack } from '@suculentapp/ui'

export function Reconocedor() {
  return (
    <ScreenContainer>
      <Text variant="title">Reconocedor IA</Text>
      <Card
        backgroundColor="$sage900"
        borderWidth={0}
        height={320}
        alignItems="center"
        justifyContent="center"
      >
        <Icon name="camera" size={56} color="$sage300" strokeWidth={1.5} />
        <YStack paddingTop="$3" maxWidth={240}>
          {/* Sobre el panel oscuro la caption pide texto claro: el variant
              "caption" fija $muted (verde profundo, ilegible aquí), así que se
              estiliza la tipografía a mano con un verde claro legible. */}
          <Text fontSize="$3" lineHeight="$4" textAlign="center" color="$sage300">
            Apuntá a una suculenta para identificarla. (Pantalla en construcción)
          </Text>
        </YStack>
      </Card>
    </ScreenContainer>
  )
}
