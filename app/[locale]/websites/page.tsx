import ServicesLanding from '@/app/components/websites/ServicesLanding';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <ServicesLanding locale={locale} />;
}
