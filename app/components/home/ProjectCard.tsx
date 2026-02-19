'use client';

import { useState } from 'react';
import ProjectModal from './ProjectModal';

interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
  images: string[];
  desc: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
}

export default function ProjectCard({ project, style }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <article
        className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden cursor-pointer transition-all hover:border-[#d6b46b]/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(214,180,107,0.1)] group"
        style={style}
        tabIndex={0}
        role="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`View ${project.title} project details`}
      >
        <div className="relative aspect-video overflow-hidden" aria-hidden="true">
          <picture>
            <source
              srcSet={`${project.image} 1600w, ${project.images[1]} 1200w`}
              sizes="(min-width:900px) 32vw, (min-width:560px) 48vw, 100vw"
            />
            <img
              loading="lazy"
              alt={`${project.title} screenshot`}
              src={project.images[1]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6" aria-hidden="true">
            <div>
              <div className="text-2xl font-bold text-[#e6e7ea] mb-1">{project.title}</div>
              <div className="font-mono text-sm text-[#9ea0a8]">{project.year}</div>
              <div className="flex gap-2 mt-3 font-mono text-xs">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="bg-[#d6b46b]/20 text-[#d6b46b] px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="bg-[#d6b46b]/20 text-[#d6b46b] px-2 py-1 rounded">+{project.tags.length - 2}</span>
                )}
              </div>
            </div>
            <div>
              <button className="bg-[#d6b46b] text-[#0a0a0c] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#b99046] transition-colors" aria-label={`View ${project.title} details`}>
                <span>View</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="absolute inset-0 bg-[#d6b46b]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" aria-hidden="true"></div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-[#e6e7ea]">{project.title}</h3>
            <span className="font-mono text-sm text-[#9ea0a8]">{project.year}</span>
          </div>
          <p className="text-[#9ea0a8] mb-4 leading-relaxed">{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="font-mono text-xs bg-white/[0.03] border border-white/[0.06] text-[#9ea0a8] px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={project}
      />
    </>
  );
}
