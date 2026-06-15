// Etiquetas en español compartidas por mobile y web.
import type { AlertType, CareLevel, PlantStatus, PostKind, SunExposure } from '../types'

export const alertTypeLabels: Record<AlertType, string> = {
  watering: 'Riego',
  fertilizing: 'Fertilización',
  repotting: 'Trasplante',
  treatment: 'Tratamiento',
}

export const alertTypeEmoji: Record<AlertType, string> = {
  watering: '💧',
  fertilizing: '🌱',
  repotting: '🪴',
  treatment: '🧴',
}

// Nombres de icono del design system (@suculentapp/ui `IconName`). Se deja como
// string para no acoplar core→ui; el consumidor lo castea a IconName.
export const alertTypeIcon: Record<AlertType, string> = {
  watering: 'droplet',
  fertilizing: 'sprout',
  repotting: 'shovel',
  treatment: 'spray',
}

export const statusLabels: Record<PlantStatus, string> = {
  active: 'Activa',
  propagating: 'Propagando',
  sold: 'Vendida',
  gifted: 'Regalada',
}

export const sunExposureLabels: Record<SunExposure, string> = {
  full_sun: 'Pleno sol',
  partial_shade: 'Media sombra',
  indoor: 'Interior',
}

export const careLevelLabels: Record<CareLevel, string> = {
  easy: 'Fácil',
  medium: 'Media',
  hard: 'Difícil',
}

export const postKindLabels: Record<PostKind, string> = {
  sale: 'Venta',
  advice: 'Consejo',
  trade: 'Trueque',
}
