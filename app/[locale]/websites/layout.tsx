import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Web Design & Development Services | Maxon Torres',
  description:
    'Fast, modern websites and web apps for small businesses in Laos, Latin America, and beyond. SEO-optimized, mobile-first, multilingual. Starting at $400.',
  keywords: [
    'web design Laos',
    'website development Vientiane',
    'web app developer',
    'SEO website Laos',
    'small business website',
    'PWA developer',
    'affordable web design',
    'Next.js developer Laos',
  ],
  openGraph: {
    title: 'Web Design & Development Services | Maxon Torres',
    description:
      'Fast, modern websites for small businesses. SEO-ready, mobile-first, multilingual. Starting at $400.',
    url: 'https://maxontorres.com/en/websites',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      {children}
    </div>
  );
}
