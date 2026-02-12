'use client';

import { notFound } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useEffect, useState } from 'react';

// Mock article data - In production, fetch from CMS/API
const articles = {
  '1': {
    id: 1,
    title: 'Building Secure APIs at Scale',
    excerpt:
      'How to design modern REST APIs with proper authentication, rate-limiting, and observability from day one.',
    date: 'Dec 10, 2024',
    readTime: '8 min',
    author: {
      name: 'Maxon Reid',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxon',
      bio: 'Full-Stack Developer specializing in scalable web applications',
    },
    tags: ['Security', 'Backend', 'API'],
    image: 'https://picsum.photos/id/60/1200/600',
    category: 'backend',
    content: `
      <p class="lead">In today's interconnected world, building secure and scalable APIs is more critical than ever. This comprehensive guide walks through the essential patterns and practices for designing production-ready REST APIs.</p>

      <h2>Authentication & Authorization</h2>
      <p>Security starts with proper authentication. We'll explore JWT tokens, OAuth 2.0, and best practices for securing your endpoints. Understanding the difference between authentication (who you are) and authorization (what you can do) is crucial for building secure systems.</p>

      <pre><code>// Example: JWT middleware implementation
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};</code></pre>

      <h2>Rate Limiting</h2>
      <p>Protecting your API from abuse requires intelligent rate limiting. We'll implement sliding window algorithms and discuss strategies for different user tiers.</p>

      <blockquote>
        <p>"The best security is layered security. Rate limiting is just one piece of a comprehensive defense strategy."</p>
      </blockquote>

      <h2>API Design Best Practices</h2>
      <ul>
        <li><strong>Use proper HTTP methods:</strong> GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing.</li>
        <li><strong>Version your API:</strong> Use URL versioning (e.g., /api/v1/) or header-based versioning.</li>
        <li><strong>Return meaningful status codes:</strong> 200 for success, 201 for created, 400 for bad requests, 401 for unauthorized, etc.</li>
        <li><strong>Implement pagination:</strong> Never return unbounded result sets.</li>
        <li><strong>Use proper error responses:</strong> Consistent error format across all endpoints.</li>
      </ul>

      <h2>Observability & Monitoring</h2>
      <p>You can't fix what you can't measure. Implementing comprehensive logging, metrics, and tracing from day one will save countless hours of debugging later.</p>

      <h3>Key Metrics to Track</h3>
      <ol>
        <li>Request rate and response times</li>
        <li>Error rates by endpoint and status code</li>
        <li>Database query performance</li>
        <li>Resource utilization (CPU, memory, network)</li>
      </ol>

      <h2>Performance Optimization</h2>
      <p>Speed matters. We'll cover caching strategies, database indexing, and connection pooling to ensure your API can handle production traffic.</p>

      <pre><code>// Redis caching example
const getCachedData = async (key) => {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const fresh = await database.query(key);
  await redis.setex(key, 3600, JSON.stringify(fresh));
  return fresh;
};</code></pre>

      <h2>Testing Strategy</h2>
      <p>A robust testing strategy includes unit tests, integration tests, and end-to-end tests. Don't forget to test error scenarios and edge cases.</p>

      <h2>Conclusion</h2>
      <p>Building secure, scalable APIs requires careful planning and attention to detail. By following these patterns and practices, you'll be well-equipped to design systems that can grow with your business while maintaining security and performance.</p>

      <p>Remember: security is not a feature you add at the end—it must be baked into your architecture from the start.</p>
    `,
  },
  '2': {
    id: 2,
    title: 'Zero Downtime Deployments with Docker',
    excerpt:
      'A practical guide to rolling updates and blue/green strategies for containerized web apps.',
    date: 'Nov 22, 2024',
    readTime: '6 min',
    author: {
      name: 'Maxon Reid',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxon',
      bio: 'Full-Stack Developer specializing in scalable web applications',
    },
    tags: ['DevOps', 'Docker'],
    image: 'https://picsum.photos/id/1/1200/600',
    category: 'devops',
    content: `
      <p class="lead">Achieving zero-downtime deployments is essential for modern web applications. Learn how to implement rolling updates and blue/green deployments with Docker.</p>

      <h2>Understanding Deployment Strategies</h2>
      <p>There are several deployment strategies available, each with its own trade-offs. We'll focus on the two most common: rolling updates and blue/green deployments.</p>

      <h2>Rolling Updates</h2>
      <p>Rolling updates gradually replace old containers with new ones, ensuring your application remains available throughout the deployment process.</p>

      <pre><code>// docker-compose.yml example
services:
  web:
    image: myapp:latest
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
        order: start-first</code></pre>

      <h2>Blue/Green Deployments</h2>
      <p>This strategy maintains two identical production environments. Only one serves live traffic at any time, making rollbacks instant and risk-free.</p>

      <h2>Health Checks</h2>
      <p>Proper health checks are crucial for zero-downtime deployments. Your orchestrator needs to know when a container is ready to receive traffic.</p>

      <h2>Conclusion</h2>
      <p>With the right deployment strategy and proper health checks, you can achieve truly zero-downtime deployments for your containerized applications.</p>
    `,
  },
  '3': {
    id: 3,
    title: 'React Server Components Explained',
    excerpt:
      'An in-depth look at how RSC works under the hood, plus real-world patterns for Next.js.',
    date: 'Nov 5, 2024',
    readTime: '10 min',
    author: {
      name: 'Maxon Reid',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxon',
      bio: 'Full-Stack Developer specializing in scalable web applications',
    },
    tags: ['React', 'Next.js'],
    image: 'https://picsum.photos/id/326/1200/600',
    category: 'frontend',
    content: `
      <p class="lead">React Server Components represent a paradigm shift in how we build React applications. This guide explains the concepts and provides practical patterns for Next.js applications.</p>

      <h2>What Are Server Components?</h2>
      <p>Server Components run exclusively on the server, allowing you to access backend resources directly without exposing sensitive data or code to the client.</p>

      <h2>Benefits of Server Components</h2>
      <ul>
        <li>Reduced bundle size - server code stays on the server</li>
        <li>Direct database access - no API layer needed</li>
        <li>Improved performance - less JavaScript sent to the client</li>
        <li>Better SEO - fully rendered HTML</li>
      </ul>

      <h2>Client vs Server Components</h2>
      <p>Understanding when to use each type is key to building efficient applications.</p>

      <h2>Practical Patterns</h2>
      <p>We'll explore common patterns like data fetching, composition, and streaming.</p>

      <h2>Conclusion</h2>
      <p>Server Components are the future of React, enabling new patterns that weren't possible before while maintaining the developer experience we love.</p>
    `,
  },
};

