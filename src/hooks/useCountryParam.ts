import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/** Reads/writes ?country=<id> (and optional &section=<key>) so any state can be deep-linked. */
export function useCountryParam() {
  const [params, setParams] = useSearchParams()
  const country = params.get('country')
  const section = params.get('section')
  const setCountry = useCallback(
    (id: string | null) => {
      setParams((prev) => {
        const next = new URLSearchParams(prev)
        if (id) next.set('country', id)
        else next.delete('country')
        next.delete('section') // a new country starts on its first section
        return next
      })
    },
    [setParams],
  )
  const setSection = useCallback(
    (key: string | null) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (key) next.set('section', key)
          else next.delete('section')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )
  return { country, setCountry, section, setSection }
}
