// Alertas de cuidado: panel de hoy + marcar como hecha.
// En producción, pg_cron (Supabase) detecta vencimientos y encola push.
import { Router } from 'express'
import { getSupabase } from '../lib/supabase'
import { demoAlerts } from '../data/demo'

export const alertsRouter = Router()

alertsRouter.get('/today', async (req, res) => {
  const supabase = getSupabase()
  if (!supabase) {
    res.json(demoAlerts)
    return
  }
  const { data, error } = await supabase
    .from('alerts')
    .select('*, plants!inner(user_id)')
    .eq('plants.user_id', req.user!.id)
    .eq('is_active', true)
    .lte('next_due', new Date().toISOString())
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json(data)
})

alertsRouter.post('/:id/done', async (req, res) => {
  const supabase = getSupabase()
  if (!supabase) {
    const alert = demoAlerts.find((a) => a.id === req.params.id)
    if (!alert) {
      res.status(404).json({ error: 'Alerta no encontrada' })
      return
    }
    res.json({ ...alert, lastDoneAt: new Date().toISOString() })
    return
  }
  const { data: alert, error: fetchError } = await supabase
    .from('alerts')
    .select('frequency_days')
    .eq('id', req.params.id)
    .single()
  if (fetchError || !alert) {
    res.status(404).json({ error: 'Alerta no encontrada' })
    return
  }
  const next = new Date()
  next.setDate(next.getDate() + (alert.frequency_days as number))
  const { data, error } = await supabase
    .from('alerts')
    .update({ last_done_at: new Date().toISOString(), next_due: next.toISOString() })
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) {
    res.status(500).json({ error: error.message })
    return
  }
  res.json(data)
})
