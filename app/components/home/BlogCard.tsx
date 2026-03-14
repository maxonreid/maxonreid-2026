'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

import type { Article } from '@/app/lib/articles';

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? '/lo' : '/en';
  const t = useTranslations('blog');
  
  return (
    <Link href={`${locale}/articles/${article.slug}`} className="block group">
      <article className="relative bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#d6b46b]/50 hover:-translate-y-1 transition-all hover:shadow-[0_12px_40px_rgba(214,180,107,0.1)]" tabIndex={0}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
      </div>
      <div className="p-6">
        <div className="font-mono text-xs text-[#9ea0a8] mb-3 flex items-center gap-2">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime} read</span>
        </div>
        
        <h3 className="text-xl font-bold text-[#e6e7ea] mb-3 group-hover:text-[#d6b46b] transition-colors">
          {article.title} 
        </h3>
        
        <p 
          className="text-[#9ea0a8] leading-relaxed mb-4"
          id={`blog-excerpt-${article.id}`}
        >
          {article.excerpt}
        </p>
        
        <div className="flex items-end justify-between gap-4 pt-2 border-t border-white/[0.06]">
          <div className="font-mono text-xs flex flex-wrap gap-2 min-w-0">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] text-[#b6b9c3] px-2.5 py-1 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="shrink-0">
            <span className="font-mono text-sm text-[#d6b46b] inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
              {t('readMore')}
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[#d6b46b]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" aria-hidden="true"></div>
    </article>
    </Link>
  );
}
