'use client';

import { usePathname } from 'next/navigation';
import TerminalDevice from './TerminalDevice';

// Import translations
import enMessages from '../../../messages/en.json';
import loMessages from '../../../messages/lo.json';

const messages = {
  en: enMessages,
  lo: loMessages
};

export default function HeroSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? 'lo' : 'en';
  const t = messages[locale].hero;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="brand small">{t.brand}</div>
          <div className="spy-label">
            {t.location}
          </div>

          <h1 id="hero-heading" className="hero-title">
            {t.heroTitle}{' '}
            <span className="gold">{t.heroTitleHighlight}</span>.
          </h1>

          <p className="hero-sub">
            {t.heroSub}
          </p>

          <div className="cta-container">
            <a className="cta" href="#contact">
              {t.ctaStart}
            </a>
            <a className="cta ghost" href="#work">
              {t.ctaView}
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="false">
          <TerminalDevice />
        </div>
      </div>
      <div className="scan-overlay" aria-hidden="true"></div>
    </section>
  );
}
