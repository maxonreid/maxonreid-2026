'use client';

import { usePathname } from 'next/navigation';
import { Link } from '../../../routing';
import enMessages from '../../../messages/en.json';
import loMessages from '../../../messages/lo.json';

const messages = {
  en: enMessages,
  lo: loMessages
};

export default function AboutSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? 'lo' : 'en';
  const t = messages[locale].aboutHome;

  return (
    <section className="py-24 px-0" id="about">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-8">{t.label}</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">{t.title}</h2>
            <p className="text-xl text-[#e6e7ea] leading-relaxed">{t.intro}</p>
            <p className="text-lg text-[#9ea0a8] leading-relaxed">{t.description}</p>
            
            <div className="grid grid-cols-3 gap-6 py-8">
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d6b46b] mb-2">{t.stats.experience}</div>
                <div className="text-sm text-[#9ea0a8]">{t.stats.experienceLabel}</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d6b46b] mb-2">{t.stats.projects}</div>
                <div className="text-sm text-[#9ea0a8]">{t.stats.projectsLabel}</div>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#d6b46b] mb-2">{t.stats.technologies}</div>
                <div className="text-sm text-[#9ea0a8]">{t.stats.technologiesLabel}</div>
              </div>
            </div>
            
            <Link href="/about" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#d6b46b] font-mono hover:bg-[#d6b46b]/10 hover:border-[#d6b46b] transition-all">
              {t.learnMore}
            </Link>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src="/profile.jpg" 
                alt="Maximiliano Torres - Full Stack Developer"
                className="w-full max-w-md rounded-2xl shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
