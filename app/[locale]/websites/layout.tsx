import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'websites' });
  const path = `/${locale}/websites`;

  return {
    title: t('meta.title'),
    description: t('meta.description'),
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
    alternates: {
      canonical: path,
      languages: {
        en: '/en/websites',
        lo: '/lo/websites',
        es: '/es/websites',
      },
    },
    openGraph: {
      title: t('meta.ogTitle'),
      description: t('meta.ogDescription'),
      url: `${SITE_URL}${path}`,
      siteName: 'Maxon Torres',
      type: 'website',
      images: [
        {
          url: '/og/websites.png',
          width: 1200,
          height: 630,
          alt: t('meta.ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.ogTitle'),
      description: t('meta.ogDescription'),
      images: ['/og/websites.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}

export default async function ServicesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
}) {
  const { locale } = await params;
  const isLao = locale === 'lo';

  return (
    <div className={`${isLao ? notoSansLao.variable : `${dmSans.variable} ${playfairDisplay.variable}`}`}>
      {children}
    </div>
  );
}
