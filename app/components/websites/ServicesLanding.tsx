'use client';

import ServicesNav from './ServicesNav';
import HeroSection from './HeroSection';
import UrgencyStrip from './UrgencyStrip';
import BenefitsGrid from './BenefitsGrid';
import ProofSection from './ProofSection';
import SocialProofSection from '@/app/components/home/SocialProofSection';
import PWASection from './PWASection';
import PricingSection from './PricingSection';
import CarePlans from './CarePlans';
import CTASection from './CTASection';
import ServicesFooter from './ServicesFooter';
import styles from './ServicesLanding.module.css';

interface Props {
  locale: string;
}

export default function ServicesLanding({ locale }: Props) {
  return (
    <div className={styles.root}>

      {/* The Navbar */}
      <ServicesNav locale={locale} />

      <main className={styles.main}>

        <HeroSection />

        {/* The component with the Marquee */}
        <UrgencyStrip />

        <BenefitsGrid />

        {/* Testimonials */}
        <SocialProofSection />

        {/* The Projects */}
        <ProofSection />

        <PWASection />

        {/* Build Pricing */}
        <PricingSection />

        {/* Monthly Pricing */}
        <CarePlans />

        <CTASection />

      </main>
      <ServicesFooter locale={locale} />
    </div>
  );
}
