import { useTranslations } from 'next-intl';
import { Link } from '../../../routing';

export default function CTASection() {
  const t = useTranslations('about.cta');
  
  return (
    <section className="py-24 px-0">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="bg-gradient-to-br from-[#d6b46b]/10 to-transparent border border-[#d6b46b]/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-[#9ea0a8] mb-8 max-w-2xl mx-auto">{t('subtitle')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="inline-block py-3 px-6 rounded-lg bg-[#d6b46b] text-[#0a0a0c] font-semibold hover:bg-[#b99046] transition-colors">
              {t('contact')}
            </Link>
            <Link href="/services" className="inline-block py-3 px-6 rounded-lg bg-transparent border border-white/[0.06] text-[#e6e7ea] font-semibold hover:border-[#d6b46b] hover:text-[#d6b46b] transition-all">
              {t('services')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
