'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import Terminal404 from './Terminal404';

export default function NotFoundContent() {
  const t = useTranslations('notFound');

  return (
    <section
      className="min-h-[80vh] flex items-center py-24 px-0 relative overflow-hidden"
      aria-labelledby="not-found-heading"
    >
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-12 grid-cols-1 lg:grid-cols-2 items-center">

        {/* Left: text content */}
        <div
          className="space-y-6 animate-[fadeInUp_0.6s_ease-out_forwards]"
          style={{ opacity: 0 }}
        >
          <div
            className="text-[#9ea0a8] text-sm tracking-[6px] font-semibold"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {t('label')}
          </div>

          <h1
            id="not-found-heading"
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            {t.rich('title', {
              highlight: (chunks) => (
                <span className="text-[#d6b46b]">{chunks}</span>
              ),
            })}
          </h1>

          <p className="text-[#9ea0a8] max-w-[520px] leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-wrap gap-3.5 pt-2">
            <Link
              href="/"
              className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#d6b46b] no-underline font-mono tracking-wide transition-all hover:bg-gradient-to-b hover:from-[#d6b46b]/[0.06] hover:to-transparent hover:text-[#e6e7ea] hover:border-[#d6b46b]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {t('ctaHome')}
            </Link>

            <Link
              href="/#work"
              className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#e6e7ea] no-underline font-mono tracking-wide transition-all opacity-90 hover:bg-gradient-to-b hover:from-[#d6b46b]/[0.06] hover:to-transparent hover:border-[#d6b46b]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
            >
              {t('ctaWork')}
            </Link>
          </div>
        </div>

        {/* Right: terminal illustration */}
        <div
          className="flex justify-center lg:justify-end animate-[fadeInUp_0.6s_ease-out_0.15s_forwards]"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <Terminal404 />
        </div>

      </div>
    </section>
  );
}
