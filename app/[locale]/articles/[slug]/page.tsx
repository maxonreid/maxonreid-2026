import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles } from '@/app/lib/articles';
import OrderBridgeArticle from './OrderBridgeArticle';
import YangoUniversityArticle from './YangoUniversityArticle';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type ArticleRouteParams = {
  slug: string;
  locale: string;
};

function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug && a.published);
}

function toISODate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export function generateStaticParams() {
  const locales = ['en', 'lo'];
  const publishedArticles = articles.filter((a) => a.published);

  return publishedArticles.flatMap((article) =>
    locales.map((locale) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleRouteParams>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${locale}/articles/${article.slug}`;
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
  const publishedTime = toISODate(article.date);
  const absoluteImageUrl = new URL(article.image, SITE_URL).toString();

  return {
    title: `${article.title} | Maxon Torres`,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: 'Maximiliano Brito Torres', url: SITE_URL }],
    creator: 'Maximiliano Brito Torres',
    publisher: 'Maximiliano Brito Torres',
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en/articles/${article.slug}`,
        lo: `/lo/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: article.title,
      description: article.excerpt,
      siteName: 'Maxon Torres',
      locale: locale === 'lo' ? 'lo_LA' : 'en_US',
      publishedTime,
      modifiedTime: publishedTime,
      authors: ['Maximiliano Brito Torres'],
      tags: article.tags,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@maxonreid',
      creator: '@maxonreid',
      title: article.title,
      description: article.excerpt,
      images: [absoluteImageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticleRouteParams>;
}) {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Route to the specific article renderer
  if (slug === 'how-i-built-orderbridge') {
    return <OrderBridgeArticle locale={locale} article={article} />;
  }

  if (slug === 'teaching-web-development-china-yango-university') {
    return <YangoUniversityArticle locale={locale} article={article} />;
  }

  notFound();
}
