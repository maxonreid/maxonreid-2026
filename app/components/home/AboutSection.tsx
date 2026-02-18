'use client';

import { usePathname } from 'next/navigation';
import { Link } from '../../../routing';
import enMessages from '../../../messages/en.json';
import loMessages from '../../../messages/lo.json';

const messages = {
  en: enMessages,
  lo: loMessages
};

export default function AboutSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? 'lo' : 'en';
  const t = messages[locale].aboutHome;

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="spy-label">{t.label}</div>
        
        <div className="about-grid">
          <div className="about-content">
            <h2 className="about-title">{t.title}</h2>
            <p className="about-intro">{t.intro}</p>
            <p className="about-description">{t.description}</p>
            
            <div className="about-stats">
              <div className="stat-card">
                <div className="stat-value">{t.stats.experience}</div>
                <div className="stat-label">{t.stats.experienceLabel}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{t.stats.projects}</div>
                <div className="stat-label">{t.stats.projectsLabel}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{t.stats.technologies}</div>
                <div className="stat-label">{t.stats.technologiesLabel}</div>
              </div>
            </div>
            
            <Link href="/about" className="cta">
              {t.learnMore}
            </Link>
          </div>

          <div className="about-image">
            <div className="image-container">
              <img 
                src="/images/profile.jpg" 
                alt="Maximiliano Torres - Full Stack Developer"
                className="profile-image"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
