'use client';

import { useTranslations } from 'next-intl';
import styles from './UrgencyStrip.module.css';
import Marquee from "react-fast-marquee";


export default function UrgencyStrip() {
  const t = useTranslations('websites.urgency');
  
  return (
    <div className={styles.strip} role="banner">
      <Marquee className={styles.text}>
        {t('text')}<span aria-hidden="true"> &nbsp;·&nbsp; </span>
      </Marquee>
    </div>
  );
}
