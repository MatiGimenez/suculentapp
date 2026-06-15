// Reconocedor IA — viewfinder con esquinas verdes y resultado (wireframe).
// En el MVP real la captura usa expo-camera; acá se simula el flujo
// completo contra el BFF (con fallback demo sin red). Theme-aware vía useTheme.
import { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import type { ScanResult } from '@suculentapp/core'
import { api, careLevelLabels, useAppStore } from '@suculentapp/core'
import { Icon, type IconName, palette, useTheme } from '@suculentapp/ui'

const demoResult: ScanResult = {
  species: 'Echeveria elegans',
  commonName: 'Rosa de alabastro',
  family: 'Crassulaceae',
  confidence: 0.95,
  careLevel: 'easy',
  watering: 'Cada 10-14 días, dejando secar el sustrato',
  sunlight: 'Pleno sol o luz brillante indirecta',
  temperature: '10-27 °C',
  toxic: false,
  funFact: 'Es originaria de México y forma rosetas casi perfectas.',
}

export function ScannerScreen() {
  const t = useTheme()
  const cv = (k: string): string =>
    ((t as Record<string, { get?: () => unknown; val?: unknown }>)[k]?.get?.() ??
      (t as Record<string, { val?: unknown }>)[k]?.val) as string
  const styles = useMemo(() => makeStyles(cv), [t])

  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const user = useAppStore((s) => s.user)
  const addPlantFromScan = useAppStore((s) => s.addPlantFromScan)
  const limitReached = user.plan === 'free' && user.aiScansUsed > 0

  async function scan() {
    setScanning(true)
    setResult(null)
    try {
      // En producción: imagen de expo-camera convertida a base64
      const scanResult = await api.identify('')
      setResult(scanResult)
    } catch {
      setResult(demoResult)
    } finally {
      setScanning(false)
    }
  }

  const dataCells: { icon: IconName; label: string; value: string }[] = result
    ? [
        { icon: 'droplet', label: 'Riego', value: result.watering },
        { icon: 'sun', label: 'Luz', value: result.sunlight },
        { icon: 'gauge', label: 'Dificultad', value: careLevelLabels[result.careLevel] },
        {
          icon: 'triangle-alert',
          label: 'Toxicidad',
          value: result.toxic ? 'Tóxica' : 'No tóxica',
        },
      ]
    : []

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reconocedor IA</Text>

      <View style={styles.viewfinder}>
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
        {scanning ? (
          <ActivityIndicator color={palette.sage300} size="large" />
        ) : (
          <Icon name="camera" size={48} color={palette.sage300} strokeWidth={1.5} />
        )}
        <Pressable
          style={[styles.shutter, limitReached && { opacity: 0.4 }]}
          disabled={limitReached || scanning}
          onPress={() => void scan()}
        >
          <View style={styles.shutterInner} />
        </Pressable>
      </View>

      {limitReached && (
        <View style={styles.upgradeNudge}>
          <Text style={styles.upgradeText}>
            Ya usaste tu scan gratuito. Pasate a Premium para scans ilimitados.
          </Text>
        </View>
      )}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultName}>{result.commonName}</Text>
              <Text style={styles.resultSpecies}>
                {result.species} · {result.family}
              </Text>
            </View>
            <View style={styles.confidence}>
              <Text style={styles.confidenceText}>{Math.round(result.confidence * 100)}%</Text>
            </View>
          </View>

          <View style={styles.dataGrid}>
            {dataCells.map((cell) => (
              <View key={cell.label} style={styles.dataCell}>
                <View style={styles.dataLabelRow}>
                  <Icon name={cell.icon} size={13} color="$muted" />
                  <Text style={styles.dataLabel}>{cell.label}</Text>
                </View>
                <Text style={styles.dataValue}>{cell.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.funFact}>
            <Icon name="info" size={15} color="$primary" />
            <Text style={styles.funFactText}>{result.funFact}</Text>
          </View>

          <Pressable style={styles.addButton} onPress={() => addPlantFromScan(result)}>
            <Text style={styles.addButtonText}>+ Agregar a mi colección</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  )
}

const makeStyles = (cv: (k: string) => string) =>
  StyleSheet.create({
    container: { padding: 20, gap: 16 },
    title: { fontSize: 28, fontWeight: '900', color: cv('color') },
    viewfinder: {
      aspectRatio: 1,
      borderRadius: 24,
      backgroundColor: palette.sage900,
      alignItems: 'center',
      justifyContent: 'center',
    },
    corner: { position: 'absolute', width: 24, height: 24, borderColor: palette.sage300 },
    tl: { top: 16, left: 16, borderTopWidth: 4, borderLeftWidth: 4 },
    tr: { top: 16, right: 16, borderTopWidth: 4, borderRightWidth: 4 },
    bl: { bottom: 16, left: 16, borderBottomWidth: 4, borderLeftWidth: 4 },
    br: { bottom: 16, right: 16, borderBottomWidth: 4, borderRightWidth: 4 },
    shutter: {
      position: 'absolute',
      bottom: 24,
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 4,
      borderColor: palette.sand50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shutterInner: { width: 48, height: 48, borderRadius: 24, backgroundColor: palette.sand50 },
    upgradeNudge: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: palette.terra300,
      backgroundColor: cv('accentSurface'),
      borderRadius: 16,
      padding: 14,
    },
    upgradeText: { fontSize: 13, color: palette.terra700, textAlign: 'center' },
    resultCard: {
      backgroundColor: cv('card'),
      borderWidth: 1,
      borderColor: cv('borderColor'),
      borderRadius: 24,
      padding: 18,
      gap: 14,
    },
    resultHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    resultName: { fontSize: 19, fontWeight: '900', color: cv('color') },
    resultSpecies: { fontStyle: 'italic', fontSize: 13, color: cv('muted') },
    confidence: {
      backgroundColor: cv('primary'),
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    confidenceText: { color: palette.sand50, fontSize: 12, fontWeight: '900' },
    dataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    dataCell: { width: '48%', backgroundColor: cv('backgroundStrong'), borderRadius: 12, padding: 10 },
    dataLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    dataLabel: { fontSize: 10, fontWeight: '700', color: cv('muted') },
    dataValue: { fontSize: 12, color: cv('color'), marginTop: 4 },
    funFact: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      backgroundColor: cv('primarySurface'),
      borderRadius: 12,
      padding: 12,
    },
    funFactText: { flex: 1, fontSize: 12, color: cv('color') },
    addButton: {
      backgroundColor: cv('primary'),
      borderRadius: 16,
      paddingVertical: 14,
      alignItems: 'center',
    },
    addButtonText: { color: palette.sand50, fontWeight: '700', fontSize: 15 },
  })
