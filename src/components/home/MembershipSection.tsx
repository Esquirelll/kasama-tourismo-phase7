import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { DiamondCollage } from './DiamondCollage'

const hair = { fill: 'none', stroke: '#FCFCFC', strokeOpacity: 0.7, strokeWidth: 1.2, vectorEffect: 'non-scaling-stroke' } as const

export function MembershipSection() {
  return (
    <section id="membership" aria-labelledby="membership-title" className="grain relative z-10 scroll-mt-20 bg-slate-main py-24 lg:py-28">
      {/* navy slanted panel + the mockup's two slanted hairlines (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] lg:block">
        <div className="absolute inset-0 bg-navy-deep [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <path {...hair} d="M15,0 L0,100" />
          <path {...hair} d="M11.5,0 L-3.5,100" />
        </svg>
      </div>
      <div className="absolute inset-0 -z-0 bg-navy-deep lg:hidden" aria-hidden="true" style={{ clipPath: 'polygon(0 55%, 100% 45%, 100% 100%, 0 100%)' }} />

      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Premium</Eyebrow>
          <SectionHeading id="membership-title" variant="italic" className="mt-5 max-w-xl !text-4xl sm:!text-5xl lg:!text-5xl xl:!text-6xl">Membership/<wbr />premium tour</SectionHeading>
          {/* [SAMPLE COPY] */}
          <p className="mt-6 max-w-md text-lg text-white/85">
            Premium tours and memberships are coming soon. This prototype shows where they will live.
            <SampleTag />
          </p>
          <span className="mt-8 inline-block rounded-full border border-gold px-5 py-1.5 font-nav text-xs uppercase tracking-nav text-gold">Paid feature · Coming soon</span>
        </Reveal>
        <Reveal delay={0.1} className="relative lg:-my-24">
          <DiamondCollage />
        </Reveal>
      </Container>
    </section>
  )
}
