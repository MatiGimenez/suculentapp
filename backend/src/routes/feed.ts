// Feed de la comunidad / marketplace.
import { Router } from 'express'
import { getSupabase } from '../lib/supabase'
import { pageSizeFor } from '../middleware/client'
import { demoPosts } from '../data/demo'

export const feedRouter = Router()

feedRouter.get('/', async (req, res) => {
  const limit = pageSizeFor(req.clientKind)
  const supabase = getSupabase()
  if (!supabase) {
    res.json(demoPosts.slice(0, limit))
    return
  }
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json(data)
})
