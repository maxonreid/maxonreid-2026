import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getTranslations } from 'next-intl/server';
import HeroSection from '../../components/about/HeroSection';
import BioSection from '../../components/about/BioSection';
import SkillsSection from '../../components/about/SkillsSection';
import CTASection from '../../components/about/CTASection';

export async function generateMetadata() {
  const t = await getTranslations('about');
  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
  };
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BioSection />

        {/* TODO Link to CV */}

        <SkillsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
