'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-[#0a0a0c] border-t border-white/[0.03] py-16 px-0" role="contentinfo" aria-label="Footer">
      <div className="w-[92%] max-w-[1200px] mx-auto grid gap-12 grid-cols-1 md:grid-cols-3">
        <div className="space-y-3">
          <div className="font-mono tracking-[8px] font-semibold text-sm text-[#e6e7ea]">MAXON TORRES</div>
          <div className="text-sm text-[#9ea0a8]">
            {t('tagline')}
          </div>
        </div>

        <div className="space-y-4">
          <nav className="flex gap-6" aria-label="Footer navigation">
            <a href="#services" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">{tNav('services')}</a>
            <a href="#contact" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">{tNav('contact')}</a>
          </nav>

          <div className="font-mono text-xs text-[#9ea0a8] flex gap-3">
            <span className="text-[#d6b46b]">
              {t('connect')}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@maxontorres.com" className="text-sm text-[#e6e7ea] hover:text-[#d6b46b] transition-colors">hello@MaxonTorres.com</a>
            <a href="https://github.com/maxonreid" className="text-sm text-[#9ea0a8] hover:text-[#d6b46b] transition-colors">
              GitHub
            </a>
          </div>
          <div className="text-xs text-[#9ea0a8]">{t('copyright', { year: new Date().getFullYear() })}</div>
        </div>
      </div>
    </footer>
  );
}
