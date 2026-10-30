import { AirplaneBackdrop } from '@/components/layout/AirplaneBackdrop'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Reveal } from '@/components/ui/Reveal'
import { SampleTag } from '@/components/ui/SampleTag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SeaMap } from '@/components/map/SeaMap'

export function MapSection() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="grain relative isolate scroll-mt-20 overflow-hidden bg-slate-main py-24 lg:py-32">
      <AirplaneBackdrop />
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow center>Where to?</Eyebrow>
          <SectionHeading id="destinations-title" className="mt-5">Choose your own destination</SectionHeading>
          {/* [SAMPLE COPY] */}
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Pick a country to see its entry rules, money tips, transport, hotels and what to watch out for.
            <SampleTag />
          </p>
        </Reveal>
      </Container>
      {/* the map area is wider than the text column so it can use the whole screen */}
      <Reveal delay={0.1} className="relative z-10 mx-auto mt-14 w-full max-w-[1500px] px-4 sm:px-8">
        <SeaMap />
      </Reveal>
    </section>
  )
}
