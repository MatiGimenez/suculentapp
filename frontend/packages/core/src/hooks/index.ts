// Hooks compartidos entre mobile y web.
import { useShallow } from 'zustand/react/shallow'
import { useAppStore } from '../store'
import type { Alert, Plant } from '../types'

/** Alertas activas que vencen hoy o están vencidas — el "Panel de hoy". */
export function useTodayTasks(): { alert: Alert; plant: Plant | undefined }[] {
  const alerts = useAppStore((s) => s.alerts)
  const plants = useAppStore((s) => s.plants)
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  return alerts
    .filter((a) => a.isActive && new Date(a.nextDue) <= endOfToday)
    .map((alert) => ({ alert, plant: plants.find((p) => p.id === alert.plantId) }))
}

export function usePlant(id: string): Plant | undefined {
  return useAppStore((s) => s.plants.find((p) => p.id === id))
}

/** Hijos directos en el árbol genealógico de una planta. */
export function usePlantChildren(id: string): Plant[] {
  return useAppStore(useShallow((s) => s.plants.filter((p) => p.parentId === id)))
}

export function useCollection(filter?: { status?: Plant['status']; query?: string }): Plant[] {
  return useAppStore(
    useShallow((s) =>
      s.plants.filter((p) => {
        if (filter?.status && p.status !== filter.status) return false
        if (filter?.query) {
          const q = filter.query.toLowerCase()
          const hay = `${p.species ?? ''} ${p.commonName ?? ''}`.toLowerCase()
          if (!hay.includes(q)) return false
        }
        return true
      }),
    ),
  )
}
