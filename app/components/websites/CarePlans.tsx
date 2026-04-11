'use client';

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
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </header>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${plan.highlight ? `${styles.card} ${styles.cardHighlight}` : styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planFor}>{plan.for}</p>
              </div>

              <ul className={styles.list} role="list">
                {plan.includes.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <span className={styles.dot} aria-hidden="true" />
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
