'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  
  // Extract locale from pathname
  const locale = pathname?.startsWith('/lo') ? '/lo' : '/en';

  useEffect(() => {
    // Load theme from localStorage on mount
    const stored = localStorage.getItem('mr_theme_pref');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
      
      // Debug: Check if header is actually sticky
      const header = document.querySelector('.site-header');
      if (header) {
        const headerRect = header.getBoundingClientRect();
        const isAtTop = headerRect.top <= 0;
        
        // Add data attribute for debugging
        header.setAttribute('data-sticky-active', isAtTop.toString());
        header.setAttribute('data-scroll-y', scrollTop.toString());
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('mr_theme_pref', newTheme);
    
    // Update meta theme color
    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', newTheme === 'light' ? '#ffffff' : '#0a0a0c');
    }
  };

  // Add keyboard shortcut for theme toggle (T key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const typing =
        active &&
        (active.tagName === 'INPUT' ||
          active.tagName === 'TEXTAREA' ||
          (active as HTMLElement).isContentEditable);
      
      if (typing) return;
      
      if (e.key && e.key.toLowerCase() === 't') {
        toggleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container header-inner">
        <div className="brand" aria-hidden="true">
          MS
        </div>

        <nav className="main-nav" aria-label="Primary navigation">
          <a className="nav-link" href="#work">
            {t('work')}
          </a>
          <Link href={`${locale}/articles`} className="nav-link">
            {t('blog')}
          </Link>
          <a className="nav-link" href="#about">
            {t('about')}
          </a>
          <a className="nav-link" href="#services">
            {t('services')}
          </a>
          <a className="nav-link" href="#contact">
            {t('contact')}
          </a>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <button
            className="btn-ghost"
            id="theme-toggle"
            aria-pressed={theme === 'light'}
            aria-label="Toggle light and dark theme"
            title="Toggle theme (press T)"
            onClick={toggleTheme}
          >
            <svg
              className="icon-sun"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.5-1.5M20.5 20.5L19 19M19 5l1.5-1.5M4 20l1.5-1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