interface ArticlePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? '/lo' : '/en';

  useEffect(() => {
    params.then(({ slug }) => {
      const foundArticle = articles[slug as keyof typeof articles];
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setIsLoading(false);
    });
  }, [params]);

  // Reading progress indicator
  useEffect(() => {
    const updateReadingProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = Math.min((scrollTop / trackLength) * 100, 100);
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="article-page loading">
          <div className="article-skeleton">
            <div className="container-article">
              <div className="skeleton-header"></div>
              <div className="skeleton-meta"></div>
              <div className="skeleton-image"></div>
              <div className="skeleton-content"></div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress" 
        style={{ width: `${readingProgress}%` }}
        role="progressbar"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <main className="article-page">
        {/* Article Header */}
        <header className="article-header">
          <div className="container-article">
            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href={`${locale}/articles`} className="breadcrumb-link">Articles</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{article.category}</span>
            </nav>

            {/* Category Badge */}
            <div className="article-category mono">{article.category.toUpperCase()}</div>

            {/* Title */}
            <h1 className="article-title">{article.title}</h1>

            {/* Excerpt */}
            <p className="article-excerpt">{article.excerpt}</p>

            {/* Meta Info */}
            <div className="article-meta">
              <div className="article-author">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="author-avatar"
                />
                <div className="author-info">
                  <div className="author-name">{article.author.name}</div>
                  <div className="author-bio mono">{article.author.bio}</div>
                </div>
              </div>

              <div className="article-stats mono">
                <span className="stat-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {article.readTime} read
                </span>
                <span className="stat-separator">·</span>
                <span className="stat-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {article.date}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="article-tags">
              {article.tags.map((tag: string) => (
                <span key={tag} className="article-tag mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="article-featured-image">
          <img
            src={article.image}
            alt={article.title}
            loading="eager"
          />
          <div className="image-overlay" aria-hidden="true" />
        </div>

        {/* Article Content */}
        <article className="article-content">
          <div className="container-article">
            <div className="article-body prose" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Share Section */}
            <div className="article-share">
              <div className="share-label mono muted">Share this article</div>
              <div className="share-buttons">
                <button className="share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="share-btn" aria-label="Share on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="share-btn" aria-label="Copy link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="article-navigation">
              <Link href={`${locale}/articles`} className="nav-all-articles cta ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Articles
              </Link>
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}