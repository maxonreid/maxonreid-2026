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
        className="project-card"
        style={style}
        tabIndex={0}
        role="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`View ${project.title} project details`}
      >
        <div className="project-media" aria-hidden="true">
          <picture>
            <source
              srcSet={`${project.image} 1600w, ${project.images[1]} 1200w`}
              sizes="(min-width:900px) 32vw, (min-width:560px) 48vw, 100vw"
            />
            <img
              loading="lazy"
              alt={`${project.title} screenshot`}
              src={project.images[1]}
            />
          </picture>

          <div className="project-overlay" aria-hidden="true">
            <div className="overlay-left">
              <div className="overlay-title">{project.title}</div>
              <div className="overlay-year mono">{project.year}</div>
              <div className="overlay-tags mono">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="tag-chip">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="tag-chip">+{project.tags.length - 2}</span>
                )}
              </div>
            </div>
            <div className="overlay-right">
              <div className="overlay-actions">
                <button className="btn-view" aria-label={`View ${project.title} details`}>
                  <span className="btn-text">View</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="project-glow" aria-hidden="true"></div>
        </div>

        <div className="project-body">
          <div className="project-meta">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-date mono">{project.year}</span>
          </div>
          <p className="project-desc">{project.desc}</p>
          <div className="project-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">
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
