import type { Metadata } from 'next';

import PMRealEstateCaseStudyClient from './PMRealEstateCaseStudyClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/projects/real-estate-website-laos`;

  return {
    title: 'Trilingual Real Estate Website Case Study | Next.js + Admin Dashboard',
    description:
      'How I built a trilingual EN/LO/ZH real estate listing platform for a Vientiane agency — with server-rendered property pages, Google OAuth, and a full admin dashboard for listings, clients, and deals.',
    keywords: [
      'trilingual real estate website',
      'Next.js real estate website',
      'Laos real estate platform',
      'next-intl trilingual routing',
      'real estate admin dashboard',
      'Google OAuth Next.js',
      'Vientiane property website',
      'Next.js case study',
    ],
    alternates: {
      canonical: path,
      languages: {
        en: '/en/projects/real-estate-website-laos',
        lo: '/lo/projects/real-estate-website-laos',
        es: '/es/projects/real-estate-website-laos',
      },
    },
    openGraph: {
      title: 'Trilingual Real Estate Website: Next.js + Admin Dashboard',
      description:
        'A trilingual EN/LO/ZH real estate listing platform built for a Vientiane agency — server-rendered property pages, Google OAuth-secured admin, and a full CMS for listings, clients, and deals.',
      url: path,
      type: 'article',
      images: [
        {
          url: '/images/projects/pmlaos/pmlaos.com_homepage.png',
          width: 1200,
          height: 630,
          alt: 'PM Real Estate Laos homepage — property listings with clean professional layout',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trilingual Real Estate Website with Admin Dashboard',
      description:
        'Trilingual EN/LO/ZH real estate platform with server-rendered listings, Google OAuth admin, and full CMS.',
      images: ['/images/projects/pmlaos/pmlaos.com_homepage.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PMRealEstatePage({ params }: PageProps) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/${locale}/projects/real-estate-website-laos`;

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Trilingual Real Estate Website: Next.js + Admin Dashboard',
    description:
      'A technical case study on building a trilingual EN/LO/ZH real estate listing platform for a Vientiane agency using Next.js 15, next-intl, Prisma, and Google OAuth.',
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    datePublished: '2025-06-01',
    dateModified: '2026-04-15',
    image: `${SITE_URL}/images/projects/pmlaos/pmlaos.com_homepage.png`,
    about: [
      'Trilingual website development',
      'Real estate platform',
      'Admin dashboard',
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
        name: 'PM Real Estate Laos',
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
      <PMRealEstateCaseStudyClient />
    </>
  );
}
