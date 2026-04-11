import styles from './CarePlans.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

const plans = [
  {
    name: 'Basic Care',
    price: '$30',
    period: '/month',
    for: 'For presence websites',
    includes: [
      'Hosting covered',
      'Uptime monitoring',
      '1 content update per month',
      'Email support',
    ],
    quip: "🍺 One night at Tully's. Your website stays online 24/7 either way — at least one of them remembers you in the morning.",
  },
  {
    name: 'Active Care',
    price: '$80',
    period: '/month',
    for: 'For platform web apps',
    includes: [
      'Hosting and database covered',
      'Priority support within 24h',
      'Up to 5 updates per month',
      'Monthly analytics report',
    ],
    quip: 'Less than one boosted Facebook post that disappears in 3 days. This keeps your platform running and updated all month.',
    highlight: true,
  },
];

export default function CarePlans() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Monthly support</p>
          <h2 className={styles.title}>Keep your site running. Always.</h2>
          <p className={styles.subtitle}>
            Optional care plans so your website stays updated and you never have to worry about it.
          </p>
        </header>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={plan.highlight ? `${styles.card} ${styles.cardHighlight}` : styles.card}
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
                {/* <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.highlight ? `${styles.cta} ${styles.ctaSolid}` : styles.cta}
                >
                  Add to project &rarr;
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
