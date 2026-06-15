# Design

Visual system for Suculentapp. Single source of truth lives in code
(`packages/ui`): `tokens.ts` (palette), `themes.ts` (semantic light/dark),
`fonts.ts` + `components/text.tsx` (type), and the shared components. This file
documents the *intent*; the code is canonical.

## Theme: "Invernadero" (Glasshouse)

A bright, modern botanical app. The physical scene: someone at a sunlit
windowsill of pots, phone in hand, checking who needs water — green light,
unhurried, a small daily ritual. Light theme is the default; a deep-green dark
theme is defined for parity. **Color strategy: Committed** — a confident
botanical green carries identity, on a clean green-tinted paper, with a warm
clay-coral accent for punctuation.

This replaces the previous `desierto` theme (warm cream `sand50` body +
muted sage + terracotta), whose cream canvas read as the generic AI warm-neutral
default and whose `muted` text failed contrast.

## Color

All values derive from OKLCH and are verified WCAG AA. **Palette keys are stable
contracts** — they are used directly as Tamagui tokens (`$sage700`, `$sand50`,
`$terra500`, …) across web and native, so the refresh changed *values*, not
*names* (one addition: `terra100`).

### Palette (`packages/ui/src/tokens.ts`)

| Token | Hex | Role |
|---|---|---|
| `sand50` | `#f8fbf9` | Body / paper — near-white, faint green tint (not cream) |
| `sand100` | `#eff4f1` | Subtle surface / hover |
| `sand200` | `#dee5e0` | Borders |
| `sand300` | `#c6cfc8` | Stronger border / press |
| `sage100` | `#dcf0df` | Pale green tint — badges, tab pill, plant-card header |
| `sage300` | `#9ac8a2` | Soft green — hover borders, light captions on dark |
| `sage500` | `#4c925f` | Mid green — dark-theme primary |
| `sage700` | `#25653b` | **Primary** — deep botanical green; also `muted` text |
| `sage900` | `#143621` | Ink-green — dark surfaces, deep panels |
| `terra100` | `#fce2d3` | Pale clay — `terra` badge, accent surface tint |
| `terra300` | `#e9af91` | Soft clay — dashed CTA border, avatars |
| `terra500` | `#d8653b` | **Accent** — warm bloom clay-coral |
| `terra700` | `#9d4220` | Deep clay — accent text, small white-on-accent badges |
| `white` | `#ffffff` | Card surface (light) |
| `ink` | `#112719` | Body text — near-black green |

### Semantic theme (`packages/ui/src/themes.ts`)

Both `light` and `dark` carry identical keys (required for Tamagui type
inference). Brand semantics on top of the standard set: `primary` / `primaryHover`
/ `primarySurface`, `accent` / `accentHover` / `accentSurface`, `card`, `muted`.

- Light: `primary` = `sage700`, `accent` = `terra500`, `muted` = `sage700`
  (was `sage500`, which failed at 3.6:1; now 6.7:1), `color` = `ink`.
- Dark: bg `sage900`, `primary` = `sage500`, `card` = `#1d4730`, `muted` =
  `sage300`. All text pairs ≥4.5:1 (or ≥3:1 for bold buttons).

### Verified contrast (light)

ink/body 15.2:1 · `muted` caption 6.7:1 · accent text (`terra700`) 6.2:1 ·
white on `primary` 7.0:1 · white-bold on `accent` 3.6:1 (large) · sage badge
5.9:1 · terra badge 5.2:1.

## Dark mode

Light is the default; a deep-green "invernadero de noche" dark theme has full
parity. Both schemes are first-class and AA-verified.

- **Activation:** follow the OS color scheme by default, with a manual override
  (Auto / Claro / Oscuro) in Perfil via the shared `ThemeToggle`.
- **State:** owned by `ThemeProvider` (`packages/ui/src/theme-provider.tsx`),
  which wraps `UIProvider` and a Tamagui `<Theme>` so switching is instant (React
  state, no reload). `useThemeMode()` exposes `{ mode, scheme, setMode, toggle }`.
- **Persistence:** web persists to `localStorage`; an inline script in
  `index.html` sets `data-theme` before first paint (no FOUC). Native follows the
  system per session (AsyncStorage would add cross-launch persistence).
- **Document chrome (web):** `styles.css` switches the body bg/grain and
  `color-scheme` off `:root[data-theme='dark']`; `<meta name=theme-color>` per
  scheme. Tamagui component surfaces switch via the active theme.
- **Apps:** both shells wrap in `ThemeProvider`; the mobile shell uses
  `$background` + a scheme-driven `StatusBar` bar style. Mobile screens that use
  raw `StyleSheet` derive their colors from `useTheme()` so they adapt too.

## Iconography

