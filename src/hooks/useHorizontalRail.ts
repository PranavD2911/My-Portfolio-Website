import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

const DRAG_THRESHOLD = 6;
const WHEEL_SETTLE_MS = 140;
const WHEEL_INTENT_PX = 40;
/** Fraction of the remaining distance covered per 60fps frame. */
const SMOOTHING = 0.1;
/** How far (ms of release velocity) a drag throw carries before snapping. */
const MOMENTUM_MS = 260;
/** Release speed (px/ms) that always advances at least one card. */
const FLICK_SPEED = 0.35;
const VELOCITY_WINDOW_MS = 100;

/**
 * Inertial horizontal rail: wheel, drag, keyboard and dots all ease toward a target
 * and settle on a card. Native scroll (touch, scrollbar) keeps CSS scroll-snap.
 * Writes `--shift` on each card (0 when aligned to the rail start) for parallax.
 * Expects the rail to be `position: relative` so card offsetLeft is measured from the rail.
 */
export function useHorizontalRail(railRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const goToRef = useRef<(index: number) => void>(() => {});

  const scrollToIndex = useCallback((index: number) => goToRef.current(index), []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cards = () => Array.from(rail.children) as HTMLElement[];
    const maxScroll = () => rail.scrollWidth - rail.clientWidth;
    const clampScroll = (v: number) => Math.max(0, Math.min(maxScroll(), v));

    const indexNear = (pos: number) => {
      const list = cards();
      if (pos >= maxScroll() - 4) return list.length - 1;
      let nearest = 0;
      let best = Infinity;
      list.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - pos);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      return nearest;
    };

    const offsetOf = (index: number) => {
      const list = cards();
      const card = list[Math.max(0, Math.min(index, list.length - 1))];
      return card ? clampScroll(card.offsetLeft) : 0;
    };

    // ── Easing engine ──
    let target = rail.scrollLeft;
    let current = rail.scrollLeft;
    let driving = false;
    let settled = true;
    let frame = 0;
    let lastTime = 0;
    let settleTimer = 0;
    /** Card index a wheel gesture started from; -1 when no gesture is in progress. */
    let wheelOrigin = -1;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      driving = false;
    };

    const step = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 64) : 16.67;
      lastTime = now;
      current += (target - current) * (1 - Math.pow(1 - SMOOTHING, dt / 16.67));
      if (Math.abs(target - current) < 0.5) {
        current = target;
        rail.scrollLeft = current;
        stop();
        if (settled) delete rail.dataset.free;
        return;
      }
      rail.scrollLeft = current;
      frame = requestAnimationFrame(step);
    };

    const drive = (to: number, isFinal: boolean) => {
      settled = isFinal;
      target = clampScroll(to);
      if (!driving) {
        current = rail.scrollLeft;
        driving = true;
        rail.dataset.free = 'true';
      }
      if (!frame) frame = requestAnimationFrame(step);
    };

    /** Reduced motion: jump without easing, holding snap off briefly so it doesn't fight the jump. */
    const jump = (to: number) => {
      stop();
      rail.dataset.free = 'true';
      target = current = clampScroll(to);
      rail.scrollLeft = current;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => delete rail.dataset.free, WHEEL_SETTLE_MS);
    };

    const goTo = (index: number) => {
      window.clearTimeout(settleTimer);
      wheelOrigin = -1;
      const to = offsetOf(index);
      if (reduce.matches) jump(to);
      else drive(to, true);
    };
    goToRef.current = goTo;

    // ── Active index + parallax, driven by real scroll position ──
    let paintFrame = 0;
    const paint = () => {
      paintFrame = 0;
      const left = rail.scrollLeft;
      const width = rail.clientWidth || 1;
      cards().forEach((card) => {
        const shift = Math.max(-1.5, Math.min(1.5, (card.offsetLeft - left) / width));
        card.style.setProperty('--shift', shift.toFixed(3));
      });
      const nearest = indexNear(left);
      activeRef.current = nearest;
      setActive(nearest);
    };

    const onScroll = () => {
      if (!driving) target = current = rail.scrollLeft;
      if (!paintFrame) paintFrame = requestAnimationFrame(paint);
    };

    // Vertical wheel moves the rail sideways until it hits an edge, then the page scrolls on.
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const raw = horizontal ? e.deltaX : e.deltaY;
      const delta = e.deltaMode === 1 ? raw * 32 : raw;
      const max = maxScroll();
      if (max <= 0 || delta === 0) return;
      const base = driving ? target : rail.scrollLeft;
      if (!horizontal && ((base <= 2 && delta < 0) || (base >= max - 2 && delta > 0))) return;
      e.preventDefault();
      if (reduce.matches) {
        jump(base + delta);
        return;
      }
      if (wheelOrigin < 0) wheelOrigin = indexNear(base);
      drive(base + delta, false);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleWheel, WHEEL_SETTLE_MS);
    };

    // A deliberate push always advances at least one card, so slow notch-by-notch wheeling never bounces back.
    const settleWheel = () => {
      const travelled = target - offsetOf(wheelOrigin);
      let index = indexNear(target);
      if (index === wheelOrigin && Math.abs(travelled) > WHEEL_INTENT_PX) {
        index = wheelOrigin + Math.sign(travelled);
      }
      wheelOrigin = -1;
      goTo(index);
    };

    // ── Mouse drag with momentum ──
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    let samples: { x: number; t: number }[] = [];

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = driving ? target : rail.scrollLeft;
      samples = [{ x: e.clientX, t: e.timeStamp }];
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > DRAG_THRESHOLD) {
        moved = true;
        window.clearTimeout(settleTimer);
        wheelOrigin = -1;
        rail.dataset.dragging = 'true';
        rail.setPointerCapture(e.pointerId);
      }
      if (!moved) return;
      samples.push({ x: e.clientX, t: e.timeStamp });
      while (samples.length > 2 && e.timeStamp - samples[0].t > VELOCITY_WINDOW_MS) samples.shift();
      if (reduce.matches) jump(startLeft - dx);
      else drive(startLeft - dx, false);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete rail.dataset.dragging;
      if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
      if (!moved) return;

      const first = samples[0];
      const last = samples[samples.length - 1];
      const elapsed = last.t - first.t;
      const velocity = elapsed > 0 && e.timeStamp - last.t < 80 ? (last.x - first.x) / elapsed : 0;

      const startIndex = indexNear(startLeft);
      let index = indexNear(clampScroll(target - velocity * MOMENTUM_MS));
      if (index === startIndex && Math.abs(velocity) > FLICK_SPEED) {
        index = startIndex + (velocity < 0 ? 1 : -1);
      }
      goTo(index);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target !== rail) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(activeRef.current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(activeRef.current - 1);
      }
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    const ro = new ResizeObserver(() => {
      if (!paintFrame) paintFrame = requestAnimationFrame(paint);
    });
    ro.observe(rail);

    rail.addEventListener('scroll', onScroll, { passive: true });
    rail.addEventListener('wheel', onWheel, { passive: false });
    rail.addEventListener('pointerdown', onPointerDown);
    rail.addEventListener('pointermove', onPointerMove);
    rail.addEventListener('pointerup', endDrag);
    rail.addEventListener('pointercancel', endDrag);
    rail.addEventListener('click', onClickCapture, true);
    rail.addEventListener('keydown', onKeyDown);
    rail.addEventListener('dragstart', onDragStart);

    return () => {
      stop();
      cancelAnimationFrame(paintFrame);
      window.clearTimeout(settleTimer);
      ro.disconnect();
      goToRef.current = () => {};
      rail.removeEventListener('scroll', onScroll);
      rail.removeEventListener('wheel', onWheel);
      rail.removeEventListener('pointerdown', onPointerDown);
      rail.removeEventListener('pointermove', onPointerMove);
      rail.removeEventListener('pointerup', endDrag);
      rail.removeEventListener('pointercancel', endDrag);
      rail.removeEventListener('click', onClickCapture, true);
      rail.removeEventListener('keydown', onKeyDown);
      rail.removeEventListener('dragstart', onDragStart);
    };
  }, [railRef]);

  return { active, scrollToIndex };
}
