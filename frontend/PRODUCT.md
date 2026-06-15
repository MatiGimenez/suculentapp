# Product

## Register

product

## Users

Plant lovers — from first-time succulent owners to seasoned growers — managing a
home collection of succulents and cacti. Spanish-speaking (es-AR), mostly on a
phone, in unhurried moments: a quick morning glance at what needs watering, a
photo to identify an unknown plant, an evening scroll through the community
marketplace. The app is a companion to a low-stakes, recurring care ritual, not
a productivity tool they live inside.

## Product Purpose

Suculentapp helps people keep their plants alive and thriving: track a
collection, get timely care alerts (watering, fertilizing, treatment), identify
species with an AI recognizer, and trade/learn in a community feed. Success is a
user who trusts the app enough to open it as part of their routine and whose
plants are healthier for it. It ships as one design system across a Vite web app
and an Expo (React Native) mobile app — "write once", shared `packages/ui`.

## Brand Personality

Calm & nurturing, warm & friendly, earthy & natural, and crisp & capable — in
that order of priority. The voice is encouraging and plainspoken, never clinical
or gamified-pushy. It should feel like a knowledgeable friend with a green thumb:
reassuring about mistakes, confident about advice. Three words: **grounded,
warm, capable.**

## Anti-references

- The 2026 AI "SaaS-cream / warm-sand near-white" body background (the old
  `desierto` palette leaned into this — `sand50` cream was the tell). Warmth now
  comes from the accent and type, not a beige canvas.
- Over-cute clip-art plant apps: cartoon mascots, bubbly rounded everything,
  childish gamification.
- Sterile corporate dashboards: cold grays, dense data tables, zero soul.
- Loud, over-saturated "wellness" gradients and glassmorphism.

## Design Principles

1. **Green is the soul, not the cliché.** The brand is unapologetically botanical
   and green-hearted — the reflex to avoid is the muted-sage-on-cream monoculture,
   not green itself. Carry green with confidence (deep, capable) and let a warm
   bloom accent do the punctuation.
2. **The tool disappears into the ritual.** Familiar, quiet product UI; surprise
   and delight are saved for moments (a stat, an empty state), never sprayed
   across every screen.
3. **Legible first, always.** Every text/background pair is verified to WCAG AA.
   Soft is fine; washed-out is never. (This pass fixed the old `muted` caption
   that failed at 3.6:1.)
4. **One system, two platforms.** Every visual decision lives in `packages/ui`
   tokens/themes/components so web and native stay identical by construction.
5. **Motion conveys state, not decoration.** Lift, press, and selection feedback —
   nothing that makes a user wait, and a reduced-motion path for everyone.

## Accessibility & Inclusion

- Target **WCAG 2.1 AA**: body text ≥4.5:1, large/bold text ≥3:1 — verified
  numerically against the OKLCH-derived palette.
- Status is never color-only: badges and alerts pair color with a label and/or
  emoji (e.g. `ACTIVA`, `PROPAGANDO`, 💧).
- `prefers-reduced-motion` honored on web (instant transitions); native motion is
  limited to press/selection state.
- Spanish (es-AR) is the primary locale; copy and date formatting assume it.
