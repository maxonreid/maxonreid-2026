'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from '@/app/hooks/useInView';
import styles from './PricingSection.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

export default function PricingSection() {
  const t = useTranslations('websites.pricing');
  const { ref: sectionRef, inView } = useInView();

  const tiers = [
    {
      label: t('tiers.website.label'),
      name: t('tiers.website.name'),
      regularPrice: t('tiers.website.regularPrice'),
      price: t('tiers.website.price'),
      tagline: t('tiers.website.tagline'),
      includes: t.raw('tiers.website.includes') as string[],
      cta: t('tiers.website.cta'),
    },
    {
      label: t('tiers.webapp.label'),
      name: t('tiers.webapp.name'),
      regularPrice: t('tiers.webapp.regularPrice'),
      price: t('tiers.webapp.price'),
      tagline: t('tiers.webapp.tagline'),
      includes: t.raw('tiers.webapp.includes') as string[],
      cta: t('tiers.webapp.cta'),
      highlight: true,
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <header className={`${styles.header} ${inView ? styles.headerVisible : styles.headerHidden}`}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.intro}>{t('intro')}</p>
        </header>

        <div className={styles.banner}>
          <span className={styles.pulse} />
          <p className={styles.bannerText}>
            {t('banner')}
          </p>
        </div>

        <div className={styles.tiers}>
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`${tier.highlight ? `${styles.tierCard} ${styles.tierHighlight}` : styles.tierCard} ${inView ? styles.tierCardVisible : styles.tierCardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              {tier.highlight && (
                <div className={styles.badge}>{t('badge')}</div>
              )}
              <div className={styles.tierHeader}>
                <p className={styles.tierLabel}>{tier.label}</p>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierTagline}>{tier.tagline}</p>
                <div className={styles.priceRow}>
                  <span className={styles.regularPrice}>{tier.regularPrice}</span>
                  <span className={styles.price}>{tier.price}</span>
                  <span className={styles.priceNote}>{t('priceNote')}</span>
                </div>
              </div>
              <ul className={styles.includesList} role="list">
                {tier.includes.map((item) => (
                  <li key={item} className={styles.includesItem}>
                    <span className={styles.check} aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              {/* <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={tier.highlight ? `${styles.tierCta} ${styles.tierCtaSolid}` : styles.tierCta}
              >
                {tier.cta} &rarr;
              </a> */}
            </div>
          ))}
        </div>

        <div className={styles.platformNote}>
          {t('platformNote')}
        </div>
      </div>
    </section>
  );
}
