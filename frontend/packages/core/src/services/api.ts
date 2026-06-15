// Cliente del BFF (Backend For Frontend).
// Los services hablan SIEMPRE con el BFF, nunca directamente con Supabase:
// el BFF es el único que conoce las credenciales de la DB.
import type { Alert, Plant, Post, ScanResult } from '../types'

export type ClientKind = 'mobile' | 'web'

interface ApiConfig {
  baseUrl: string
  client: ClientKind
  getToken: () => string | null
}

let config: ApiConfig = {
  baseUrl: 'http://localhost:4000',
  client: 'web',
  getToken: () => null,
}

/** Cada app (mobile/web) configura el cliente al iniciar. */
export function configureApi(partial: Partial<ApiConfig>): void {
  config = { ...config, ...partial }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = config.getToken()
  const res = await fetch(`${config.baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // El BFF adapta la respuesta según el cliente (X-Client: mobile | web)
      'X-Client': config.client,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, (body as { error?: string }).error ?? res.statusText)
  }
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const api = {
  plants: {
    list: () => request<Plant[]>('/api/plants'),
    get: (id: string) => request<Plant>(`/api/plants/${id}`),
    create: (plant: Partial<Plant>) =>
      request<Plant>('/api/plants', { method: 'POST', body: JSON.stringify(plant) }),
  },
  alerts: {
    today: () => request<Alert[]>('/api/alerts/today'),
    markDone: (id: string) => request<Alert>(`/api/alerts/${id}/done`, { method: 'POST' }),
  },
  feed: {
    list: () => request<Post[]>('/api/feed'),
  },
  /** Reconocedor IA — manda la imagen en base64 al BFF, que llama a Claude Vision */
  identify: (imageBase64: string) =>
    request<ScanResult>('/api/identify', {
      method: 'POST',
      body: JSON.stringify({ imageBase64 }),
    }),
}
