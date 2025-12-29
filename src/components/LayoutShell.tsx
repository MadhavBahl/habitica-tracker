import type { ReactNode } from 'react';

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className='app-root'>
      <div className='glass-card'>{children}</div>
    </div>
  );
}
