'use client';

import { NextIntlClientProvider, useTranslations } from 'next-intl';
import enMessages from '@/messages/en.json';
import TerminalDevice from './TerminalDevice';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="py-24 px-0 pb-30 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-9 grid-cols-1 lg:grid-cols-[1fr_420px] items-center">
        <div className="max-w-[720px] hero-content">
          <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-2">{t('brand')}</div>
          <div className="font-mono text-[13px] text-[#9ea0a8] tracking-[2px] mb-4">
            {t('location')}
          </div>

          <h1 id="hero-heading" className="text-[52px] leading-tight my-1.5 font-bold tracking-tight">
            {t('heroTitle')}{' '}
            <span className="text-[#d6b46b]">{t('heroTitleHighlight')}</span>.
          </h1>

          <p className="text-[#9ea0a8] max-w-[560px] mb-4.5">
            {t('heroSub')}
          </p>

          <div className="flex gap-3.5 mt-4.5">
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#d6b46b] no-underline font-mono tracking-wide transition-all hover:bg-gradient-to-b hover:from-[#d6b46b]/[0.06] hover:to-transparent hover:text-[#e6e7ea] hover:border-[#d6b46b]" href="#contact">
              {t('ctaStart')}
            </a>
            <a className="inline-block py-3 px-5 rounded-[10px] bg-transparent border border-white/[0.06] text-[#e6e7ea] no-underline font-mono tracking-wide transition-all opacity-90 hover:bg-gradient-to-b hover:from-[#d6b46b]/[0.06] hover:to-transparent hover:border-[#d6b46b]" href="#work">
              {t('ctaView')}
            </a>
          </div>
        </div>

        {/* Terminal still looks ugly when locale is lo. ill deal with this later */}
        <div className="flex justify-center items-center" aria-hidden="false">
          <NextIntlClientProvider locale="en">
            <TerminalDevice />
          </NextIntlClientProvider>
        </div>
      </div>
    </section>
  );
}
