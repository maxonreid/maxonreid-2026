import Image from 'next/image';
import styles from './ProofSection.module.css';

const projects = [
  {
    name: 'Lao Mai Travel',
    category: 'Bilingual tourism website · Vientiane',
    tags: ['English', 'Lao', 'Next.js 15'],
    url: 'https://laomaitravel.com',
    image: '/images/projects/laomaitravel/hero-section.png',
  },
  {
    name: 'PM Real Estate Laos',
    category: 'Trilingual listing platform · Vientiane',
    tags: ['English', 'Lao', 'Thai'],
    url: '#',
    image: null,
  },
];

export default function ProofSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Built in Laos</p>
          <h2 className={styles.title}>Real projects, right here in Vientiane</h2>
          <p className={styles.intro}>Both live. Both working. Both built for the Lao market.</p>
        </header>

        <div className={styles.projectGrid}>
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <div className={p.image ? styles.screenshot : `${styles.screenshot} ${styles.screenshotEmpty}`} aria-label={`${p.name} screenshot`}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.name} website screenshot`}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
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

        <div className={styles.analytics}>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsHeader}>
              <span className={styles.analyticsDot} aria-hidden="true" />
              <span className={styles.analyticsTitle}>Umami Analytics &middot; your traffic dashboard</span>
            </div>
            <div className={styles.analyticsPlaceholder}>
              <Image
                src="/images/projects/laomaitravel/umami-locations.png"
                alt="Umami analytics — locations dashboard"
                width={900}
                height={320}
                className={styles.analyticsChart}
              />
            </div>
            <div className={styles.analyticsStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>12k+</span>
                <span className={styles.statLabel}>Monthly visitors (combined)</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>94</span>
                <span className={styles.statLabel}>Average Lighthouse score</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>&lt; 1.8s</span>
                <span className={styles.statLabel}>Average load time</span>
              </div>
            </div>
          </div>
        </div>

        <p className={styles.closer}>
          Delivered. Working. Yours.{' '}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle' }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#c8943a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </section>
  );
}
