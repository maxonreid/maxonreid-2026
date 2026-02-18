'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BlogCard from './BlogCard';

// Mock data: Articles
const articles = [
  {
    id: 1,
    title: 'Building Secure APIs at Scale',
    excerpt:
      'How to design modern REST APIs with proper authentication, rate-limiting, and observability from day one.',
    date: 'Dec 10, 2024',
    readTime: '8 min',
    tags: ['Security', 'Backend'],
    image: 'https://picsum.photos/id/60/400/240',
  },
  {
    id: 2,
    title: 'Zero Downtime Deployments with Docker',
    excerpt:
      'A practical guide to rolling updates and blue/green strategies for containerized web apps.',
    date: 'Nov 22, 2024',
    readTime: '6 min',
    tags: ['DevOps', 'Docker'],
    image: 'https://picsum.photos/id/1/400/240',
  },
  {
    id: 3,
    title: 'React Server Components Explained',
    excerpt:
      'An in-depth look at how RSC works under the hood, plus real-world patterns for Next.js.',
    date: 'Nov 5, 2024',
    readTime: '10 min',
    tags: ['React', 'Next.js'],
    image: 'https://picsum.photos/id/326/400/240',
  },
];

export default function BlogSection() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState<typeof articles>([]);
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? '/lo' : '/en';
  const t = useTranslations('blog');

  useEffect(() => {

    // Simulate loading state for better perceived performance
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setVisibleArticles(articles);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="blog"
      className="section blog-section container"
      aria-labelledby="blog-heading"
    >
      
      <div className="section-header">
        <div className="section-meta mono muted">
          {t('sectionLabel')} — {articles.length} {t('articleCount', { count: articles.length }).split(' ')[1]}
        </div>
        <h2 id="blog-heading" className="section-title">
          {t('title')}
        </h2>
        <p className="section-sub">
          {t('subtitle')}
        </p>
      </div>

      <div className={`blog-container ${isLoaded ? 'loaded' : 'loading'}`}>
        {!isLoaded ? (
          <div className="grid blog-cards">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="blog-card skeleton" aria-hidden="true">
                <div className="blog-card-image"></div>
                <div className="blog-card-inner">
                  <div className="skeleton-meta"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-excerpt"></div>
                  <div className="skeleton-tags"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid blog-cards">
            {visibleArticles.map((article, index) => (
              <div
                key={article.id}
                className="blog-card-wrapper"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <BlogCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-footer">
        <Link href={`${locale}/articles`} className="cta ghost" aria-label="View all articles">
          <span>{t('viewAll')}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 1L15 8L8 15M15 8H1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
