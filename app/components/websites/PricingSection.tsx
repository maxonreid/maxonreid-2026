import styles from './PricingSection.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

const tiers = [
  {
    label: 'Presence',
    name: 'Website',
    regularPrice: '$800',
    price: '$400',
    tagline: 'For hotels, restaurants, tour operators, and any business that needs to be found online.',
    includes: [
      '5\u20138 pages, fully designed',
      'As many languages as you need',
      'SEO-optimised for Google',
      'Umami analytics built in',
      'Mobile-ready on all devices',
      'Delivered in 2\u20133 weeks',
    ],
    cta: 'Start your website',
  },
  {
    label: 'Platform',
    name: 'Web App',
    regularPrice: '$1,800',
    price: '$900',
    tagline: 'For businesses that manage data — listings, bookings, inventory, team access, and leads.',
    includes: [
      'Full database and admin panel',
      'User roles and secure login',
      'Listings, CRM, or inventory system',
      'Works as an app on your phone',
      'As many languages as you need',
      'Delivered in 4\u20135 weeks',
    ],
    cta: 'Start your web app',
    highlight: true,
  },
];

export default function PricingSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Investment</p>
          <h2 className={styles.title}>Simple, transparent pricing</h2>
          <p className={styles.intro}>One flat fee. No hidden costs. No surprises.</p>
        </header>

        <div className={styles.banner}>
          <span className={styles.pulse} />
          <p className={styles.bannerText}>
            Just launched — introductory prices. These prices are lower than they will be. Once the first client slots are filled, rates go up. If you are considering it, now is the right time.
          </p>
        </div>

        <div className={styles.tiers}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={tier.highlight ? `${styles.tierCard} ${styles.tierHighlight}` : styles.tierCard}
            >
              {tier.highlight && (
                <div className={styles.badge}>Most popular</div>
              )}
              <div className={styles.tierHeader}>
                <p className={styles.tierLabel}>{tier.label}</p>
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierTagline}>{tier.tagline}</p>
                <div className={styles.priceRow}>
                  <span className={styles.regularPrice}>{tier.regularPrice}</span>
                  <span className={styles.price}>{tier.price}</span>
                  <span className={styles.priceNote}>USD &middot; one-time &middot; limited slots</span>
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
          <strong>Not sure which one you need?</strong>{' '}
          Send me your Facebook page on WhatsApp and I will tell you exactly what makes sense for your business. Free, no obligation.
        </div>
      </div>
    </section>
  );
}
