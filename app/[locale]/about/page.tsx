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
      <main className="about-page">
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
    <section className="about-hero">
      <div className="container">
        <div className="about-hero-grid">
          <div className="about-hero-content">
            <div className="spy-label">{t('heroLabel')}</div>
            <h1 className="about-hero-title">{t('heroTitle')}</h1>
            <p className="about-hero-subtitle">{t('heroSubtitle')}</p>
          </div>
          
          <div className="about-hero-image">
            <div className="profile-image-wrapper">
              <img 
                src="/images/profile.jpg" 
                alt="Maxon Reid"
                className="profile-image"
              />
              <div className="profile-glow"></div>
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
    <section className="section bio-section">
      <div className="container">
        <div className="bio-content">
          <h2 className="bio-title">{t('title')}</h2>
          <div className="bio-text">
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
    <section className="section skills-section">
      <div className="container">
        <h2 className="skills-title">{t('title')}</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <ul className="skill-list">
                {category.items.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
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
    <section className="section about-cta-section">
      <div className="container">
        <div className="about-cta-card">
          <h2 className="cta-title">{t('title')}</h2>
          <p className="cta-subtitle">{t('subtitle')}</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta">
              {t('contact')}
            </Link>
            <Link href="/services" className="cta ghost">
              {t('services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
