import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSection from '@/app/components/home/HeroSection';
import WorkSection from '@/app/components/home/WorkSection';
import AboutSection from '@/app/components/home/AboutSection';
import BlogSection from '@/app/components/home/BlogSection';
import ServicesSection from '@/app/components/home/ServicesSection';
import ReferralSection from '@/app/components/home/ReferralSection';
import ContactSection from '@/app/components/home/ContactSection';
import ReferralModal from '@/app/components/home/ReferralModal';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        lo: '/lo',
        es: '/es',
        'x-default': '/en',
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Maxon Torres',
        description:
          'Freelance Software Developer in Vientiane, Laos specializing in Next.js, React, Node.js, GraphQL, and AWS Serverless architecture.',
        inLanguage: locale,
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Maximiliano Brito Torres',
        alternateName: 'Maxon Torres',
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpg`,
        jobTitle: 'Freelance Software Developer',
        description: 'Freelance Software Developer in Vientiane, Laos specializing in Next.js, React, Node.js, GraphQL, and AWS Serverless architecture',
        workLocation: {
          '@type': 'Place',
          name: 'Vientiane',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Vientiane',
            addressCountry: 'LA',
          },
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vientiane',
          addressCountry: 'LA',
        },
        sameAs: [
          'https://www.linkedin.com/in/maxontorres/',
          'https://github.com/maxonreid',
        ],
        knowsAbout: ['Next.js', 'React', 'Node.js', 'GraphQL', 'AWS Serverless', 'TypeScript'],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Freelance Software Developer',
          occupationLocation: {
            '@type': 'City',
            name: 'Vientiane',
          },
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'Freelance Software Development Services',
        description: 'Professional freelance software development services in Vientiane, Laos. Specializing in web application development, full-stack development, and cloud solutions.',
        provider: {
          '@id': `${SITE_URL}/#person`,
        },
        areaServed: {
          '@type': 'City',
          name: 'Vientiane',
          '@id': 'https://www.wikidata.org/wiki/Q9326',
        },
        serviceType: ['Web Development', 'Software Development', 'Full Stack Development', 'Freelance Development'],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <BlogSection />
        <ServicesSection />
        <ReferralSection />
        <ContactSection />
      </main>
      <Footer />
      <ReferralModal />
    </>
  );
}