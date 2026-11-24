import { Fragment, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tickerItems } from '../data/profile';
import styles from './Ticker.module.css';

gsap.registerPlugin(ScrollTrigger);

const COPIES = 4;
const BASE_SPEED = 55; // px per second
const MAX_BOOST = 7;
const HOVER_SPEED = 0.2;

export function Ticker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Track holds an even number of copies, so half its width is one seamless loop.
      let loop = track.offsetWidth / 2;
      let x = 0;
      let dir = 1;
      let dirTarget = 1;
      let boost = 0;
      let boostTarget = 0;
      let hover = 1;
      let hoverTarget = 1;

      const setX = gsap.quickSetter(track, 'x', 'px') as (v: number) => void;
      const wrap = () => gsap.utils.wrap(-loop, 0);
      let wrapX = wrap();

      const tick = (_time: number, deltaMs: number) => {
        const dt = Math.min(deltaMs, 64) / 1000;
        boostTarget *= Math.exp(-dt * 3.5);
        boost += (boostTarget - boost) * (1 - Math.exp(-dt * 10));
        dir += (dirTarget - dir) * (1 - Math.exp(-dt * 4));
        hover += (hoverTarget - hover) * (1 - Math.exp(-dt * 5));
        x = wrapX(x - BASE_SPEED * dir * (1 + boost) * hover * dt);
        setX(x);
      };

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          dirTarget = self.direction;
          boostTarget = Math.max(boostTarget, Math.min(Math.abs(self.getVelocity()) / 220, MAX_BOOST));
        },
      });

      const ro = new ResizeObserver(() => {
        loop = track.offsetWidth / 2;
        wrapX = wrap();
      });
      ro.observe(track);

      let running = false;
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running) gsap.ticker.add(tick);
        if (!entry.isIntersecting && running) gsap.ticker.remove(tick);
        running = entry.isIntersecting;
      });
      io.observe(root);

      const slow = () => (hoverTarget = HOVER_SPEED);
      const resume = () => (hoverTarget = 1);
      root.addEventListener('pointerenter', slow);
      root.addEventListener('pointerleave', resume);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        ro.disconnect();
        io.disconnect();
        root.removeEventListener('pointerenter', slow);
        root.removeEventListener('pointerleave', resume);
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className={styles.ticker} ref={rootRef} aria-hidden="true">
      <div className={styles.track} ref={trackRef}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <Fragment key={copy}>
            {tickerItems.map((item) => (
              <Fragment key={`${copy}-${item}`}>
                <span>{item}</span>
                <i className={styles.ast}>✳</i>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
