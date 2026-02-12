'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogCard from '../../components/home/BlogCard';

// Mock articles data - expand with more articles
const allArticles = [
  {
    id: 1,
    title: 'Building Secure APIs at Scale',
    excerpt:
      'How to design modern REST APIs with proper authentication, rate-limiting, and observability from day one.',
    date: 'Dec 10, 2024',
    readTime: '8 min',
    tags: ['Security', 'Backend', 'API'],
    image: 'https://picsum.photos/id/60/400/240',
    category: 'backend',
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
    category: 'devops',
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
    category: 'frontend',
  },
  {
    id: 4,
    title: 'TypeScript Best Practices for 2025',
    excerpt:
      'Advanced TypeScript patterns and practices for building maintainable large-scale applications.',
    date: 'Jan 15, 2025',
    readTime: '12 min',
    tags: ['TypeScript', 'Best Practices'],
    image: 'https://picsum.photos/id/180/400/240',
    category: 'frontend',
  },
  {
    id: 5,
    title: 'Database Optimization Techniques',
    excerpt:
      'Proven strategies for optimizing PostgreSQL queries and improving database performance at scale.',
    date: 'Jan 8, 2025',
    readTime: '9 min',
    tags: ['Database', 'PostgreSQL', 'Performance'],
    image: 'https://picsum.photos/id/1011/400/240',
    category: 'backend',
  },
  {
    id: 6,
    title: 'Building Real-Time Features with WebSockets',
    excerpt:
      'Implementing live updates, chat, and collaborative features with WebSocket connections.',
    date: 'Dec 28, 2024',
    readTime: '7 min',
    tags: ['WebSockets', 'Real-time'],
    image: 'https://picsum.photos/id/1015/400/240',
    category: 'backend',
  },
  {
    id: 7,
    title: 'CSS Grid vs Flexbox: When to Use Each',
    excerpt:
      'A comprehensive comparison of CSS layout systems with practical examples and use cases.',
    date: 'Dec 5, 2024',
    readTime: '5 min',
    tags: ['CSS', 'Frontend'],
    image: 'https://picsum.photos/id/169/400/240',
    category: 'frontend',
  },
  {
    id: 8,
    title: 'Microservices Architecture Patterns',
    excerpt:
      'Design patterns and best practices for building scalable microservices-based systems.',
    date: 'Nov 18, 2024',
    readTime: '11 min',
    tags: ['Architecture', 'Microservices'],
    image: 'https://picsum.photos/id/3/400/240',
    category: 'backend',
  },
  {
    id: 9,
    title: 'CI/CD Pipeline with GitHub Actions',
    excerpt:
      'Complete guide to setting up automated testing and deployment workflows for modern web apps.',
    date: 'Nov 10, 2024',
    readTime: '8 min',
    tags: ['CI/CD', 'GitHub', 'DevOps'],
    image: 'https://picsum.photos/id/10/400/240',
    category: 'devops',
  },
];

const categories = [
  { id: 'all', label: 'All Articles', count: allArticles.length },
  { 
    id: 'frontend', 
    label: 'Frontend', 
    count: allArticles.filter(a => a.category === 'frontend').length 
  },
  { 
    id: 'backend', 
    label: 'Backend', 
    count: allArticles.filter(a => a.category === 'backend').length 
  },
  { 
    id: 'devops', 
    label: 'DevOps', 
    count: allArticles.filter(a => a.category === 'devops').length 
  },
];

const sortOptions = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'longest', label: 'Longest Read' },
  { id: 'shortest', label: 'Shortest Read' },
];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('articles');

  const categories = [
    { id: 'all', label: t('categories.all'), count: allArticles.length },
    { 
      id: 'frontend', 
      label: t('categories.frontend'), 
      count: allArticles.filter(a => a.category === 'frontend').length 
    },
    { 
      id: 'backend', 
      label: t('categories.backend'), 
      count: allArticles.filter(a => a.category === 'backend').length 
    },
    { 
      id: 'devops', 
      label: t('categories.devops'), 
      count: allArticles.filter(a => a.category === 'devops').length 
    },
  ];

  const sortOptions = [
    { id: 'recent', label: t('sortOptions.recent') },
    { id: 'oldest', label: t('sortOptions.oldest') },
    { id: 'longest', label: t('sortOptions.longest') },
    { id: 'shortest', label: t('sortOptions.shortest') },
  ];

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = allArticles;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort articles
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'longest':
          return parseInt(b.readTime) - parseInt(a.readTime);
        case 'shortest':
          return parseInt(a.readTime) - parseInt(b.readTime);
        default:
          return 0;
      }
    });

    return sorted;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <>
      <Header />
      <main className="articles-page">
        {/* Hero Section */}
        <section className="articles-hero">
          <div className="container">
            <div className="articles-hero-content">
              <div className="hero-label mono muted">
                {t('heroLabel')} — {allArticles.length} {t('articleCount', { count: allArticles.length }).split(' ')[1]}
              </div>
              <h1 className="articles-hero-title">
                {t('heroTitle').split(' & ')[0]} & <span className="gold">{t('heroTitle').split(' & ')[1]}</span>
              </h1>
              <p className="articles-hero-sub">
                {t('heroSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="articles-controls">
          <div className="container">
            <div className="controls-grid">
              {/* Search */}
              <div className="search-wrapper">
                <svg
                  className="search-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="search"
                  className="search-input"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search articles"
                />
                {searchQuery && (
                  <button
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="sort-wrapper">
                <label htmlFor="sort-select" className="sort-label mono">
                  {t('sortBy')}
                </label>
                <select
                  id="sort-select"
                  className="sort-select mono"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters" role="tablist" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-btn ${
                    activeCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                  <span className="category-count mono">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="articles-content">
          <div className="container">
            {filteredArticles.length > 0 ? (
              <>
                <div className="articles-meta mono muted">
                  {filteredArticles.length === 1 
                    ? t('showing', { count: filteredArticles.length })
                    : t('showingPlural', { count: filteredArticles.length })
                  }
                </div>
                <div className="grid blog-cards" role="tabpanel">
                  {filteredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="blog-card-wrapper"
                      style={{
                        animationDelay: `${index * 80}ms`,
                      }}
                    >
                      <BlogCard article={article} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-results">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="no-results-icon"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <h3>{t('noResults.title')}</h3>
                <p>
                  {t('noResults.message')}
                </p>
                <button
                  className="cta ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  {t('noResults.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}