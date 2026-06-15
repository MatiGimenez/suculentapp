// BFF de Suculentapp — único servicio que consumen apps/mobile y apps/web.
// Responsabilidades (doc "BFF — Backend For Frontend"):
// auth centralizada, rate limiting del reconocedor, transformación de
// respuestas por cliente, agregación de datos y manejo de errores uniforme.
import express from 'express'
import cors from 'cors'
import { requireAuth } from './middleware/auth'
import { detectClient } from './middleware/client'
import { plantsRouter } from './routes/plants'
import { alertsRouter } from './routes/alerts'
import { identifyRouter } from './routes/identify'
import { feedRouter } from './routes/feed'

const app = express()
const PORT = Number(process.env.PORT ?? 4000)

app.use(cors())
// Límite alto: las imágenes del reconocedor viajan en base64
app.use(express.json({ limit: '10mb' }))
app.use(detectClient)

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'suculentapp-bff' })
})

app.use('/api/plants', requireAuth, plantsRouter)
app.use('/api/alerts', requireAuth, alertsRouter)
app.use('/api/identify', requireAuth, identifyRouter)
app.use('/api/feed', requireAuth, feedRouter)

// Manejo de errores uniforme para ambos clientes
app.use(
  (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  },
)

app.listen(PORT, () => {
  console.warn(`🌵 Suculentapp BFF escuchando en http://localhost:${PORT}`)
})
