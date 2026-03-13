import type { Metadata } from 'next';

import OrderBridgeCaseStudyClient from './OrderBridgeCaseStudyClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = `/${locale}/projects/orderbridge`;

  return {
    title: 'OrderBridge Case Study | Delivery-to-POS Automation Middleware',
    description:
      'OrderBridge is a real-time integration middleware that automates delivery order injection into restaurant POS systems, reducing errors and eliminating manual entry.',
    keywords: [
      'OrderBridge case study',
      'restaurant POS integration',
      'delivery platform automation',
      'webhook middleware',
      'food delivery API integration',
      'real-time order sync',
      'Fastify TypeScript Prisma',
    ],
    alternates: {
      canonical: path,
      languages: {
        en: '/en/projects/orderbridge',
        lo: '/lo/projects/orderbridge',
      },
    },
    openGraph: {
      title: 'OrderBridge Case Study: Delivery Platform to POS Automation',
      description:
        'See how OrderBridge processes delivery webhooks, translates payloads, and injects orders into POS systems in under 800ms.',
      url: path,
      type: 'article',
      images: [
        {
          url: '/images/projects/orderbridge/orderbridge-diagram.png',
          width: 2400,
          height: 1260,
          alt: 'OrderBridge architecture diagram showing delivery platforms flowing through OrderBridge into a restaurant POS',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OrderBridge Case Study: Delivery-to-POS Automation',
      description:
        'Architecture, stack, and outcomes of a real-time restaurant integration middleware.',
      images: ['/images/projects/orderbridge/orderbridge-diagram.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function OrderBridgePage({ params }: PageProps) {
  const { locale } = await params;
  const pageUrl = `${SITE_URL}/${locale}/projects/orderbridge`;

  const caseStudyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'OrderBridge: Delivery-to-POS Automation Middleware',
    description:
      'A technical case study on building OrderBridge, a middleware platform that receives delivery webhooks and injects standardized orders into restaurant POS systems.',
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    datePublished: '2026-01-01',
    dateModified: '2026-03-12',
    image: `${SITE_URL}/images/projects/orderbridge/orderbridge-diagram.png`,
    about: [
      'Restaurant automation',
      'POS API integration',
      'Webhook processing',
      'Real-time order synchronization',
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
        name: 'OrderBridge',
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
      <OrderBridgeCaseStudyClient />
    </>
  );
}
