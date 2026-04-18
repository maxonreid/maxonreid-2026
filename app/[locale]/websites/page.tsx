import ServicesLanding from '@/app/components/websites/ServicesLanding';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}/websites#service`,
        name: 'Web Design & Development',
        description:
          'Custom website design and development for small businesses in Laos and beyond. SEO-optimised, mobile-first, multilingual. Starting at $400.',
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: { '@type': 'Place', name: 'Vientiane, Laos' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: '400',
          availability: 'https://schema.org/InStock',
        },
        serviceType: ['Web Design', 'Web Development', 'SEO', 'PWA Development'],
        url: `${SITE_URL}/${locale}/websites`,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Maxon Torres — Web Design & Development',
        url: SITE_URL,
        description:
          'Freelance web designer and developer in Vientiane, Laos. Building fast, modern, multilingual websites for small businesses starting at $400.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vientiane',
          addressCountry: 'LA',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Spanish', 'Lao'],
        },
        priceRange: '$400–$900',
        currenciesAccepted: 'USD',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesLanding locale={locale} />
    </>
  );
}
