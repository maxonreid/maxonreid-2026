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
    <div className="relative inline-block">
      <button
        className="bg-transparent border-none text-[#9ea0a8] p-2 rounded-lg cursor-pointer inline-flex items-center gap-2 hover:bg-white/[0.03]"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Switch language"
        title="Switch language"
        disabled={isPending}
      >
        <CurrentFlag className="w-5 h-3.5 rounded object-cover" />
        <span className="text-xs tracking-wider">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
        <div className="absolute top-[calc(100%+8px)] right-0 min-w-[140px] bg-[#0f1113] border border-white/10 rounded-lg p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] z-[100] animate-[slideDown_0.2s_ease]">
          {languages.map((lang) => {
            const FlagComponent = lang.flag;
            return (
              <button
                key={lang.code}
                className={`flex items-center gap-2.5 w-full p-2.5 pl-3 bg-transparent border-none rounded-lg text-sm cursor-pointer transition-all ${
                  lang.code === currentLocale 
                    ? 'bg-[#d6b46b]/10 text-[#d6b46b] font-semibold' 
                    : 'text-[#e6e7ea] hover:bg-white/[0.03]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => switchLanguage(lang.code)}
                disabled={lang.code === currentLocale || isPending}
              >
                <FlagComponent className="w-5 h-3.5 rounded object-cover" />
                <span className="flex-1 text-left font-medium">{lang.label}</span>
              </button>
            );
          })}
        </div>
      )}
      
      {isOpen && (
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
