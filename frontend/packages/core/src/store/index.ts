// Estado global compartido (Zustand) — igual en mobile y web.
import { create } from 'zustand'
import type { Alert, Plant, Post, ScanResult, User } from '../types'
import { demoAlerts, demoPlants, demoPosts, demoUser } from '../data/demo'

interface AppState {
  user: User
  plants: Plant[]
  alerts: Alert[]
  posts: Post[]
  lastScan: ScanResult | null

  addPlant: (plant: Plant) => void
  addPlantFromScan: (scan: ScanResult) => Plant
  completeAlert: (alertId: string) => void
  setLastScan: (scan: ScanResult | null) => void
  toggleLike: (postId: string) => void
}

let plantSeq = 100

export const useAppStore = create<AppState>((set, get) => ({
  user: demoUser,
  plants: demoPlants,
  alerts: demoAlerts,
  posts: demoPosts,
  lastScan: null,

  addPlant: (plant) => set((s) => ({ plants: [plant, ...s.plants] })),

  addPlantFromScan: (scan) => {
    const now = new Date().toISOString()
    const plant: Plant = {
      id: `p-${plantSeq++}`,
      userId: get().user.id,
      species: scan.species,
      commonName: scan.commonName,
      substrate: null,
      potSize: null,
      sunExposure: null,
      parentId: null,
      status: 'active',
      isPublic: false,
      acquiredAt: now.slice(0, 10),
      createdAt: now,
      photos: [],
      notes: scan.funFact,
    }
    set((s) => ({
      plants: [plant, ...s.plants],
      user: { ...s.user, aiScansUsed: s.user.aiScansUsed + 1 },
    }))
    return plant
  },

  completeAlert: (alertId) =>
    set((s) => ({
      alerts: s.alerts.map((a) => {
        if (a.id !== alertId) return a
        const next = new Date()
        next.setDate(next.getDate() + a.frequencyDays)
        return { ...a, lastDoneAt: new Date().toISOString(), nextDue: next.toISOString() }
      }),
    })),

  setLastScan: (scan) => set({ lastScan: scan }),

  toggleLike: (postId) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p)),
    })),
}))
