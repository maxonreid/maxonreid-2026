import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { FileText, ArrowRight } from 'lucide-react';
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

export default async function AboutPage() {
  const t = await getTranslations('about.cv');
  
  return (
    <>
      <Header />
      <main>
        <HeroSection />



        <BioSection />


        <SkillsSection />

        {/* CV Link Section TODO make this a component later */}
        <section className="w-[92%] max-w-[1200px] mx-auto py-16">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[#d6b46b] bg-gradient-to-br from-[#d6b46b]/10 via-transparent to-[#d6b46b]/5 p-12 text-center backdrop-blur-sm">
            
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d6b46b]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d6b46b]/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Professional Experience
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                View my complete professional background, technical expertise, and career history
              </p>
              
              <Link 
                href="/cv" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#d6b46b] text-[#0a0a0c] font-bold text-lg rounded-xl hover:bg-[#c9a961] hover:shadow-[0_8px_30px_rgba(214,180,107,0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 focus:outline-2 focus:outline-[#d6b46b] focus:outline-offset-4 shadow-lg"
                aria-label="View my full curriculum vitae"
              >
                <FileText size={24} strokeWidth={2.5} aria-hidden="true" />
                {t('viewCV')}
                <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
