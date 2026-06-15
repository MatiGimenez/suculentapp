// Comunidad / Marketplace — tabs Feed / Catálogo / Vender (wireframe).
// Theme-aware: colores derivados del tema activo vía useTheme.
import { useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { postKindLabels, useAppStore } from '@suculentapp/core'
import { Icon, palette, useTheme } from '@suculentapp/ui'

const tabs = ['Feed', 'Catálogo', 'Vender'] as const

export function CommunityScreen() {
  const t = useTheme()
  const cv = (k: string): string =>
    ((t as Record<string, { get?: () => unknown; val?: unknown }>)[k]?.get?.() ??
      (t as Record<string, { val?: unknown }>)[k]?.val) as string
  const styles = useMemo(() => makeStyles(cv), [t])

  const [tab, setTab] = useState<(typeof tabs)[number]>('Feed')
  const posts = useAppStore((s) => s.posts)
  const toggleLike = useAppStore((s) => s.toggleLike)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunidad</Text>

      <View style={styles.tabBar}>
        {tabs.map((label) => (
          <Pressable
            key={label}
            onPress={() => setTab(label)}
            style={[styles.tab, tab === label && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === label && styles.tabTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === 'Feed' ? (
        <FlatList
          data={posts}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.post}>
              <View style={styles.postHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.userName[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.userLocation}>{item.userLocation}</Text>
                </View>
                <View style={styles.kindBadge}>
                  <Text style={styles.kindText}>{postKindLabels[item.kind]}</Text>
                </View>
              </View>
              <View style={styles.postImage}>
                <Icon name="flower" size={40} color="$primary" strokeWidth={1.75} />
              </View>
              <View style={styles.postTitleRow}>
                <Text style={styles.postTitle}>{item.title}</Text>
                {item.price != null && <Text style={styles.price}>${item.price}</Text>}
              </View>
              <Text style={styles.postContent}>{item.content}</Text>
              <View style={styles.actions}>
                <Pressable style={styles.contactButton}>
                  <Text style={styles.contactText}>Contactar</Text>
                </Pressable>
                <Pressable style={styles.likeButton} onPress={() => toggleLike(item.id)}>
                  <Icon name="heart" size={15} color="$accent" fill />
                  <Text style={styles.likeText}>{item.likesCount}</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.placeholder}>
          <Icon name="sparkles" size={40} color="$muted" strokeWidth={1.5} />
          <Text style={styles.placeholderText}>
            {tab === 'Catálogo'
              ? 'Catálogos públicos de criadores — Fase 2 del roadmap.'
              : 'Venta, trueque y regalo de plantas — Fase 3 del roadmap.'}
          </Text>
        </View>
      )}
    </View>
  )
}

const makeStyles = (cv: (k: string) => string) =>
  StyleSheet.create({
    container: { flex: 1, padding: 20, gap: 14 },
    title: { fontSize: 28, fontWeight: '900', color: cv('color') },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: cv('backgroundStrong'),
      borderRadius: 16,
      padding: 4,
    },
    tab: { flex: 1, paddingVertical: 8, borderRadius: 12, alignItems: 'center' },
    tabActive: { backgroundColor: cv('primary') },
    tabText: { fontSize: 13, fontWeight: '700', color: cv('muted') },
    tabTextActive: { color: palette.sand50 },
    post: {
      backgroundColor: cv('card'),
      borderWidth: 1,
      borderColor: cv('borderColor'),
      borderRadius: 20,
      padding: 14,
      gap: 10,
    },
    postHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: cv('accentSurface'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { fontWeight: '700', color: palette.terra700 },
    userName: { fontSize: 13, fontWeight: '700', color: cv('color') },
    userLocation: { fontSize: 11, color: cv('muted') },
    kindBadge: {
      backgroundColor: cv('primarySurface'),
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    kindText: { fontSize: 10, fontWeight: '700', color: cv('primary') },
    postImage: {
      height: 110,
      borderRadius: 16,
      backgroundColor: cv('primarySurface'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    postTitleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
    postTitle: { fontWeight: '700', fontSize: 14, color: cv('color'), flex: 1 },
    price: { fontWeight: '900', color: cv('accent') },
    postContent: { fontSize: 13, color: cv('muted') },
    actions: { flexDirection: 'row', gap: 8 },
    contactButton: {
      flex: 1,
      backgroundColor: cv('primary'),
      borderRadius: 12,
      paddingVertical: 10,
      alignItems: 'center',
    },
    contactText: { color: palette.sand50, fontWeight: '700', fontSize: 13 },
    likeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: cv('backgroundStrong'),
      borderRadius: 12,
      paddingHorizontal: 14,
    },
    likeText: { fontSize: 13, fontWeight: '700', color: cv('muted') },
    placeholder: { alignItems: 'center', gap: 12, paddingVertical: 60, paddingHorizontal: 20 },
    placeholderText: { textAlign: 'center', color: cv('muted'), fontSize: 14 },
  })
