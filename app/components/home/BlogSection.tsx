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
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="blog-heading"
    >
      
      <div className="mb-12 text-center">
        <div className="font-mono text-sm text-[#9ea0a8] tracking-[2px] mb-4">
          {t('sectionLabel')} — {articles.length} {t('articleCount', { count: articles.length }).split(' ')[1]}
        </div>
        <h2 id="blog-heading" className="text-4xl md:text-5xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-[#9ea0a8] max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-50'}`}>
        {!isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden animate-pulse" aria-hidden="true">
                <div className="w-full h-48 bg-white/[0.05]"></div>
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-white/[0.05] rounded w-1/3"></div>
                  <div className="h-6 bg-white/[0.05] rounded w-full"></div>
                  <div className="h-4 bg-white/[0.05] rounded w-full"></div>
                  <div className="h-4 bg-white/[0.05] rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleArticles.map((article, index) => (
              <div
                key={article.id}
                className="animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
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

      <div className="flex justify-center mt-12">
        <Link href={`${locale}/articles`} className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#e6e7ea] font-mono hover:border-[#d6b46b] hover:text-[#d6b46b] transition-all" aria-label="View all articles">
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
