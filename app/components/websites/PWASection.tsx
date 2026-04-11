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
  const { ref: sectionRef, inView } = useInView();

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <div className={`${styles.content} ${inView ? styles.contentVisible : styles.contentHidden}`}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.title}>
            {t('title')}
            <br />
            <em className={styles.italic}>{t('titleItalic')}</em>
          </h2>
          <p className={styles.body}>
            {t('body1')}
          </p>
          <p className={styles.body}>
            {t('body2')}
          </p>
          <span className={styles.chip}>{t('chip')}</span>
          {/* <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Ask about PWA add-on &rarr;
          </a> */}
        </div>

        <div className={`${styles.phoneWrap} ${inView ? styles.phoneVisible : styles.phoneHidden}`} aria-hidden="true">
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
        </div>
      </div>
    </section>
  );
}
