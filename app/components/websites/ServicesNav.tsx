import styles from './ServicesNav.module.css';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=Hi%20Maxon%2C%20I%20would%20like%20a%20free%20website%20audit.`;

interface Props {
  locale: string;
}

export default function ServicesNav({ locale }: Props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href={`/${locale}`} className={styles.logo} aria-label="Back to maxontorres.com">
          maxon<span className={styles.dot}>.</span>
        </a>
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          Free website audit
        </a>
      </div>
    </nav>
  );
}
