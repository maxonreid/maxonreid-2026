'use client';

import { useState } from 'react';
import { ReactNode } from 'react';

interface Service {
  id: number;
  icon: ReactNode;
  title: string;
  valueStatement: string;
  desc: string;
  details: string[];
  tools: string;
  projectLink?: string;
  optional?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <article
      className={`service-card ${expanded ? 'expanded' : ''} ${
        service.optional ? 'optional' : ''
      }`}
      data-expanded={expanded}
    >
      <div className="service-header">
        <div className="service-icon" aria-hidden="true">
          {service.icon}
        </div>
        <h3 className="service-title">{service.title}</h3>
      </div>

      <p className="service-value-statement">{service.valueStatement}</p>
      <p className="service-desc">{service.desc}</p>

      <button
        className="service-toggle mono"
        onClick={toggleExpand}
        aria-expanded={expanded}
      >
        {expanded ? '− Less' : '+ More'}
      </button>

      {expanded && (
        <div className="service-details">
          <h4 className="service-details-title">What I deliver</h4>
          <ul className="service-list">
            {service.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
          
          <div className="service-tools">
            <strong>Tools:</strong> {service.tools}
          </div>
          
          {service.projectLink && (
            <a className="service-project-link" href={service.projectLink}>
              View related project →
            </a>
          )}
          
          <a className="cta ghost" href="#contact">
            Get in Touch
          </a>
        </div>
      )}
    </article>
  );
}
