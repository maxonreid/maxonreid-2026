import styles from './BenefitsGrid.module.css';

const benefits = [
  {
    title: 'Found on Google',
    desc: 'Customers searching \u201cguesthouse Vientiane\u201d or \u201ctour Luang Prabang\u201d find you, not your competitor. Facebook pages never appear in those results.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="17" stroke="#c8943a" strokeWidth="0.75" />
        <circle cx="18" cy="18" r="10" stroke="#c8943a" strokeWidth="0.75" />
        <ellipse cx="18" cy="18" rx="6" ry="17" stroke="#c8943a" strokeWidth="0.75" />
        <line x1="1" y1="18" x2="35" y2="18" stroke="#c8943a" strokeWidth="0.75" />
        <circle cx="18" cy="18" r="2" fill="#c8943a" />
      </svg>
    ),
  },
  {
    title: 'As many languages as you need',
    desc: 'Your site works in Lao, English, and Thai. Every customer type, every market, handled automatically without duplicating your work.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="32" height="24" rx="2" stroke="#c8943a" strokeWidth="0.75" />
        <rect x="7" y="12" width="8" height="5" rx="1" stroke="#c8943a" strokeWidth="0.75" />
        <rect x="20" y="12" width="8" height="5" rx="1" stroke="#c8943a" strokeWidth="0.75" />
        <line x1="7" y1="21" x2="29" y2="21" stroke="#c8943a" strokeWidth="0.75" />
        <line x1="7" y1="24" x2="20" y2="24" stroke="#c8943a" strokeWidth="0.75" />
      </svg>
    ),
  },
  {
    title: 'You own it',
    desc: 'Facebook can restrict your page tomorrow. Your website belongs to you. No algorithm, no dependency, no risk of losing everything overnight.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <path d="M18 2L33 10V26L18 34L3 26V10L18 2Z" stroke="#c8943a" strokeWidth="0.75" />
        <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="#c8943a" strokeWidth="0.75" />
        <circle cx="18" cy="18" r="3" fill="#c8943a" />
      </svg>
    ),
  },
  {
    title: 'See your traffic',
    desc: 'Know how many people visited, where they came from, and what they looked at. A simple, privacy-friendly dashboard built in from day one.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="20" width="5" height="12" rx="1" fill="#c8943a" opacity="0.3" />
        <rect x="11" y="14" width="5" height="18" rx="1" fill="#c8943a" opacity="0.5" />
        <rect x="18" y="8" width="5" height="24" rx="1" fill="#c8943a" opacity="0.7" />
        <rect x="25" y="4" width="5" height="28" rx="1" fill="#c8943a" />
        <line x1="2" y1="34" x2="34" y2="34" stroke="#c8943a" strokeWidth="0.75" />
      </svg>
    ),
  },
  {
    title: 'Looks serious, builds trust',
    desc: 'A professional website tells customers you are established before they ever contact you. First impressions happen online now, not at the door.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="14" r="7" stroke="#c8943a" strokeWidth="0.75" />
        <path d="M8 30c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#c8943a" strokeWidth="0.75" strokeLinecap="round" />
        <circle cx="18" cy="14" r="3" fill="#c8943a" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Delivered finished',
    desc: 'Not a template you figure out yourself. You receive a complete, working product: design, development, and launch, ready from day one.',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="28" height="28" rx="2" stroke="#c8943a" strokeWidth="0.75" />
        <path d="M12 18l4 4 8-8" stroke="#c8943a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function BenefitsGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>What you get</p>
          <h2 className={styles.title}>
            What a proper website does for your business
          </h2>
          <p className={styles.intro}>
            You will see how many people visit, where are they from and what they look at the most. 
          </p>
        </header>
        <ul className={styles.grid} role="list">
          {benefits.map((b) => (
            <li key={b.title} className={styles.card}>
              <span className={styles.icon}>{b.icon}</span>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
