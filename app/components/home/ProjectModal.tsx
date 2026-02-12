'use client';

import { useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    year: string;
    image: string;
    desc: string;
    tags: string[];
  } | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="modal-backdrop"
      data-open={isOpen}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        id="project-modal"
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          id="modal-close"
          aria-label="Close project (Esc)"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-grid">
          <div
            className="modal-media"
            id="modal-media"
            aria-hidden="true"
            style={{
              minHeight: '260px',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${project.image})`,
            }}
          ></div>

          <div className="modal-body">
            <h3 id="modal-title" className="modal-title mono">
              {project.title}
            </h3>
            <div className="modal-meta">
              <span id="modal-year" className="mono muted">
                {project.year}
              </span>
              <div id="modal-tags" className="modal-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p id="modal-desc" className="modal-desc">
              {project.desc}
            </p>
            <div className="modal-actions">
              <a
                id="modal-case"
                className="cta"
                href="#"
                target="_blank"
                rel="noopener"
              >
                Open case study
              </a>
              <a
                id="modal-contact"
                className="cta ghost"
                href="#contact"
                onClick={onClose}
              >
                Contact about this project
              </a>
              <button
                id="modal-close-2"
                className="cta ghost"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
