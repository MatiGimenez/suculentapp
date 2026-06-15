// Reconocedor IA — endpoint /api/identify.
// Flujo según el doc "Reconocedor IA — Claude Vision API":
// validar token → chequear límite de scans → llamar a Claude Vision →
// incrementar ai_scans_used → devolver resultado.
import { Router } from 'express'
import { getSupabase } from '../lib/supabase'

export const identifyRouter = Router()

const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-6'

const IDENTIFY_PROMPT = `Identificá esta planta suculenta o cactus. Respondé SOLO con un JSON con este formato exacto:
{
  "species": "nombre científico",
  "commonName": "nombre común",
  "family": "familia botánica",
  "confidence": 0.95,
  "careLevel": "easy|medium|hard",
  "watering": "descripción de riego",
  "sunlight": "descripción de luz",
  "temperature": "rango de temperatura",
  "toxic": false,
  "funFact": "dato curioso"
}`

/** Premium: scans ilimitados. Free: 1 scan gratuito. */
async function checkScanLimit(userId: string): Promise<boolean> {
  const supabase = getSupabase()
  if (!supabase) return true // modo demo

  const { data: user, error } = await supabase
    .from('users')
    .select('plan, ai_scans_used')
    .eq('id', userId)
    .single()
  if (error || !user) return false

  if (user.plan === 'premium') return true
  return (user.ai_scans_used as number) === 0
}

async function incrementScansUsed(userId: string): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return
  await supabase.rpc('increment_ai_scans', { p_user_id: userId })
}

async function callClaudeVision(imageBase64: string): Promise<unknown> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Modo demo sin API key: resultado de ejemplo para desarrollo
    return {
      species: 'Echeveria elegans',
      commonName: 'Rosa de alabastro',
      family: 'Crassulaceae',
      confidence: 0.95,
      careLevel: 'easy',
      watering: 'Cada 10-14 días, dejando secar el sustrato por completo',
      sunlight: 'Pleno sol o luz brillante indirecta',
      temperature: '10-27 °C',
      toxic: false,
      funFact: 'Es originaria de México y forma rosetas casi perfectas.',
    }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 },
            },
            { type: 'text', text: IDENTIFY_PROMPT },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API respondió ${response.status}`)
  }

  const data = (await response.json()) as { content: { type: string; text?: string }[] }
  const text = data.content.find((b) => b.type === 'text')?.text ?? '{}'
  // Claude responde solo JSON según el prompt; se tolera texto alrededor
  const match = text.match(/\{[\s\S]*\}/)
  return JSON.parse(match ? match[0] : text)
}

identifyRouter.post('/', async (req, res) => {
  const { imageBase64 } = req.body as { imageBase64?: string }
  if (!imageBase64) {
    res.status(400).json({ error: 'Falta imageBase64 en el body' })
    return
  }

  const allowed = await checkScanLimit(req.user!.id)
  if (!allowed) {
    res.status(402).json({
      error: 'Límite de scans alcanzado. Pasate a Premium para scans ilimitados.',
      code: 'SCAN_LIMIT_REACHED',
    })
    return
  }

  try {
    const result = await callClaudeVision(imageBase64)
    await incrementScansUsed(req.user!.id)
    res.json(result)
  } catch (err) {
    res.status(502).json({ error: `El reconocedor no pudo procesar la imagen: ${String(err)}` })
  }
})
