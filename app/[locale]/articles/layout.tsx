import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'articles' })
  const path = `/${locale}/articles`

  return {
    title: t('heroTitle'),
    description: t('heroSubtitle'),
    alternates: {
      canonical: path,
      languages: {
        en: '/en/articles',
        lo: '/lo/articles',
        es: '/es/articles',
      },
    },
    openGraph: {
      title: t('heroTitle'),
      description: t('heroSubtitle'),
      url: `${SITE_URL}${path}`,
      siteName: 'Maxon Torres',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Maxon Torres — Articles and Technical Writing',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('heroTitle'),
      description: t('heroSubtitle'),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  }
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
