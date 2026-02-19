'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Marketplace PWA',
    year: '2025',
    image: 'https://picsum.photos/id/1015/1600/900',
    images: [
      'https://picsum.photos/id/1015/1600/900',
      'https://picsum.photos/id/1015/1200/675',
    ],
    desc: 'Realtime analytics and secure settlement flows for cross-border merchants — focused on security and reconciliation.',
    tags: ['Next.js', 'Node.js', 'Postgres'],
    category: 'fintech',
  },
  {
    id: 2,
    title: 'Platform to Track Construction Materials',
    year: '2024',
    image: 'https://picsum.photos/id/180/1600/900',
    images: [
      'https://picsum.photos/id/180/1600/900',
      'https://picsum.photos/id/180/1200/675',
    ],
    desc: 'Custom dashboard for real-time product metrics, user cohorts, and revenue tracking. Built with modern stack for speed.',
    tags: ['React', 'TypeScript', 'PostgreSQL'],
    category: 'saas',
  },
  {
    id: 3,
    title: 'Booking Appointments Website with Dashboard ',
    year: '2024',
    image: 'https://picsum.photos/id/10/1600/900',
    images: [
      'https://picsum.photos/id/10/1600/900',
      'https://picsum.photos/id/10/1200/675',
    ],
    desc: 'Non-custodial wallet UI prioritizing privacy and performance — carefully designed transaction flows.',
    tags: ['Web3', 'Next.js', 'Ethers.js'],
    category: 'web3',
  },
];

export default function WorkSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const t = useTranslations('work');

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'fintech', label: t('categories.fintech') },
    { id: 'saas', label: t('categories.saas') },
    { id: 'web3', label: t('categories.web3') },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid" role="tabpanel">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
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
