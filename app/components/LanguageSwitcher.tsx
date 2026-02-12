'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { US } from 'country-flag-icons/react/3x2';
import { LA } from 'country-flag-icons/react/3x2';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  
  // Detect current locale from pathname
  const currentLocale = pathname?.startsWith('/lo') ? 'lo' : 'en';
  
  const languages = [
    { code: 'en', label: 'English', flag: US },
    { code: 'lo', label: 'ລາວ', flag: LA }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  const CurrentFlag = currentLanguage.flag;

  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return;
    
    const currentPath = pathname || '';
    let newPath: string;
    
    console.log('Current path:', currentPath);
    console.log('Current locale:', currentLocale);
    console.log('Switching to locale:', locale);
    
    // Remove current locale prefix if it exists
    let pathWithoutLocale = currentPath;
    if (currentPath.startsWith('/lo/') || currentPath === '/lo') {
      pathWithoutLocale = currentPath.replace(/^\/lo/, '');
    } else if (currentPath.startsWith('/en/') || currentPath === '/en') {
      pathWithoutLocale = currentPath.replace(/^\/en/, '');
    }
    
    // Ensure pathWithoutLocale starts with / if it's not empty
    if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }
    
    // If path is empty, make it root
    if (!pathWithoutLocale) {
      pathWithoutLocale = '/';
    }
    
    console.log('Path without locale:', pathWithoutLocale);
    
    // Add new locale prefix (both locales need prefix now)
    newPath = `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    
    console.log('New path:', newPath);
    
    setIsOpen(false);
    
    // Use startTransition for better UX
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="language-switcher">
      <button
        className="btn-ghost lang-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Switch language"
        title="Switch language"
        disabled={isPending}
      >
        <CurrentFlag className="lang-flag" />
        <span className="lang-code">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`lang-chevron ${isOpen ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((lang) => {
            const FlagComponent = lang.flag;
            return (
              <button
                key={lang.code}
                className={`lang-option ${lang.code === currentLocale ? 'active' : ''}`}
                onClick={() => switchLanguage(lang.code)}
                disabled={lang.code === currentLocale || isPending}
              >
                <FlagComponent className="lang-flag" />
                <span className="lang-label">{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
      
      {isOpen && (
        <div
          className="lang-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
