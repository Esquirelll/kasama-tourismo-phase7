import { getCountry } from '@/data/countries'

export type Status = 'full' | 'partial' | 'soon'

/** Wording shown in tooltips, the legend and the panel. */
export const NOTE: Record<Status, string> = { full: 'Available', partial: 'In progress', soon: 'Coming soon' }

/** Drawn on the map but not clickable (the home country has no guide). */
export const DECORATIVE = new Set(['philippines'])

/** Status comes from each country's data file (src/data/countries/<id>.ts). No file = coming soon. */
export function statusOf(id: string): Status {
  const c = getCountry(id)
  if (!c) return 'soon'
  return c.status === 'complete' ? 'full' : c.status === 'partial' ? 'partial' : 'soon'
}

export function cityOf(id: string): string | undefined {
  return getCountry(id)?.focusCity
}
