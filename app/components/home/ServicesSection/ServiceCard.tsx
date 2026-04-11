'use client';

import { ReactNode } from 'react';
import { Link } from '@/routing';

interface Service {
  id: number;
  icon: ReactNode;
  title: string;
  valueStatement?: string;
  desc?: string;
  details?: string[];
  tools?: string;
  optional?: boolean;
  projectLink?: string;
}

interface ServiceCardProps {
  service: Service;
  deliverLabel?: string;
  toolsLabel?: string;
}

export default function ServiceCard({ service, deliverLabel = 'What I deliver', toolsLabel = 'Tools:' }: ServiceCardProps) {
  const cardContent = (
    <>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#d6b46b]/10 flex items-center justify-center text-[#d6b46b]" aria-hidden="true">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-[#e6e7ea] flex-1">{service.title}</h3>
      </div>

      {service.valueStatement && (
        <p className="text-lg font-semibold text-[#d6b46b] mb-3">{service.valueStatement}</p>
      )}
      {service.desc && (
        <p className="text-[#9ea0a8] leading-relaxed mb-4">{service.desc}</p>
      )}

      <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-4">
        {!!service.details?.length && (
          <>
            <h4 className="font-semibold text-[#e6e7ea]">{deliverLabel}</h4>
            <ul className="space-y-2">
              {service.details.map((detail, i) => (
                <li key={i} className="text-[#9ea0a8] flex items-start gap-2">
                  <span className="text-[#d6b46b] mt-1.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );

  if (service.projectLink && service.projectLink.startsWith('/')) {
    return (
      <Link
        href={service.projectLink}
        className={`block bg-white/[0.02] border rounded-xl p-6 transition-all ${
          'border-white/[0.06] hover:border-[#d6b46b]/50'
        } ${
          service.optional ? 'opacity-80 hover:opacity-100' : ''
        }`}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article
      className={`bg-white/[0.02] border rounded-xl p-6 transition-all ${
        'border-white/[0.06] hover:border-[#d6b46b]/50'
      } ${
        service.optional ? 'opacity-80 hover:opacity-100' : ''
      }`}
    >
      {cardContent}
    </article>
  );
}
