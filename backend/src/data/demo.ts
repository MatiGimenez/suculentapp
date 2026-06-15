// Datos demo del BFF para desarrollo sin Supabase.
const now = new Date()
const daysAgo = (n: number) => {
  const d = new Date(now)
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export const demoPlants = [
  {
    id: 'p-1',
    userId: 'u-demo',
    species: 'Echeveria elegans',
    commonName: 'Rosa de alabastro',
    substrate: 'Sustrato para cactus + perlita 30%',
    potSize: '10 cm',
    sunExposure: 'full_sun',
    parentId: null,
    status: 'active',
    isPublic: true,
    acquiredAt: '2025-09-12',
    createdAt: daysAgo(270),
    photos: [],
    notes: null,
  },
  {
    id: 'p-2',
    userId: 'u-demo',
    species: 'Crassula ovata',
    commonName: 'Árbol de jade',
    substrate: 'Tierra negra + arena gruesa',
    potSize: '14 cm',
    sunExposure: 'partial_shade',
    parentId: null,
    status: 'active',
    isPublic: false,
    acquiredAt: '2024-11-03',
    createdAt: daysAgo(580),
    photos: [],
    notes: null,
  },
]

export const demoAlerts = [
  {
    id: 'a-1',
    plantId: 'p-1',
    type: 'watering',
    frequencyDays: 10,
    nextDue: now.toISOString(),
    lastDoneAt: daysAgo(10),
    isActive: true,
  },
]

export const demoPosts = [
  {
    id: 'post-1',
    userId: 'u-2',
    userName: 'Carla S.',
    userLocation: 'Córdoba, AR',
    plantId: null,
    kind: 'sale',
    title: 'Echeveria Black Prince — 3 años',
    content: 'Vendo ejemplar adulto, súper sano, con hijuelos.',
    images: [],
    price: 8500,
    likesCount: 24,
    repliesCount: 6,
    createdAt: daysAgo(1),
  },
]
