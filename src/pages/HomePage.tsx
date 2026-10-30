import { useCallback, useEffect, useRef, useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { NavBar } from '@/components/layout/NavBar'
import { AboutSection } from '@/components/home/AboutSection'
import { ContactSection } from '@/components/home/ContactSection'
import { Hero } from '@/components/home/Hero'
import { MapSection } from '@/components/home/MapSection'
import { MembershipSection } from '@/components/home/MembershipSection'
import { Toast } from '@/components/ui/Toast'

export default function HomePage() {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const notify = useCallback((text: string) => {
    setMessage(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 3500)
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <>
      <Hero onBookNow={() => notify('Booking and premium tours are coming soon. This is a prototype.')} />
      <NavBar onComingSoon={notify} />
      <main>
        <MapSection />
        <AboutSection />
        <MembershipSection />
        <ContactSection />
      </main>
      <Footer />
      <Toast message={message} />
    </>
  )
}
