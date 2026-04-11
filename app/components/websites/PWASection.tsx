import styles from './PWASection.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

export default function PWASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Platform web apps</p>
          <h2 className={styles.title}>
            Manage your business
            <br />
            <em className={styles.italic}>from anywhere.</em>
          </h2>
          <p className={styles.body}>
            Your platform works like an app on your phone. No download required.
            Check listings, update inventory, and respond to leads from wherever you are.
          </p>
          <p className={styles.body}>
            Add it to your home screen and it opens instantly, just like any other app.
            Works on iPhone and Android.
          </p>
          <span className={styles.chip}>No App Store needed</span>
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Ask about PWA add-on &rarr;
          </a>
        </div>

        <div className={styles.phoneWrap} aria-hidden="true">
          <div className={styles.phone}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <div className={styles.appHeader}>
                <span className={styles.appDot} />
                <span className={styles.appTitle}>My Business</span>
              </div>
              <div className={styles.appNav}>
                {['Home', 'Services', 'Contact'].map((label) => (
                  <span key={label} className={styles.appNavItem}>{label}</span>
                ))}
              </div>
              <div className={styles.appContent}>
                <div className={styles.appHeroBlock} />
                <div className={styles.appCardRow}>
                  <div className={styles.appCard} />
                  <div className={styles.appCard} />
                </div>
                <div className={styles.appTextLine} style={{ width: '80%' }} />
                <div className={styles.appTextLine} style={{ width: '60%' }} />
                <div className={styles.appCta} />
              </div>
            </div>
            <div className={styles.phoneButton} />
          </div>
        </div>
      </div>
    </section>
  );
}
