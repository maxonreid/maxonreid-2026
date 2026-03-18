import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/home/HeroSection';
import WorkSection from '@/app/components/home/WorkSection';
import AboutSection from '@/app/components/home/AboutSection';
import BlogSection from '@/app/components/home/BlogSection';
import ServicesSection from '@/app/components/home/ServicesSection';
import ReferralSection from '@/app/components/home/ReferralSection';
import ContactSection from '@/app/components/home/ContactSection';
import ReferralModal from '@/app/components/home/ReferralModal';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <BlogSection />
        <ServicesSection />
        <ReferralSection />
        <ContactSection />
      </main>
      <Footer />
      <ReferralModal />
    </>
  );
}