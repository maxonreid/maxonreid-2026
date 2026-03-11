'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogCard from '../../components/home/BlogCard';
import { articles as allArticles } from '@/app/lib/articles';

const SORT_OPTIONS = ['recent', 'oldest', 'longest', 'shortest'] as const;
type SortOption = typeof SORT_OPTIONS[number];

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslations('articles');

  const categories = [
    { id: 'all',      label: t('categories.all'),      count: allArticles.length },
    { id: 'frontend', label: t('categories.frontend'), count: allArticles.filter(a => a.category === 'frontend').length },
    { id: 'backend',  label: t('categories.backend'),  count: allArticles.filter(a => a.category === 'backend').length },
    { id: 'devops',   label: t('categories.devops'),   count: allArticles.filter(a => a.category === 'devops').length },
  ];

  const filteredArticles = useMemo(() => {
    let result = allArticles;

    if (activeCategory !== 'all') {
      result = result.filter(a => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'recent':  return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':  return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'longest': return parseInt(b.readTime) - parseInt(a.readTime);
        case 'shortest':return parseInt(a.readTime) - parseInt(b.readTime);
        default:        return 0;
      }
    });
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <>
      <Header />

      <main style={{ background: 'var(--bg-primary)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-16 w-[92%] max-w-[1200px] mx-auto">
          <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-6">
            {t('heroLabel')} — {allArticles.length} {allArticles.length === 1 ? 'ARTICLE' : 'ARTICLES'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#e6e7ea] leading-none mb-6">
            {t('heroTitle').split(' & ')[0]}{' '}
            &{' '}
            <span className="text-[#d6b46b]">{t('heroTitle').split(' & ')[1]}</span>
          </h1>
          <p className="text-xl text-[#9ea0a8] max-w-2xl leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </section>

        {/* ── Controls ─────────────────────────────────────────────────────── */}
        <section className="border-t border-white/[0.06] py-6 sticky top-[72px] z-30 backdrop-blur-md"
          style={{ backgroundColor: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)' }}
        >
          <div className="w-[92%] max-w-[1200px] mx-auto flex flex-col gap-4">

            {/* Search + Sort row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ea0a8] pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search articles"
                  className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[#e6e7ea] text-sm font-mono placeholder:text-[#9ea0a8] focus:outline-none focus:border-[#d6b46b]/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ea0a8] hover:text-[#e6e7ea] transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-[#9ea0a8] whitespace-nowrap">
                  {t('sortBy')}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-white/[0.02] border border-white/[0.06] text-[#9ea0a8] text-sm font-mono rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d6b46b]/50 transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  {SORT_OPTIONS.map((id) => (
                    <option key={id} value={id}>
                      {t(`sortOptions.${id}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all flex items-center gap-2 ${
                    activeCategory === cat.id
                      ? 'bg-[#d6b46b]/10 border-[#d6b46b] text-[#d6b46b]'
                      : 'bg-transparent border-white/[0.06] text-[#9ea0a8] hover:border-[#d6b46b]/50 hover:text-[#e6e7ea]'
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                    activeCategory === cat.id
                      ? 'bg-[#d6b46b]/20 text-[#d6b46b]'
                      : 'bg-white/[0.06] text-[#9ea0a8]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <section className="py-16 w-[92%] max-w-[1200px] mx-auto" role="tabpanel">
          {filteredArticles.length > 0 ? (
            <>
              <p className="font-mono text-xs text-[#9ea0a8] mb-8">
                {filteredArticles.length === 1
                  ? t('showing', { count: filteredArticles.length })
                  : t('showingPlural', { count: filteredArticles.length })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="animate-[fadeInUp_0.5s_ease-out_forwards] opacity-0"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <BlogCard article={article} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <div className="w-16 h-16 rounded-full border border-white/[0.06] flex items-center justify-center mb-2">
                <Search size={24} className="text-[#9ea0a8]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-[#e6e7ea]">
                {t('noResults.title')}
              </h3>
              <p className="text-[#9ea0a8] max-w-sm leading-relaxed">
                {t('noResults.message')}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-2 px-5 py-2.5 rounded-lg border border-white/[0.06] font-mono text-sm text-[#9ea0a8] hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
              >
                {t('noResults.clearFilters')}
              </button>
            </div>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
}
