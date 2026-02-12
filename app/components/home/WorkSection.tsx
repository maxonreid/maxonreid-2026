'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: 'Global Payments Dashboard',
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
    title: 'SaaS Analytics Platform',
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
    title: 'Crypto Wallet Interface',
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

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'saas', label: 'SaaS' },
  { id: 'web3', label: 'Web3' },
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
      className="section work container"
      aria-labelledby="work-heading"
    >
      <div className="work-header">
        <div className="work-header-content">
          <h2 id="work-heading" className="section-title">
            {t('title')}
          </h2>
          <p className="section-sub">
            {t('subtitle')}
          </p>
        </div>

        <div className="work-filters" role="tablist" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeFilter === cat.id}
              aria-controls="projects-grid"
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid projects" id="projects-grid" role="tabpanel">
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
        <div className="no-projects">
          <p>{t('noProjects')}</p>
        </div>
      )}
    </section>
  );
}