One **shared line-icon set** (`packages/ui/src/icons/`), replacing all emoji UI.
Based on Lucide (ISC) geometry plus a custom `cactus` brand mark — 24-grid,
1.75–2px stroke, round caps.

- **Cross-platform, zero new deps:** path data lives in `icon-paths.ts`; rendered
  as raw `<svg>` on web (`icon.tsx`) and via `react-native-svg` on native
  (`icon.native.tsx`, resolved by the metro `.native` extension).
- **Theme-aware color:** `<Icon name color size fill strokeWidth />`; `color`
  accepts a theme token (`$muted`, `$primary` — adapts to dark) or a literal,
  resolved by `useIconColor`.
- **Usage:** tab bar (`home`/`leaf`/`camera`/`users`/`user`), care alerts
  (`droplet`/`sprout`/`shovel`/`spray` via core `alertTypeIcon`), plant-card
  botanical variety (`cactus`/`leaf`/`sprout`/`flower`), metadata (`map-pin`,
  `star`, `heart`, `message-circle`, `search`, `gauge`, `triangle-alert`, `info`),
  and the theme toggle (`monitor`/`sun`/`moon`). `Badge` accepts an optional
  leading `icon`.

## Typography

Pairing on a true contrast axis — **Fraunces** (soft old-style serif, the warm
editorial voice) for display/headings, **Karla** (humanist sans) for body, UI
labels, and data. Retained deliberately: this is a serif+sans contrast pair, not
a slop tell. Loaded via `@fontsource/*` (web) and `@expo-google-fonts/*` (native).

Fixed (non-fluid) rem-ish scale appropriate to product UI. Tracking opens at
small sizes for legibility and tightens at display sizes (floor ≥ -0.04em).

Variants (`components/text.tsx`):

| Variant | Family | Size px | Weight | Tracking |
|---|---|---|---|---|
| `display` | Fraunces | 42 | 900 (Black) | -1.2 |
| `title` | Fraunces | 28 | 700 | -0.6 |
| `heading` | Fraunces | 20 | 600 | -0.3 |
| `subtitle` | Fraunces | 18 | 500 | -0.2 |
| `body` | Karla | 15 | 400 | 0 |
| `caption` | Karla | 13 | 400 | 0 (color `muted`) |
| `label` | Karla | 12 | 700 | +1.2, uppercase |

## Components (`packages/ui/src/components`)

- **Card** — white surface, 18px radius, soft layered shadow; `interactive`
  variant lifts on hover (`y:-3`) and scales on press (`0.98`).
- **Button** — pill; tones `primary` / `accent` / `ghost` / `outline`, sizes
  `sm` / `md` / `lg`; press feedback (opacity + scale).
- **Badge** — tones `sage` / `terra` / `sand`, all soft-tint bg + deep text,
  AA-verified; optional leading `icon`.
- **Input** — card-surface field, primary-colored focus border.
- **Icon** — shared cross-platform line icons (see Iconography).
- **ThemeToggle** — Auto / Claro / Oscuro segmented control bound to `ThemeProvider`.
- **PlantCard** (botanical line icon + droplet due), **TabBar** (line icons,
  active pill in `$primarySurface`), **ScreenContainer**.

## Motion

State-driven only: card lift/press, button press, tab selection. Web honors
`prefers-reduced-motion` (instant transitions, in `apps/web/src/styles.css`).
Because the project intentionally disables Tamagui's type augmentation, motion is
expressed via `hoverStyle`/`pressStyle` (transform/opacity) rather than the typed
`animation` prop — these apply on web (pseudo-classes) and native (press state).

## Atmosphere (web, `apps/web/src/styles.css`)

Paper `#f8fbf9` + a top "canopy" radial glow (soft `sage300`) + a fine green dot
grain. Brand-colored text selection (clay). The phone-width column is capped at
`maxWidth: 480` and centered (`apps/web/src/app.tsx`).

## Known issues / follow-ups

- **Web shell horizontal overflow below ~480px width.** The mobile-column
  content doesn't shrink under the 480px cap, clipping the right edge on narrow
  *web* viewports. Pre-existing, in `ScreenContainer`'s `ScrollView` layout, not
  the color/type system. The native Expo app is unaffected (constrains to device
  width). Worth a dedicated `adapt`/`audit` pass.
- **Mobile not visually verified.** All mobile changes type-check, and the shared
  components are verified on web, but the Expo app wasn't run in this pass. Worth
  a device/simulator smoke test — especially the `useTheme()`-derived StyleSheet
  colors in the four non-DS screens and icon rendering via `react-native-svg`.
- **Native theme persistence.** Dark-mode choice persists on web (localStorage)
  but resets to system per launch on native; add AsyncStorage to persist there.
