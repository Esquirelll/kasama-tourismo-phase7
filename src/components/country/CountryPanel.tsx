import { useEffect, useRef } from 'react'
import { ComingSoon } from '@/components/country/ComingSoon'
import { EmergencyCard } from '@/components/country/EmergencyCard'
import { Overview } from '@/components/country/Overview'
import { SectionView } from '@/components/country/SectionView'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getCountry } from '@/data/countries'
import { FLOW } from '@/data/sections'
import type { SectionKey } from '@/data/types'
import { NOTE, statusOf } from '@/geo/countryMeta'
import { SEA_COUNTRIES } from '@/geo/seaMap'
import { useCountryParam } from '@/hooks/useCountryParam'

type Props = { id: string; onBack?: () => void }

const small = 'font-nav text-xs uppercase tracking-nav text-white/80 hover:text-gold'

export function CountryPanel({ id, onBack }: Props) {
  const country = getCountry(id)
  const name = country?.name ?? SEA_COUNTRIES.find((c) => c.id === id)?.name ?? id
  const status = statusOf(id)
  const sections = country?.sections ?? []
  const { section: wanted, setSection } = useCountryParam()
  const active = sections.find((s) => s.key === wanted)
  const order = FLOW.filter((k) => sections.some((s) => s.key === k))
  const at = active ? order.indexOf(active.key) : -1
  const heading = useRef<HTMLHeadingElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  // Keyboard focus moves into the panel when it opens or the country changes.
  useEffect(() => { heading.current?.focus({ preventScroll: true }) }, [id])
  // Every topic starts at the top.
  useEffect(() => { scroller.current?.scrollTo({ top: 0 }) }, [id, active?.key])

  const open = (k: SectionKey) => setSection(k)

  return (
    <aside aria-label={`${name} details`} className="flex h-full min-w-0 flex-col border-gold/40 bg-navy-deep lg:border-l lg:overflow-hidden">
      <div className="px-7 pt-8 sm:px-10 lg:px-9">
        {active ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <button type="button" onClick={() => setSection(null)} className={small}>← {name} overview</button>
              {onBack && <button type="button" onClick={onBack} className={small}>All countries</button>}
            </div>
            <p className="mt-3 font-nav text-[0.7rem] uppercase tracking-nav text-white/55">Topic {at + 1} of {order.length}</p>
          </>
        ) : (
          <>
            {onBack && (
              <button type="button" onClick={onBack} className="mb-5 border border-white/40 px-4 py-2 font-nav text-xs uppercase tracking-nav text-white/90 hover:border-gold hover:text-gold">
                ← All countries
              </button>
            )}
            <Eyebrow>Southeast Asia</Eyebrow>
            <h3 ref={heading} tabIndex={-1} className="mt-3 break-words font-italic text-4xl text-shadow-soft outline-none sm:text-5xl">{name}</h3>
            <p className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`inline-block rounded-full border px-4 py-1 font-nav text-xs uppercase tracking-nav ${status === 'soon' ? 'border-white/40 text-white/80' : 'border-gold text-gold'}`}>{NOTE[status]}</span>
              {country?.focusCity && <span className="text-sm text-white/70">Guide covers {country.focusCity}</span>}
            </p>
          </>
        )}
        {country?.emergency && <EmergencyCard emergency={country.emergency} />}
      </div>

      <div ref={scroller} className="px-7 pb-10 pt-7 sm:px-10 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-9">
        {sections.length === 0 ? (
          <ComingSoon name={name} />
        ) : active ? (
          <SectionView key={active.key} section={active} prev={order[at - 1]} next={order[at + 1]} onGo={open} />
        ) : (
          <Overview country={country!} onOpen={open} />
        )}
        {status === 'partial' && !active && (
          <p className="mt-8 border-t border-white/15 pt-5 text-sm text-white/70">More sections for {name} are coming soon.</p>
        )}
      </div>
    </aside>
  )
}
