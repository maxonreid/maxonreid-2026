import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, Noto_Sans_Lao } from 'next/font/google';

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

const notoSansLao = Noto_Sans_Lao({
  variable: '--font-noto-sans-lao',
  subsets: ['lao'],
  weight: ['300', '400', '500', '600', '700'],
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

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isLao = locale === 'lo';

  return (
    <div className={`${isLao ? notoSansLao.variable : `${dmSans.variable} ${playfairDisplay.variable}`}`}>
      {children}
    </div>
  );
}
