'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? '/lo' : '/en';
  
  return (
    <Link href={`${locale}/articles/${article.id}`} className="blog-card-link">
      <article className="blog-card" tabIndex={0}>
      <div className="blog-card-image">
        <img 
          src={article.image} 
          alt={article.title}
          loading="lazy"
          className="blog-image"
        />
        <div className="blog-image-overlay" aria-hidden="true"></div>
      </div>
      <div className="blog-card-inner">
        <div className="blog-meta mono muted">
          <span className="blog-date">{article.date}</span>
          <span className="blog-separator">·</span>
          <span className="blog-read-time">{article.readTime} read</span>
        </div>
        
        <h3 className="blog-title">
          <span className="blog-title-text">
            {article.title}
          </span>
        </h3>
        
        <p 
          className="blog-excerpt" 
          id={`blog-excerpt-${article.id}`}
        >
          {article.excerpt}
        </p>
        
        <div className="blog-footer">
          <div className="blog-tags mono">
            {article.tags.map((tag, i) => (
              <span key={i} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="blog-action">
            <span className="blog-cta mono">
              Read More
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 6H9M9 6L6 3M9 6L6 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      
      <div className="blog-card-glow" aria-hidden="true"></div>
    </article>
    </Link>
  );
}
