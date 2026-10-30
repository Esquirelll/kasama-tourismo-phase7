// Country photos live in src/assets/countries/<country>/<NN-section>/<name>.webp
const urls = import.meta.glob('/src/assets/countries/**/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

/** key looks like "cambodia/05-destinations/wat-phnom" */
export function photoUrl(key: string): string | undefined {
  return urls[`/src/assets/countries/${key}.webp`]
}

/** Photos I flagged as possibly not matching their spot (see manifest.csv). Shown as a note in dev only. */
export const DOUBTFUL_PHOTOS = new Set([
  'laos/05-destinations/pha-that-luang',
  'myanmar/05-destinations/zoological-gardens-1',
  'myanmar/05-destinations/zoological-gardens-2',
])
