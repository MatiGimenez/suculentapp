// Endpoints de plantas con transformación de respuesta por cliente,
// según el contrato del doc "BFF — Backend For Frontend".
import { Router } from 'express'
import { getSupabase } from '../lib/supabase'
import { demoPlants } from '../data/demo'

export const plantsRouter = Router()

interface PlantRow {
  id: string
  user_id: string
  species: string | null
  common_name: string | null
  substrate: string | null
  pot_size: string | null
  sun_exposure: string | null
  parent_id: string | null
  status: string
  is_public: boolean
  acquired_at: string | null
  created_at: string
}

function toApi(row: PlantRow) {
  return {
    id: row.id,
    userId: row.user_id,
    species: row.species,
    commonName: row.common_name,
    substrate: row.substrate,
    potSize: row.pot_size,
    sunExposure: row.sun_exposure,
    parentId: row.parent_id,
    status: row.status,
    isPublic: row.is_public,
    acquiredAt: row.acquired_at,
    createdAt: row.created_at,
    photos: [],
    notes: null,
  }
}

async function getPlants(userId: string) {
  const supabase = getSupabase()
  if (!supabase) return demoPlants
  const { data, error } = await supabase
    .from('plants')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return (data as PlantRow[]).map(toApi)
}

plantsRouter.get('/', async (req, res) => {
  const plants = await getPlants(req.user!.id)

  // Respuesta liviana para mobile: pocos campos, pensada para listas
  if (req.clientKind === 'mobile') {
    res.json(
      plants.map((p) => ({
        id: p.id,
        commonName: p.commonName,
        species: p.species,
        status: p.status,
      })),
    )
    return
  }

  // Respuesta completa para web
  res.json(plants)
})

plantsRouter.get('/:id', async (req, res) => {
  const plants = await getPlants(req.user!.id)
  const plant = plants.find((p) => p.id === req.params.id)
  if (!plant) {
    res.status(404).json({ error: 'Planta no encontrada' })
    return
  }
  res.json(plant)
})

plantsRouter.post('/', async (req, res) => {
  const supabase = getSupabase()
  const body = req.body as Record<string, unknown>

  if (!supabase) {
    // Modo demo: eco con id generado
    res.status(201).json({ id: `p-${Date.now()}`, userId: req.user!.id, ...body })
    return
  }

  const { data, error } = await supabase
    .from('plants')
    .insert({
      user_id: req.user!.id,
      species: body.species ?? null,
      common_name: body.commonName ?? null,
      substrate: body.substrate ?? null,
      pot_size: body.potSize ?? null,
      sun_exposure: body.sunExposure ?? null,
      parent_id: body.parentId ?? null,
      status: body.status ?? 'active',
      is_public: body.isPublic ?? false,
      acquired_at: body.acquiredAt ?? null,
    })
    .select()
    .single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.status(201).json(toApi(data as PlantRow))
})
