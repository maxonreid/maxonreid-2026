import type { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

export default function ArticleCallout({ label, children }: Props) {
  return (
    <div className="my-8 bg-gold/5 border-l-2 border-gold rounded-r-xl p-6">
      <p className="font-mono text-sm text-text-secondary mb-1">{label}</p>
      <div className="text-text-primary text-lg leading-relaxed">{children}</div>
    </div>
  );
}
