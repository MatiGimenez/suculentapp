// Perfil — reputación, insignias, estadísticas, plan y selector de tema.
// Theme-aware: colores derivados del tema activo vía useTheme.
import { useMemo } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAppStore } from '@suculentapp/core'
import { Icon, type IconName, palette, ThemeToggle, useTheme } from '@suculentapp/ui'

const badges: { icon: IconName; name: string; earned: boolean }[] = [
  { icon: 'sprout', name: 'Primera planta', earned: true },
  { icon: 'droplet', name: 'Regador serial', earned: true },
  { icon: 'camera', name: 'Explorador IA', earned: false },
  { icon: 'users', name: 'Primer trueque', earned: false },
  { icon: 'leaf', name: 'Coleccionista x10', earned: false },
  { icon: 'star', name: 'Vendedor 5★', earned: false },
]

export function ProfileScreen() {
  const t = useTheme()
  const cv = (k: string): string =>
    ((t as Record<string, { get?: () => unknown; val?: unknown }>)[k]?.get?.() ??
      (t as Record<string, { val?: unknown }>)[k]?.val) as string
  const styles = useMemo(() => makeStyles(cv), [t])

  const user = useAppStore((s) => s.user)
  const plants = useAppStore((s) => s.plants)
  const propagating = plants.filter((p) => p.status === 'propagating').length

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name?.[0] ?? '?'}</Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <View style={styles.locationRow}>
        <Icon name="map-pin" size={14} color="$muted" />
        <Text style={styles.location}>{user.location}</Text>
      </View>
      <View style={styles.badgeRow}>
        <View style={styles.repBadge}>
          <Icon name="star" size={12} color={palette.terra700} fill />
          <Text style={styles.repText}>{user.reputation.toFixed(1)}</Text>
        </View>
        <View style={styles.planBadge}>
          {user.plan === 'premium' ? <Icon name="sparkles" size={12} color="$primary" /> : null}
          <Text style={styles.planText}>{user.plan === 'premium' ? 'Premium' : 'Plan Free'}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        {[
          { value: plants.length, label: 'Plantas' },
          { value: propagating, label: 'Propagando' },
          { value: user.aiScansUsed, label: 'Scans IA' },
        ].map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Apariencia</Text>
      <ThemeToggle />

      <Text style={styles.sectionTitle}>Insignias</Text>
      <View style={styles.badgeGrid}>
        {badges.map((b) => (
          <View key={b.name} style={[styles.badge, !b.earned && { opacity: 0.4 }]}>
            <Icon name={b.icon} size={22} color="$primary" />
            <Text style={styles.badgeName}>{b.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const makeStyles = (cv: (k: string) => string) =>
  StyleSheet.create({
    container: { padding: 20, alignItems: 'center', gap: 8 },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: cv('primary'),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    avatarText: { fontSize: 36, fontWeight: '900', color: palette.sand50 },
    name: { fontSize: 24, fontWeight: '900', color: cv('color') },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    location: { fontSize: 13, color: cv('muted') },
    badgeRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
    repBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: palette.terra100,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    repText: { fontWeight: '700', color: palette.terra700, fontSize: 13 },
    planBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: cv('backgroundStrong'),
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    planText: { fontWeight: '700', color: cv('muted'), fontSize: 13 },
    statsRow: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
    statCard: {
      flex: 1,
      backgroundColor: cv('card'),
      borderWidth: 1,
      borderColor: cv('borderColor'),
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: 'center',
    },
    statValue: { fontSize: 22, fontWeight: '900', color: cv('primary') },
    statLabel: { fontSize: 10, color: cv('muted'), textTransform: 'uppercase' },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: cv('color'),
      alignSelf: 'flex-start',
      marginTop: 16,
    },
    badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, width: '100%' },
    badge: {
      width: '31%',
      backgroundColor: cv('primarySurface'),
      borderRadius: 16,
      padding: 10,
      alignItems: 'center',
      gap: 4,
    },
    badgeName: { fontSize: 9, fontWeight: '700', textAlign: 'center', color: cv('color') },
  })
