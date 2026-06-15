// Shell de navegación: UIProvider de Tamagui + bottom navigation con 5 tabs
// (TabBar del design system) + carga de fuentes Fraunces/Karla.
import { useState } from 'react'
import { StatusBar } from 'react-native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {
  Fraunces_300Light,
  Fraunces_400Regular,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Fraunces_900Black,
} from '@expo-google-fonts/fraunces'
import {
  Karla_300Light,
  Karla_400Regular,
  Karla_500Medium,
  Karla_600SemiBold,
  Karla_700Bold,
  Karla_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/karla'
import { TabBar, ThemeProvider, useThemeMode, YStack, type TabItem } from '@suculentapp/ui'

import { CollectionScreen } from '~/src/screens/CollectionScreen'
import { CommunityScreen } from '~/src/screens/CommunityScreen'
import { HomeScreen } from '~/src/screens/HomeScreen'
import { ProfileScreen } from '~/src/screens/ProfileScreen'
import { ScannerScreen } from '~/src/screens/ScannerScreen'

const tabs: TabItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'collection', label: 'Colección', icon: 'leaf' },
  { key: 'scan', label: 'Scan', icon: 'camera' },
  { key: 'community', label: 'Comunidad', icon: 'users' },
  { key: 'profile', label: 'Perfil', icon: 'user' },
]

const screens: Record<string, () => React.JSX.Element> = {
  home: HomeScreen,
  collection: CollectionScreen,
  scan: ScannerScreen,
  community: CommunityScreen,
  profile: ProfileScreen,
}

// Aplica los insets manualmente (más fiable que el componente SafeAreaView en
// Android con edge-to-edge, obligatorio desde Android 15 / Expo SDK 55).
function AppShell() {
  const [active, setActive] = useState('home')
  const insets = useSafeAreaInsets()
  const { scheme } = useThemeMode()
  const ActiveScreen = screens[active] ?? HomeScreen

  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <YStack flex={1}>
        <ActiveScreen />
      </YStack>
      <YStack backgroundColor="$background" paddingBottom={insets.bottom}>
        <TabBar items={tabs} activeKey={active} onSelect={setActive} />
      </YStack>
    </YStack>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_300Light,
    Fraunces_400Regular,
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Fraunces_900Black,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold,
  })

  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
