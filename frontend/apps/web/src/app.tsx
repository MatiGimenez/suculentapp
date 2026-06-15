import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { TabBar, ThemeProvider, YStack, type TabItem } from '@suculentapp/ui'

import { Coleccion } from './routes/coleccion'
import { Comunidad } from './routes/comunidad'
import { Home } from './routes/home'
import { Perfil } from './routes/perfil'
import { Reconocedor } from './routes/reconocedor'

// Las keys del TabBar son las rutas — el shell web traduce onSelect a navegación.
const tabs: TabItem[] = [
  { key: '/', label: 'Home', icon: 'home' },
  { key: '/coleccion', label: 'Colección', icon: 'leaf' },
  { key: '/reconocedor', label: 'Scan', icon: 'camera' },
  { key: '/comunidad', label: 'Comunidad', icon: 'users' },
  { key: '/perfil', label: 'Perfil', icon: 'user' },
]

export function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const activeKey =
    tabs.find((t) => (t.key === '/' ? pathname === '/' : pathname.startsWith(t.key)))?.key ?? '/'

  return (
    <ThemeProvider>
      {/* Layout ancho de teléfono, centrado (mobile-first), igual que en Next. */}
      <YStack flex={1} width="100%" maxWidth={480} alignSelf="center">
        <YStack flex={1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coleccion" element={<Coleccion />} />
            <Route path="/reconocedor" element={<Reconocedor />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </YStack>
        <TabBar items={tabs} activeKey={activeKey} onSelect={(key) => navigate(key)} />
      </YStack>
    </ThemeProvider>
  )
}
