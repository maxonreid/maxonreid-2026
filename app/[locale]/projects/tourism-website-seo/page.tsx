import type { Metadata } from 'next';

import LaoMaiTravelCaseStudyClient from './LaoMaiTravelCaseStudyClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/projects/tourism-website-seo`;

  return {
    title: 'Bilingual Tourism Website Case Study | SEO & Analytics with Next.js',
    description:
      'How I built a bilingual EN/TH tourism website for a Vientiane-based tour operator — with server-side SEO, web traffic analytics via Umami, and a booking inquiry system using Resend.',
    keywords: [
      'bilingual tourism website',
      'Next.js tourism website',
      'next-intl bilingual routing',
      'Umami analytics',
      'SEO tourism website',
      'English Thai website',
      'Next.js case study',
    ],
    alternates: {
      canonical: path,
      languages: {
        en: '/en/projects/tourism-website-seo',
        lo: '/lo/projects/tourism-website-seo',
        es: '/es/projects/tourism-website-seo',
      },
    },
    openGraph: {
      title: 'Bilingual Tourism Website: SEO & Web Traffic Analytics with Next.js',
      description:
        'A Next.js 15 website built for a Vientiane tour operator — bilingual EN/TH routing, server-rendered SEO, and Umami analytics so the client finally knows who is visiting.',
      url: path,
      type: 'article',
      images: [
        {
          url: '/images/projects/laomaitravel/hero-section.png',
          width: 1200,
          height: 630,
          alt: 'Lao Mai Travel website hero section — navy and gold design with temple photograph',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bilingual Tourism Website with SEO & Analytics',
      description:
        'Bilingual EN/TH tourism site with server-side SEO, web traffic analytics, and booking inquiries via Resend.',
      images: ['/images/projects/laomaitravel/hero-section.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LaoMaiTravelPage({ params }: PageProps) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/${locale}/projects/tourism-website-seo`;

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Bilingual Tourism Website: SEO & Analytics with Next.js',
    description:
      'A technical case study on building a bilingual EN/TH tourism website for a Vientiane-based tour operator using Next.js 15, next-intl, Umami, and Resend.',
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    datePublished: '2025-09-01',
    dateModified: '2026-03-20',
    image: `${SITE_URL}/images/projects/laomaitravel/hero-section.png`,
    about: [
      'Bilingual website development',
      'Tourism SEO',
      'Web Traffic Analytics',
      'Next.js App Router',
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}/${locale}#work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Lao Mai Travel',
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LaoMaiTravelCaseStudyClient />
    </>
  );
}
