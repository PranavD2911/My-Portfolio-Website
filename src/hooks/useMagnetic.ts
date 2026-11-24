import { useEffect } from 'react';

const SELECTOR = '.pill, [data-magnetic]';
const DEFAULT_STRENGTH = 0.3;
const MAX_PULL = 14;

/**
 * Pulls `.pill` and `[data-magnetic]` elements toward the cursor via `--mx` / `--my`.
 * Elements opt in by using `translate: var(--mx, 0) var(--my, 0)` in CSS;
 * `data-magnetic="0.15"` overrides the strength.
 */
export function useMagnetic() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let current: HTMLElement | null = null;
    // Measured once on entry so the element's own movement doesn't feed back into the pull.
    let rect: DOMRect | null = null;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const release = () => {
      current?.style.removeProperty('--mx');
      current?.style.removeProperty('--my');
      current = null;
      rect = null;
    };

    const clamp = (v: number) => Math.max(-MAX_PULL, Math.min(MAX_PULL, v));

    const apply = () => {
      frame = 0;
      if (!current || !rect) return;
      const strength = Number(current.dataset.magnetic) || DEFAULT_STRENGTH;
      current.style.setProperty('--mx', `${clamp((lastX - rect.left - rect.width / 2) * strength)}px`);
      current.style.setProperty('--my', `${clamp((lastY - rect.top - rect.height / 2) * strength)}px`);
    };

    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduce.matches || e.pointerType !== 'mouse') return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
      if (el !== current) {
        release();
        if (!el) return;
        current = el;
        rect = el.getBoundingClientRect();
      }
      lastX = e.clientX;
      lastY = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', release);
    window.addEventListener('scroll', release, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      release();
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', release);
      window.removeEventListener('scroll', release);
    };
  }, []);
}
