'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useInView } from '@/app/hooks/useInView';
import styles from './PWASection.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

export default function PWASection() {
  const t = useTranslations('websites.pwa');
  const features = t.raw('features') as string[];
  const { ref: sectionRef, inView } = useInView();

  const stagger = (i: number) =>
    `${inView ? styles.staggerChildVisible : styles.staggerChild}`;

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>

        <div className={styles.content}>
          <p
            className={`${styles.eyebrow} ${stagger(0)}`}
            style={{ '--i': 0 } as React.CSSProperties}
          >
            {t('eyebrow')}
          </p>

          <span
            className={`${styles.chip} ${stagger(1)}`}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            {t('chip')}
          </span>

          <h2
            className={`${styles.title} ${stagger(2)}`}
            style={{ '--i': 2 } as React.CSSProperties}
          >
            {t('title')}
            <br />
            <em className={styles.italic}>{t('titleItalic')}</em>
          </h2>

          <p
            className={`${styles.body} ${stagger(3)}`}
            style={{ '--i': 3 } as React.CSSProperties}
          >
            {t('body1')}
          </p>
          <p
            className={`${styles.body} ${stagger(4)}`}
            style={{ '--i': 4 } as React.CSSProperties}
          >
            {t('body2')}
          </p>

          <ul
            className={`${styles.featureList} ${stagger(5)}`}
            style={{ '--i': 5 } as React.CSSProperties}
            role="list"
          >
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cta} ${stagger(6)}`}
            style={{ '--i': 6 } as React.CSSProperties}
          >
            {t('cta')}
          </a>
        </div>

        <div
          className={`${styles.phoneWrap} ${inView ? styles.phoneVisible : styles.phoneHidden}`}
          aria-hidden="true"
        >
          <div className={styles.phoneGlow} />

          <div className={styles.phone}>
            <div className={styles.phoneNotch} />

            <div className={styles.phoneScreen}>
              <Image
                src="/images/projects/pmlaos/PM_Real_Estate_Laos-Admin_Dashboard_Mobile_View.png"
                alt="PM Real Estate Laos admin dashboard"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                sizes="(max-width: 768px) clamp(180px, 55vw, 240px), 260px"
              />
            </div>

            <div className={styles.phoneButton} />
          </div>

          <div className={styles.installBadge}>
            <svg
              className={styles.installBadgeIcon}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v8m0 0L5 7m3 3l3-3M2 12h12" />
            </svg>
            <span className={styles.installBadgeText}>Add to Home Screen</span>
          </div>
        </div>

      </div>
    </section>
  );
}
