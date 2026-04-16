'use client';

import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from '@/app/hooks/useInView';
import styles from './CarePlans.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

export default function CarePlans() {
  const t = useTranslations('websites.carePlans');
  const { ref: sectionRef, inView } = useInView();

  const plans = [
    {
      name: t('plans.basic.name'),
      price: t('plans.basic.price'),
      period: t('plans.basic.period'),
      for: t('plans.basic.for'),
      includes: t.raw('plans.basic.includes') as string[],
      quip: t('plans.basic.quip'),
    },
    {
      name: t('plans.active.name'),
      price: t('plans.active.price'),
      period: t('plans.active.period'),
      for: t('plans.active.for'),
      includes: t.raw('plans.active.includes') as string[],
      quip: t('plans.active.quip'),
      highlight: true,
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.subtitle}>
              {t('subtitle')}
            </p>
          </div>
          <figure className={styles.heroMedia}>
            <div className={styles.mediaFrame}>
              <Image
                src="/images/websites/maxon-torres-coding-on-the-train.jpg"
                alt="Wherever I am, I make sure your business keeps running without interruptions."
                width={1100}
                height={733}
                className={styles.mediaImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
              />
            </div>
            <figcaption className={styles.mediaCaption}>Wherever I am, I make sure your business keeps running without interruptions.</figcaption>
          </figure>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${plan.highlight ? `${styles.card} ${styles.cardHighlight}` : styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              {plan.highlight && (
                <div className={styles.badge}>{t('badge')}</div>
              )}
              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planFor}>{plan.for}</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
              </div>

              <ul className={styles.list} role="list">
                {plan.includes.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.check} aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.cardBottom}>
                <p className={styles.quip}>{plan.quip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
