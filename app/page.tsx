import { AcademyBand } from '@/components/home/AcademyBand';
import { Audiences } from '@/components/home/Audiences';
import { AutomationLab } from '@/components/home/AutomationLab';
import { CtaBand } from '@/components/home/CtaBand';
import { Faq } from '@/components/home/Faq';
import { Hero } from '@/components/home/Hero';
import { InsightsPreview } from '@/components/home/InsightsPreview';
import { Process } from '@/components/home/Process';
import { Services } from '@/components/home/Services';
import { TrustStrip } from '@/components/home/TrustStrip';
import { WhyBentaz } from '@/components/home/WhyBentaz';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <AutomationLab />
      <Audiences />
      <WhyBentaz />
      <Process />
      <AcademyBand />
      <InsightsPreview />
      <Faq />
      <CtaBand />
    </>
  );
}
