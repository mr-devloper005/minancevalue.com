import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Editorial publishing system inspired by the provided references:
  // bright paper, deep ink, cobalt/purple accents, soft gray modules, and a
  // dark hand-picked feature band.
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#071126',
  '--slot4-panel-bg': '#f4f6fb',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#596375',
  '--slot4-soft-muted-text': '#8d96a8',
  '--slot4-accent': '#4564f4',
  '--slot4-accent-fill': '#4564f4',
  '--slot4-accent-2': '#8d17e6',
  '--slot4-accent-3': '#ff4048',
  '--slot4-accent-soft': '#eef2ff',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#05020a',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e9edf6',
  '--slot4-cream': '#ffffff',
  '--slot4-warm': '#f7f8fc',
  '--slot4-lavender': '#f3efff',
  '--slot4-gray': '#f0f2f7',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(69,100,244,0.08), transparent 32rem), radial-gradient(circle at 88% 8%, rgba(255,64,72,0.06), transparent 28rem)',
  '--editable-page-bg': '#ffffff',
  '--editable-page-text': '#071126',
  '--editable-container': '1280px',
  '--editable-border': '#e5e9f2',
  '--editable-nav-bg': '#ffffff',
  '--editable-nav-text': '#071126',
  '--editable-nav-active': '#4564f4',
  '--editable-nav-active-text': '#071126',
  '--editable-cta-bg': '#101827',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#ffffff',
  '--editable-footer-text': '#071126',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_10px_30px_rgba(7,17,38,0.08)]',
  shadowStrong: 'shadow-[0_24px_60px_rgba(7,17,38,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[290px] shrink-0 snap-start sm:w-[360px]',
  },
  type: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.02em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-95 active:scale-[0.98]`,
    secondary: `inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-bold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-200 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]`,
    accent: `inline-flex items-center justify-center gap-2 rounded-lg ${editablePalette.accentBg} px-6 py-3 text-sm font-bold text-[var(--slot4-on-accent)] transition duration-200 hover:brightness-95 active:scale-[0.98]`,
  },
  media: {
    frame: `relative overflow-hidden rounded-xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[2/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing, like the MysteryCoder reference layout.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
