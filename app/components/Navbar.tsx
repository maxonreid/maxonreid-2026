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
    <nav className="flex gap-[18px] items-center" aria-label="Primary navigation">
      <a
        href={`/${locale}#work`}
        className={`text-[#9ea0a8] no-underline text-sm py-2 px-3 rounded-lg transition-all font-semibold tracking-wide relative overflow-hidden hover:text-[#d6b46b] hover:bg-white/[0.03] hover:-translate-y-0.5 focus:outline-none ${activeSection === 'work' ? 'text-[#d6b46b] bg-white/[0.03] shadow-[inset_0_-2px_0_#d6b46b]' : ''}`}
        onClick={(e) => handleHashClick(e, 'work')}
      >
        {t('work')}
      </a>
      <Link 
        href="/articles" 
        className={`text-[#9ea0a8] no-underline text-sm py-2 px-3 rounded-lg transition-all font-semibold tracking-wide relative overflow-hidden hover:text-[#d6b46b] hover:bg-white/[0.03] hover:-translate-y-0.5 focus:outline-none ${pathname?.includes('/articles') ? 'text-[#d6b46b] bg-white/[0.03] shadow-[inset_0_-2px_0_#d6b46b]' : ''}`}
        locale={locale}
      >
        {t('blog')}
      </Link>
      <Link 
        href="/about" 
        className={`text-[#9ea0a8] no-underline text-sm py-2 px-3 rounded-lg transition-all font-semibold tracking-wide relative overflow-hidden hover:text-[#d6b46b] hover:bg-white/[0.03] hover:-translate-y-0.5 focus:outline-none ${pathname?.includes('/about') ? 'text-[#d6b46b] bg-white/[0.03] shadow-[inset_0_-2px_0_#d6b46b]' : ''}`}
        locale={locale}
      >
        {t('about')}
      </Link>
      <a
        href={`/${locale}#services`}
        className={`text-[#9ea0a8] no-underline text-sm py-2 px-3 rounded-lg transition-all font-semibold tracking-wide relative overflow-hidden hover:text-[#d6b46b] hover:bg-white/[0.03] hover:-translate-y-0.5 focus:outline-none ${activeSection === 'services' ? 'text-[#d6b46b] bg-white/[0.03] shadow-[inset_0_-2px_0_#d6b46b]' : ''}`}
        onClick={(e) => handleHashClick(e, 'services')}
      >
        {t('services')}
      </a>
      <a
        href={`/${locale}#contact`}
        className={`text-[#9ea0a8] no-underline text-sm py-2 px-3 rounded-lg transition-all font-semibold tracking-wide relative overflow-hidden hover:text-[#d6b46b] hover:bg-white/[0.03] hover:-translate-y-0.5 focus:outline-none ${activeSection === 'contact' ? 'text-[#d6b46b] bg-white/[0.03] shadow-[inset_0_-2px_0_#d6b46b]' : ''}`}
        onClick={(e) => handleHashClick(e, 'contact')}
      >
        {t('contact')}
      </a>
    </nav>
  );
}
