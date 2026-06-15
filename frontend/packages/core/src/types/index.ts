// Tipos compartidos — fuente de verdad para mobile, web y backend.
// Modelados según el esquema de DB de la página "Arquitectura técnica".

export type Plan = 'free' | 'premium'

export interface User {
  id: string
  email: string
  name: string | null
  plan: Plan
  reputation: number
  location: string | null
  aiScansUsed: number
  createdAt: string
}

export type PlantStatus = 'active' | 'propagating' | 'sold' | 'gifted'
export type SunExposure = 'full_sun' | 'partial_shade' | 'indoor'

export interface Plant {
  id: string
  userId: string
  species: string | null
  commonName: string | null
  substrate: string | null
  potSize: string | null
  sunExposure: SunExposure | null
  /** Árbol genealógico: planta madre de la que proviene */
  parentId: string | null
  status: PlantStatus
  isPublic: boolean
  acquiredAt: string | null
  createdAt: string
  photos: PlantPhoto[]
  notes: string | null
}

export interface PlantPhoto {
  id: string
  url: string
  takenAt: string
}

/** Etapas del tracker de hojas en propagación */
export type PropagationStage = 'leaf' | 'roots' | 'seedling' | 'transplanted'

export interface PropagationLeaf {
  id: string
  /** Planta madre de la que se cortó/cayó la hoja */
  motherPlantId: string
  stage: PropagationStage
  stageHistory: { stage: PropagationStage; date: string; photoUrl?: string }[]
  createdAt: string
}

export type AlertType = 'watering' | 'fertilizing' | 'repotting' | 'treatment'

export interface Alert {
  id: string
  plantId: string
  type: AlertType
  frequencyDays: number
  nextDue: string
  lastDoneAt: string | null
  isActive: boolean
}

export interface HealthLogEntry {
  id: string
  plantId: string
  content: string
  createdAt: string
}

export type TransactionType = 'sale' | 'trade' | 'gift'
export type TransactionStatus = 'pending' | 'completed' | 'cancelled'

export interface Transaction {
  id: string
  sellerId: string
  buyerId: string
  plantId: string
  type: TransactionType
  /** null si es trueque o regalo */
  amount: number | null
  status: TransactionStatus
  createdAt: string
}

export type PostKind = 'sale' | 'advice' | 'trade'

export interface Post {
  id: string
  userId: string
  userName: string
  userLocation: string | null
  plantId: string | null
  kind: PostKind
  title: string
  content: string
  images: string[]
  price: number | null
  likesCount: number
  repliesCount: number
  createdAt: string
}

export type CareLevel = 'easy' | 'medium' | 'hard'

/** Respuesta del reconocedor IA (Claude Vision) */
export interface ScanResult {
  species: string
  commonName: string
  family: string
  confidence: number
  careLevel: CareLevel
  watering: string
  sunlight: string
  temperature: string
  toxic: boolean
  funFact: string
}

/** Diagnóstico de enfermedades (feature premium) */
export interface DiagnosisResult {
  problem: string
  severity: 'low' | 'medium' | 'high'
  treatment: string
  prevention: string
}
