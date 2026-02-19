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

  // Handle hash navigation on page load with smooth scroll
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          setActiveSection(hash);
        }
      }, 100);
    }
  }, [pathname]);

  // Hash link click handler with smooth scroll
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
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `/${locale}#${hash}`);
      setActiveSection(hash);
    }
  };

  return (
    <nav className="flex gap-[18px] items-center" aria-label="Primary navigation">
      {/* <a
        href={`/${locale}#work`}
        className={`nav-link ${activeSection === 'work' ? 'nav-link-active' : ''}`}
        onClick={(e) => handleHashClick(e, 'work')}
      >
        {t('work')}
      </a> */}
      {/* <Link 
        href="/articles" 
        className={`nav-link ${pathname?.includes('/articles') ? 'nav-link-active' : ''}`}
        locale={locale}
      >
        {t('blog')}
      </Link> */}
      <Link 
        href="/about" 
        className={`nav-link ${pathname?.includes('/about') ? 'nav-link-active' : ''}`}
        locale={locale}
      >
        {t('about')}
      </Link>
      <a
        href={`/${locale}#services`}
        className={`nav-link ${activeSection === 'services' ? 'nav-link-active' : ''}`}
        onClick={(e) => handleHashClick(e, 'services')}
      >
        {t('services')}
      </a>
      <a
        href={`/${locale}#contact`}
        className={`nav-link ${activeSection === 'contact' ? 'nav-link-active' : ''}`}
        onClick={(e) => handleHashClick(e, 'contact')}
      >
        {t('contact')}
      </a>
    </nav>
  );
}
