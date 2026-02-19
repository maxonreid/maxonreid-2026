'use client';

import { usePathname } from 'next/navigation';
import ServiceCard from './ServiceCard';
import { Monitor, Settings, Smartphone, Palette, Wrench } from 'lucide-react';

// Import translations
import enMessages from '../../../messages/en.json';
import loMessages from '../../../messages/lo.json';

const messages = {
  en: enMessages,
  lo: loMessages
};

export default function ServicesSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/lo') ? 'lo' : 'en';
  const t = messages[locale].services;

  const services = [
    {
      id: 1,
      icon: <Monitor size={24} />,
      title: t.items.customWebApps.title,
      valueStatement: t.items.customWebApps.valueStatement,
      desc: t.items.customWebApps.desc,
      details: t.items.customWebApps.details,
      tools: t.items.customWebApps.tools,
      projectLink: '#projects',
    },
    {
      id: 2,
      icon: <Settings size={24} />,
      title: t.items.businessSystems.title,
      valueStatement: t.items.businessSystems.valueStatement,
      desc: t.items.businessSystems.desc,
      details: t.items.businessSystems.details,
      tools: t.items.businessSystems.tools,
      projectLink: '#projects',
    },
    {
      id: 3,
      icon: <Smartphone size={24} />,
      title: t.items.pwaApps.title,
      valueStatement: t.items.pwaApps.valueStatement,
      desc: t.items.pwaApps.desc,
      details: t.items.pwaApps.details,
      tools: t.items.pwaApps.tools,
    },
    {
      id: 4,
      icon: <Palette size={24} />,
      title: t.items.frontendArchitecture.title,
      valueStatement: t.items.frontendArchitecture.valueStatement,
      desc: t.items.frontendArchitecture.desc,
      details: t.items.frontendArchitecture.details,
      tools: t.items.frontendArchitecture.tools,
    },
    {
      id: 5,
      icon: <Wrench size={24} />,
      title: t.items.ongoingSupport.title,
      valueStatement: t.items.ongoingSupport.valueStatement,
      desc: t.items.ongoingSupport.desc,
      details: t.items.ongoingSupport.details,
      tools: t.items.ongoingSupport.tools,
      optional: true,
    },
  ];

  return (
    <section
      id="services"
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="services-heading"
    >
      <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
        {t.title}
      </h2>
      <p className="text-xl text-[#9ea0a8] text-center max-w-2xl mx-auto mb-12">
        {t.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
