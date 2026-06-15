// Detección del cliente por header (X-Client: mobile | web).
// El BFF adapta tamaño de respuesta, imágenes y paginación según el cliente.
import type { NextFunction, Request, Response } from 'express'

export type ClientKind = 'mobile' | 'web'

export function detectClient(req: Request, _res: Response, next: NextFunction): void {
  req.clientKind = req.headers['x-client'] === 'mobile' ? 'mobile' : 'web'
  next()
}

/** Paginación agresiva en mobile (10 items), flexible en web (20). */
export function pageSizeFor(client: ClientKind): number {
  return client === 'mobile' ? 10 : 20
}
