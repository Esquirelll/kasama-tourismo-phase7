import type { Country } from '../types'

// Adding a country = adding ONE file in this folder that default-exports a Country.
const modules = import.meta.glob<{ default: Country }>(['./*.ts', '!./index.ts'], { eager: true })

export const countries: Country[] = Object.values(modules).map((m) => m.default)
export const getCountry = (id: string) => countries.find((c) => c.id === id)
