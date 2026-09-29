import HeroSection       from '@/components/sections/HeroSection'
import CategorySection   from '@/components/sections/CategorySection'
import FeaturedSection   from '@/components/sections/FeaturedSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import StatsSection      from '@/components/sections/StatsSection'
import CTASection        from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <StatsSection />
      <HowItWorksSection />
      <CTASection />
    </>
  )
}
