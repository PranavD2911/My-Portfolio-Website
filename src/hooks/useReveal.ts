import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates every `.reveal` element into place as it scrolls into view.
 * `data-reveal="mask"` slides text up from behind a `.mask-line` parent instead of fading.
 * `data-drift="N"` moves an element horizontally from -N% to N% while it crosses the viewport.
 * Initial hidden state lives in CSS under `html.js-motion`; index.html sets the
 * class before first paint, and it is toggled here if the motion preference changes.
 */
export function useReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.classList.add('js-motion');

      ScrollTrigger.batch('.reveal:not([data-reveal="mask"])', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });

      ScrollTrigger.batch('.reveal[data-reveal="mask"]', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 0, yPercent: 115, rotate: 3 },
            { yPercent: 0, rotate: 0, duration: 1.3, ease: 'expo.out', stagger: 0.1, overwrite: true },
          ),
      });

      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
        const d = Number(el.dataset.drift) || 0;
        gsap.fromTo(
          el,
          { xPercent: -d },
          {
            xPercent: d,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        );
      });

      let active = true;
      const onLoad = () => active && ScrollTrigger.refresh();
      document.fonts?.ready.then(onLoad);
      window.addEventListener('load', onLoad);
      return () => {
        active = false;
        window.removeEventListener('load', onLoad);
      };
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      root.classList.remove('js-motion');
    });

    return () => mm.revert();
  }, []);
}
