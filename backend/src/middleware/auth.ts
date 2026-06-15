// Autenticación centralizada: valida el JWT de Supabase Auth en cada request
// antes de procesar cualquier operación.
import type { NextFunction, Request, Response } from 'express'
import { getSupabase } from '../lib/supabase'

export interface AuthedUser {
  id: string
  email: string | null
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const supabase = getSupabase()

  // Modo demo: sin Supabase configurado se inyecta un usuario fijo para
  // poder desarrollar los frontends sin credenciales.
  if (!supabase) {
    req.user = { id: 'u-demo', email: 'demo@suculentapp.com' }
    next()
    return
  }

  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    res.status(401).json({ error: 'Falta el token de autenticación' })
    return
  }

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) {
    res.status(401).json({ error: 'Token inválido o expirado' })
    return
  }

  req.user = { id: data.user.id, email: data.user.email ?? null }
  next()
}
