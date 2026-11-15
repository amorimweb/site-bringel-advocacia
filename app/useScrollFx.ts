'use client';
import { useEffect } from 'react';

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Movimento ligado ao scroll, sem biblioteca.
 * Elementos com data-p recebem --p (0 a 1) no CSS:
 *   data-p="through" (padrão): 0 quando entra por baixo, 1 quando sai por cima
 *   data-p="enter": 0 quando o topo está embaixo da tela, 1 já na parte alta
 *   data-p="leave": 0 no topo da página, 1 quando o elemento termina de sair
 * Também dá profundidade ao passar o mouse (cards) e atração leve (.mag).
 */
export function useScrollFx() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-p]'));
    let raf = 0;
    const run = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const e of els) {
        const r = e.getBoundingClientRect();
        const mode = e.dataset.p;
        const p =
          mode === 'enter' ? (vh * 0.92 - r.top) / (vh * 0.6)
          : mode === 'leave' ? -r.top / Math.max(r.height, 1)
          : (vh - r.top) / (vh + r.height);
        e.style.setProperty('--p', clamp(p).toFixed(4));
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(run); };

    run();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    window.addEventListener('load', queue);
    document.fonts?.ready.then(queue);

    // pointer: profundidade nos cards e atração leve nos botões
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    let lastCard: HTMLElement | null = null;
    let lastMag: HTMLElement | null = null;
    const resetCard = (c: HTMLElement | null) => { c?.style.removeProperty('--rx'); c?.style.removeProperty('--ry'); };
    const resetMag = (m: HTMLElement | null) => { if (m) m.style.translate = ''; };
    const onMove = (ev: PointerEvent) => {
      const t = ev.target as HTMLElement | null;
      const card = (t?.closest?.('.card') as HTMLElement | null) ?? null;
      if (card !== lastCard) { resetCard(lastCard); lastCard = card; }
      if (card) {
        const r = card.getBoundingClientRect();
        const x = ev.clientX - r.left, y = ev.clientY - r.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.setProperty('--rx', `${((y / r.height - 0.5) * -4).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${((x / r.width - 0.5) * 5).toFixed(2)}deg`);
      }
      const mag = (t?.closest?.('.mag') as HTMLElement | null) ?? null;
      if (mag !== lastMag) { resetMag(lastMag); lastMag = mag; }
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = ev.clientX - (r.left + r.width / 2);
        const dy = ev.clientY - (r.top + r.height / 2);
        mag.style.translate = `${(dx * 0.18).toFixed(1)}px ${(dy * 0.28).toFixed(1)}px`;
      }
    };
    if (fine) document.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('load', queue);
      document.removeEventListener('pointermove', onMove);
    };
  }, []);
}
