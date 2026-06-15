// Mi colección — lista con búsqueda y filtros por estado. Theme-aware: los
// colores se derivan del tema activo (claro/oscuro) vía useTheme.
import { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import type { PlantStatus } from '@suculentapp/core'
import { statusLabels, useCollection } from '@suculentapp/core'
import { Icon, palette, useTheme } from '@suculentapp/ui'

const filters: { value: PlantStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: statusLabels.active },
  { value: 'propagating', label: statusLabels.propagating },
  { value: 'sold', label: statusLabels.sold },
]

export function CollectionScreen() {
  const t = useTheme()
  const cv = (k: string): string =>
    ((t as Record<string, { get?: () => unknown; val?: unknown }>)[k]?.get?.() ??
      (t as Record<string, { val?: unknown }>)[k]?.val) as string
  const styles = useMemo(() => makeStyles(cv), [t])

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<PlantStatus | 'all'>('all')
  const plants = useCollection({
    query: query || undefined,
    status: status === 'all' ? undefined : status,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi colección</Text>
      <View style={styles.searchWrap}>
        <Icon name="search" size={18} color="$muted" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por especie o nombre…"
          placeholderTextColor={cv('muted')}
          style={styles.search}
        />
      </View>
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <Pressable
            key={f.value}
            onPress={() => setStatus(f.value)}
            style={[styles.filterChip, status === f.value && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, status === f.value && styles.filterTextActive]}>
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={plants}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="cactus" size={40} color="$muted" strokeWidth={1.5} />
            <Text style={styles.emptyText}>No hay plantas que coincidan</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.thumb}>
              <Icon name="leaf" size={22} color="$primary" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.commonName ?? 'Sin nombre'}</Text>
              <Text style={styles.species}>{item.species}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{statusLabels[item.status]}</Text>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const makeStyles = (cv: (k: string) => string) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, gap: 12 },
    title: { fontSize: 28, fontWeight: '900', color: cv('color') },
    searchWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: cv('card'),
      borderWidth: 1,
      borderColor: cv('borderColor'),
      borderRadius: 16,
      paddingHorizontal: 14,
    },
    search: { flex: 1, paddingVertical: 12, fontSize: 14, color: cv('color') },
    filterRow: { flexDirection: 'row', gap: 8 },
    filterChip: {
      backgroundColor: cv('backgroundStrong'),
      borderRadius: 999,
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    filterChipActive: { backgroundColor: cv('primary') },
    filterText: { fontSize: 12, fontWeight: '700', color: cv('muted') },
    filterTextActive: { color: palette.sand50 },
    empty: { alignItems: 'center', gap: 8, paddingVertical: 48 },
    emptyText: { textAlign: 'center', color: cv('muted') },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      backgroundColor: cv('card'),
      borderWidth: 1,
      borderColor: cv('borderColor'),
      borderRadius: 16,
      padding: 12,
    },
    thumb: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: cv('primarySurface'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: { fontWeight: '700', fontSize: 14, color: cv('color') },
    species: { fontStyle: 'italic', fontSize: 12, color: cv('muted') },
    statusBadge: {
      backgroundColor: cv('primarySurface'),
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    statusText: { fontSize: 10, fontWeight: '700', color: cv('primary') },
  })
