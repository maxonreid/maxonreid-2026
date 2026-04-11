import styles from './UrgencyStrip.module.css';
import Marquee from "react-fast-marquee";


export default function UrgencyStrip() {
  return (
    <div className={styles.strip} role="banner">
      <Marquee className={styles.text}>


        Every day without a website is a customer you didn&apos;t know you lost.
      </Marquee>
    </div>
  );
}
