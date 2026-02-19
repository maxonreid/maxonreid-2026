'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/routing';

import LanguageSwitcher from './LanguageSwitcher';
import Navbar from './Navbar';

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isScrolled, setIsScrolled] = useState(false);

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
      setIsScrolled(window.scrollY > 10);
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
    <header
      className={`sticky top-0 z-[9999] min-h-[72px] backdrop-blur-md border-b transition-all ${isScrolled ? 'shadow-[0_6px_20px_rgba(0,0,0,0.12)]' : ''}`}
      style={{
        backgroundColor: 'rgba(var(--bg-primary-rgb, 10, 10, 12), 0.6)',
        borderColor: 'var(--border-color)'
      }}
      role="banner"
    >
      <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between py-3.5">


        {/* That big logo that always takes you home */}
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/logo-maxontorres.png"
            alt="Maxon Torres"
            width={40}
            height={40}
            priority
          />
        </Link>

        <Navbar />

        <div className="flex gap-3 items-center">
          
          
          <LanguageSwitcher />

          {/* Theme Switcher */}
          <button
            className="bg-transparent border-none p-2 rounded-lg cursor-pointer inline-flex items-center gap-2 transition-colors hover:bg-[var(--hover-bg)] focus:outline-2 focus:outline-[#d6b46b]/20 focus:outline-offset-2"
            style={{ color: 'var(--text-secondary)' }}
            id="theme-toggle"
            aria-pressed={theme === 'light'}
            aria-label="Toggle light and dark theme"
            title="Toggle theme (press T)"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <svg
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
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
