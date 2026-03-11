'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'OrderBridge',
    year: '2026',
    image: '/images/projects/orderbridge/orderbridge-cover.png',
    images: [
      '/images/projects/orderbridge/orderbridge-cover.png',
      '/images/projects/orderbridge/orderbridge-dashboard.png',
      '/images/projects/orderbridge/orderbridge-mock-pos.png',
      '/images/projects/orderbridge/orderbridge-simulator.png',
    ],
    desc: 'A middleware system that connects food delivery platforms like DoorDash and Uber Eats directly to restaurant POS systems — eliminating manual order entry and reducing errors in high-volume kitchens.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'OAuth 2.0'],
    category: 'automation',
    caseStudyUrl: '/projects/orderbridge',
    liveUrl: 'https://orderbridge.maxontorres.com',
  },
];

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('work');

  const categories = [
    { id: 'all',         label: t('categories.all') },
    { id: 'automation',  label: t('categories.automation') },
    { id: 'integration', label: t('categories.integration') },
    { id: 'tools',       label: t('categories.tools') },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="work"
      className="py-24 px-0 w-[92%] max-w-[1200px] mx-auto"
      aria-labelledby="work-heading"
    >
      <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold">
          [ MY WORK ]
        </div>

        <div className="flex gap-2 flex-wrap" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeFilter === cat.id}
              aria-controls="projects-grid"
              className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all ${
                activeFilter === cat.id
                  ? 'bg-[#d6b46b]/10 border-[#d6b46b] text-[#d6b46b]'
                  : 'bg-transparent border-white/[0.06] text-[#9ea0a8] hover:border-[#d6b46b]/50 hover:text-[#e6e7ea]'
              }`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        id="projects-grid"
        role="tabpanel"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#9ea0a8]">{t('noProjects')}</p>
        </div>
      )}
    </section>
  );
}
