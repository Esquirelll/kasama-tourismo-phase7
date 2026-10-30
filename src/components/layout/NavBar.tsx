import { useEffect, useState } from 'react'
import logoBadge from '@/assets/brand/logo-badge.webp'
import { Container } from '@/components/ui/Container'
import { HomeIcon } from '@/components/ui/icons'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SearchBar } from './SearchBar'

const SECTIONS = ['top', 'destinations', 'about', 'membership', 'contact']
const item = 'whitespace-nowrap transition-colors hover:text-gold'
const current = 'underline decoration-1 underline-offset-[7px]'

export function NavBar({ onComingSoon }: { onComingSoon: (message: string) => void }) {
  const active = useActiveSection(SECTIONS)
  const here = active === 'top' || active === 'destinations' ? 'home' : active === 'contact' ? 'contact' : 'about'

  // The small logo badge appears in the bar once the big hero header has scrolled away.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <nav aria-label="Main" className={`sticky top-0 z-40 border-b bg-slate-main transition-shadow duration-300 ${scrolled ? 'border-white/15 shadow-[0_10px_30px_rgba(12,36,60,0.35)]' : 'border-white/10'}`}>
      <Container className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:py-4">
        <div className="flex items-center gap-4">
          <a
            href="#top"
            aria-label="Back to top"
            className={`shrink-0 overflow-hidden rounded-full bg-white transition-all duration-300 ${scrolled ? 'h-10 w-10 border border-white opacity-100' : 'h-0 w-0 opacity-0'}`}
          >
            <img src={logoBadge} alt="" className="h-full w-full object-cover" />
          </a>
          <SearchBar onSubmit={() => onComingSoon('Search is coming soon.')} />
        </div>
        <ul className="flex items-center gap-3 overflow-x-auto py-1 font-nav text-[0.68rem] font-light uppercase tracking-[0.14em] sm:gap-6 sm:text-sm sm:tracking-nav md:gap-9">
          <li>
            <a href="#top" aria-current={here === 'home' ? 'location' : undefined} className={`${item} inline-flex items-center gap-2 ${here === 'home' ? current : ''}`}>
              <HomeIcon className="hidden h-4 w-4 sm:block" /> Home
            </a>
          </li>
          <li>
            <a href="#about" aria-current={here === 'about' ? 'location' : undefined} className={`${item} ${here === 'about' ? current : ''}`}>About</a>
          </li>
          <li>
            <a href="#contact" aria-current={here === 'contact' ? 'location' : undefined} className={`${item} ${here === 'contact' ? current : ''}`}>Contact</a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onComingSoon('Booking and premium tours are coming soon. This is a prototype.')}
              className="whitespace-nowrap rounded-full border border-gold px-3 py-1.5 uppercase text-gold sm:px-5 transition-colors hover:bg-gold hover:text-navy-deep"
            >
              Book
            </button>
          </li>
          <li>
            <button type="button" onClick={() => onComingSoon('This section is coming soon.')} className={`${item} uppercase`}>Other</button>
          </li>
        </ul>
      </Container>
    </nav>
  )
}
