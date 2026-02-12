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
      className="section services container"
      aria-labelledby="services-heading"
    >
      <h2 id="services-heading" className="section-title">
        {t.title}
      </h2>
      <p className="section-sub">
        {t.subtitle}
      </p>

      <div className="grid services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
