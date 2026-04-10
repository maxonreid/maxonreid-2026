import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import NotFoundContent from '@/app/components/not-found/NotFoundContent';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('notFound');
  return {
    title: t('subtitle'),
    robots: { index: false, follow: false },
  };
}

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main>
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
