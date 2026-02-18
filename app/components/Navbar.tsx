'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/routing';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const t = useTranslations('nav');
  
  // Extract locale from pathname
  const locale = pathname?.startsWith('/lo') ? 'lo' : 'en';

  // Check if we're on the home page - normalize trailing slashes
  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const isHomePage = normalizedPath === `/${locale}` || normalizedPath === '' || normalizedPath === '/';

  // Handle scroll events for active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // Track active section for hash links
      const sections = ['work', 'services', 'contact'];
      const current = sections.find(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      } else if (scrollTop < 100) {
        setActiveSection('');
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo(0, offsetPosition);
          setActiveSection(hash);
        }
      }, 100);
    }
  }, [pathname]);

  // Hash link click handler
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    
    if (!isHomePage) {
      window.location.href = `/${locale}#${hash}`;
      return;
    }
    
    const element = document.getElementById(hash);
    if (element) {
      const headerHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;
      window.scrollTo(0, offsetPosition);
      window.history.pushState(null, '', `/${locale}#${hash}`);
      setActiveSection(hash);
    }
  };

  return (
    <nav className="main-nav" aria-label="Primary navigation">
      <a
        href={`/${locale}#work`}
        className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
        onClick={(e) => handleHashClick(e, 'work')}
      >
        {t('work')}
      </a>
      <Link 
        href="/articles" 
        className={`nav-link ${pathname?.includes('/articles') ? 'active' : ''}`}
        locale={locale}
      >
        {t('blog')}
      </Link>
      <Link 
        href="/about" 
        className={`nav-link ${pathname?.includes('/about') ? 'active' : ''}`}
        locale={locale}
      >
        {t('about')}
      </Link>
      <a
        href={`/${locale}#services`}
        className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
        onClick={(e) => handleHashClick(e, 'services')}
      >
        {t('services')}
      </a>
      <a
        href={`/${locale}#contact`}
        className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
        onClick={(e) => handleHashClick(e, 'contact')}
      >
        {t('contact')}
      </a>
    </nav>
  );
}
