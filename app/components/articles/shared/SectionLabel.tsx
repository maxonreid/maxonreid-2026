import type { ReactNode } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-sm text-text-secondary tracking-[8px] font-semibold mb-4">
      {children}
    </div>
  );
}
