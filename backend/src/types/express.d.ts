// Augmentación de los tipos de Express para los campos que inyectan
// los middlewares del BFF (auth y detección de cliente).
import 'express-serve-static-core'

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; email: string | null }
    clientKind: 'mobile' | 'web'
  }
}
