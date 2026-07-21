import type { ReactElement } from 'react';

const paths: Record<string, ReactElement> = {
  briefcase: <><rect x="3" y="7" width="18" height="12" rx="1.2" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" /><line x1="3" y1="12.5" x2="21" y2="12.5" /></>,
  document: <><rect x="5.5" y="3" width="13" height="18" rx="1" /><line x1="8.5" y1="8" x2="15.5" y2="8" /><line x1="8.5" y1="12" x2="15.5" y2="12" /><line x1="8.5" y1="16" x2="13" y2="16" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><polygon points="15,9 13,13 9,15 11,11" /></>,
  building: <><rect x="5" y="3" width="14" height="18" /><line x1="8" y1="7" x2="8" y2="7.01" /><line x1="12" y1="7" x2="12" y2="7.01" /><line x1="16" y1="7" x2="16" y2="7.01" /><line x1="8" y1="11" x2="8" y2="11.01" /><line x1="12" y1="11" x2="12" y2="11.01" /><line x1="16" y1="11" x2="16" y2="11.01" /><line x1="8" y1="15" x2="8" y2="15.01" /><line x1="12" y1="15" x2="12" y2="15.01" /><line x1="16" y1="15" x2="16" y2="15.01" /></>,
  shield: <><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /><polyline points="9,12 11,14 15,10" /></>,
  trend: <><polyline points="4,17 9,11 13,14 20,6" /><polyline points="14,6 20,6 20,12" /></>,
  heart: <><path d="M12 20.5s-6.7-4.1-9-7.9C1.2 9.3 2.6 6 6 5.5c2-.3 3.6.8 4.2 2.3C10.8 6.3 12.4 5.2 14.4 5.5c3.4.5 4.8 3.8 3 6.1-2.3 3.8-5.4 7.9-5.4 7.9z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" /></>,
  refresh: <><path d="M4 12a8 8 0 0 1 14-5.3" /><polyline points="18,4 18,7 15,7" /><path d="M20 12a8 8 0 0 1-14 5.3" /><polyline points="6,20 6,17 9,17" /></>,
  check: <><circle cx="12" cy="12" r="9" /><polyline points="8,12.3 10.7,15 16,9.5" /></>,
};

export function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name] ?? paths.document}
    </svg>
  );
}
