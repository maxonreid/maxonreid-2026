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

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <div
        id="project-modal"
        className="relative bg-[#1a1d23] border border-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 transition-all text-2xl leading-none"
          id="modal-close"
          aria-label="Close project (Esc)"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div
            className="relative w-full aspect-video bg-cover bg-center"
            id="modal-media"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] via-transparent to-transparent"></div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <h3 id="modal-title" className="text-3xl font-bold text-[#e6e7ea]">
                {project.title}
              </h3>
              <span className="font-mono text-sm text-[#9ea0a8] ml-4">
                {project.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="font-mono text-xs bg-[#d6b46b]/10 border border-[#d6b46b]/30 text-[#d6b46b] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[#9ea0a8] leading-relaxed mb-8">
              {project.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                className="px-6 py-3 bg-[#d6b46b] text-[#0a0a0c] rounded-lg font-semibold hover:bg-[#b99046] transition-colors text-center"
                href="#"
                target="_blank"
                rel="noopener"
              >
                Open case study
              </a>
              <a
                className="px-6 py-3 bg-transparent border border-[#d6b46b] text-[#d6b46b] rounded-lg font-semibold hover:bg-[#d6b46b]/10 transition-colors text-center"
                href="#contact"
                onClick={onClose}
              >
                Contact about this project
              </a>
              <button
                className="px-6 py-3 bg-transparent border border-white/[0.12] text-[#9ea0a8] rounded-lg font-semibold hover:bg-white/[0.05] hover:text-[#e6e7ea] transition-colors"
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
