'use client';

import { useTranslations } from 'next-intl';
import ServiceCard from './ServiceCard';
import { Monitor, Settings, Smartphone, Palette, Wrench } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('services');
  const deliverLabel = t('deliverLabel');
  const toolsLabel = t('toolsLabel');
  const subtitleSecondary = t('subtitleSecondary');

  const services = [
    {
      id: 1,
      icon: <Monitor size={24} />,
      title: t('items.customWebApps.title'),
      valueStatement: t('items.customWebApps.valueStatement'),
      desc: t('items.customWebApps.desc'),
      details: [
        t('items.customWebApps.details.0'),
        t('items.customWebApps.details.1'),
        t('items.customWebApps.details.2'),
        t('items.customWebApps.details.3'),
        t('items.customWebApps.details.4'),
      ],
      tools: t('items.customWebApps.tools'),
      projectLink: '#projects',
    },
    {
      id: 2,
      icon: <Settings size={24} />,
      title: t('items.businessSystems.title'),
      valueStatement: t('items.businessSystems.valueStatement'),
      desc: t('items.businessSystems.desc'),
      details: [
        t('items.businessSystems.details.0'),
        t('items.businessSystems.details.1'),
        t('items.businessSystems.details.2'),
        t('items.businessSystems.details.3'),
        t('items.businessSystems.details.4'),
      ],
      tools: t('items.businessSystems.tools'),
      projectLink: '#projects',
    },
    {
      id: 3,
      icon: <Smartphone size={24} />,
      title: t('items.pwaApps.title'),
      valueStatement: t('items.pwaApps.valueStatement'),
      desc: t('items.pwaApps.desc'),
      details: [
        t('items.pwaApps.details.0'),
        t('items.pwaApps.details.1'),
        t('items.pwaApps.details.2'),
        t('items.pwaApps.details.3'),
        t('items.pwaApps.details.4'),
      ],
      tools: t('items.pwaApps.tools'),
    },
    {
      id: 4,
      icon: <Palette size={24} />,
      title: t('items.frontendArchitecture.title'),
      valueStatement: t('items.frontendArchitecture.valueStatement'),
      desc: t('items.frontendArchitecture.desc'),
      details: [],
      tools: t('items.frontendArchitecture.tools'),
    },
    {
      id: 5,
      icon: <Wrench size={24} />,
      title: t('items.ongoingSupport.title'),
      valueStatement: t('items.ongoingSupport.valueStatement'),
      desc: t('items.ongoingSupport.desc'),
      details: [],
      tools: t('items.ongoingSupport.tools'),
      optional: true,
    },
  ];

  const primaryServices = services.slice(0, 3);
  const supportingServices = services.slice(3);

  return (
    <section
      id="services"
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="services-heading"
    >
      <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
        {t('title')}
      </h2>
      <p className="text-xl text-[#9ea0a8] text-center max-w-2xl mx-auto mb-12">
        {t('subtitle')}
      </p>
      {subtitleSecondary && (
        <p className="text-xl text-[#9ea0a8] text-center max-w-2xl mx-auto mb-12 -mt-8">
          {subtitleSecondary}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {primaryServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            deliverLabel={deliverLabel}
            toolsLabel={toolsLabel}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {supportingServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            deliverLabel={deliverLabel}
            toolsLabel={toolsLabel}
          />
        ))}
      </div>
    </section>
  );
}
