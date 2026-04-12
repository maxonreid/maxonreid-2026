'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useInView } from '@/app/hooks/useInView';
import styles from './ProofSection.module.css';

export default function ProofSection() {
  const t = useTranslations('websites.proof');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.08 });
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  const projects = [
    {
      name: t('projects.laomaitravel.name'),
      category: t('projects.laomaitravel.category'),
      tags: ['English', 'Lao'],
      url: 'https://laomaitravel.com',
      image: '/images/projects/laomaitravel/hero-section.png',
    },
    {
      name: t('projects.pmlaos.name'),
      category: t('projects.pmlaos.category'),
      tags: ['English', 'Lao', 'Chinese'],
      url: 'https://www.pmlaos.com',
      image: '/images/projects/pmlaos/Listings_Gallery_Multiple_Properties.png',
    },
  ];

  return (
    <section className={styles.section} ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.intro}>{t('intro')}</p>
        </header>

        <div className={styles.projectGrid}>
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.projectCard} ${inView ? styles.projectCardVisible : styles.projectCardHidden}`}
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className={p.image ? styles.screenshot : `${styles.screenshot} ${styles.screenshotEmpty}`} aria-label={`${p.name} screenshot`}>
                {p.image ? (
                  <>
                    {!loadedImages.has(p.name) && (
                      <div className={styles.shimmer} aria-hidden="true" />
                    )}
                    <Image
                      src={p.image}
                      alt={`${p.name} website screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      onLoad={() => setLoadedImages(prev => new Set(prev).add(p.name))}
                    />
                  </>
                ) : (
                  <span className={styles.screenshotLabel}>{p.name}</span>
                )}
              </div>
              <div className={styles.projectInfo}>
                <p className={styles.projectCategory}>{p.category}</p>
                <h3 className={styles.projectName}>{p.name}</h3>
                <div className={styles.projectTags}>
                  {p.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
                <span className={styles.projectLink}>View project &rarr;</span>
              </div>
            </a>
          ))}
        </div>

        <div
          className={`${styles.analytics} ${inView ? styles.analyticsVisible : styles.analyticsHidden}`}
        >
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsHeader}>
              <span className={styles.analyticsDot} aria-hidden="true" />
              <span className={styles.analyticsTitle}>{t('analyticsTitle')}</span>
            </div>
            <div className={styles.analyticsPlaceholder} style={{ position: 'relative' }}>
              {!analyticsLoaded && (
                <div className={styles.analyticsShimmer} aria-hidden="true" />
              )}
              <Image
                src="/images/projects/laomaitravel/umami-locations.png"
                alt={t('analyticsAlt')}
                width={900}
                height={320}
                className={styles.analyticsChart}
                onLoad={() => setAnalyticsLoaded(true)}
              />
            </div>
            <p className={styles.analyticsExplainer}>
              {t('analyticsExplainer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
