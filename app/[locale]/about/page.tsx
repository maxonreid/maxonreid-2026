import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../../routing';

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
        <SkillsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('about');
  
  return (
    <section className="py-24 px-0 relative bg-gradient-to-b from-[#0a0a0c] to-transparent">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold">{t('heroLabel')}</div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">{t('heroTitle')}</h1>
            <p className="text-xl text-[#9ea0a8] leading-relaxed">{t('heroSubtitle')}</p>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              <img 
                src="/about-pic.jpg" 
                alt="Maxon Reid"
                className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#d6b46b]/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BioSection() {
  const t = useTranslations('about.bio');
  
  return (
    <section className="py-24 px-0">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{t('title')}</h2>
          <div className="space-y-6 text-lg text-[#9ea0a8] leading-relaxed">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const t = useTranslations('about.skills');
  
  const skillCategories = [
    {
      title: t('frontend.title'),
      items: t.raw('frontend.items') as string[]
    },
    {
      title: t('backend.title'),
      items: t.raw('backend.items') as string[]
    },
    {
      title: t('tools.title'),
      items: t.raw('tools.items') as string[]
    }
  ];
  
  return (
    <section className="py-24 px-0 bg-gradient-to-b from-transparent to-[#0a0a0c]">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:bg-white/[0.03] transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-[#d6b46b]">{category.title}</h3>
              <ul className="space-y-2">
                {category.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-[#9ea0a8] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#d6b46b] rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations('about.cta');
  
  return (
    <section className="py-24 px-0">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[#d6b46b]/10 to-transparent border border-[#d6b46b]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-[#9ea0a8] mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-block py-3 px-6 rounded-lg bg-[#d6b46b] text-[#0a0a0c] font-semibold hover:bg-[#b99046] transition-colors">
              {t('contact')}
            </Link>
            <Link href="/services" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#e6e7ea] font-semibold hover:border-[#d6b46b] hover:text-[#d6b46b] transition-all">
              {t('services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
