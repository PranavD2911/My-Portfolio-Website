import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/profile';
import { ArrowIcon } from './ArrowIcon';
import styles from './Hero.module.css';

const photos = import.meta.glob<string>('../assets/photo.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});
const photo = Object.values(photos)[0];

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } });
      tl.from('[data-hero="line"]', { yPercent: 105, stagger: 0.12 })
        .from('[data-hero="meta"]', { opacity: 0, y: -12, duration: 0.8 }, 0.1)
        .from('[data-hero="circle"]', { scale: 0, rotate: -90, duration: 1 }, 0.45)
        .from('[data-hero="photo"]', { opacity: 0, x: 64, y: 32, duration: 1.1 }, 0.3)
        .from('[data-hero="fade"]', { opacity: 0, y: 24, stagger: 0.08, duration: 0.9 }, 0.6);

      const exit = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 };
      gsap.to('[data-hero-drift="left"]', { xPercent: -12, ease: 'none', scrollTrigger: exit });
      gsap.to('[data-hero-drift="right"]', { xPercent: 12, ease: 'none', scrollTrigger: exit });
      gsap.fromTo(
        '[data-hero="photo"] img',
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: '[data-hero="photo"]', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      );
    }, root.current ?? undefined);
    return () => mm.revert();
  }, []);

  return (
    <section className={styles.hero} ref={root} aria-labelledby="hero-title">
      <div className={styles.meta} data-hero="meta">
        <span>
          pranav.dev — full stack · {profile.location}
        </span>
        <span className={styles.status}>
          <i aria-hidden="true" />
          {profile.availability}
        </span>
      </div>

      <div className={styles.titleWrap}>
        <div className={styles.name}>
          <h1 className={styles.word} id="hero-title">
            <span className={styles.mask} data-hero-drift="left">
              <span className={`${styles.line} ${styles.left}`} data-hero="line">
                {profile.firstName}
              </span>
            </span>
            <span className={styles.mask} data-hero-drift="right">
              <span className={`${styles.line} ${styles.right}`} data-hero="line">
                {/* Invisible copy of the first two letters, so the surname starts under the third. */}
                <span className={styles.indent} aria-hidden="true">
                  {profile.firstName.slice(0, 2)}
                </span>
                {profile.lastName}
              </span>
            </span>
          </h1>

          <div className={styles.circle} aria-hidden="true" data-hero="circle">
            <span>DEV</span>
          </div>
        </div>

        <figure className={styles.photo} data-hero="photo">
          {photo ? (
            <img src={photo} alt={`Portrait of ${profile.name}, ${profile.title}`} fetchPriority="high" />
          ) : (
            <div className={styles.placeholder} role="img" aria-label={`Portrait placeholder for ${profile.name}`}>
              <span className={styles.monogram}>PD</span>
              <span className={styles.phNote}>photo · 2:3</span>
            </div>
          )}
          <figcaption>// {profile.currentRole}</figcaption>
        </figure>
      </div>

      <div className={styles.bottom}>
        <div className={styles.intro}>
          <p className={styles.designation} data-hero="fade">
            Full Stack
            <br />
            Software Engineer
          </p>
          <p className={styles.lead} data-hero="fade">
            {profile.intro}
          </p>
        </div>
        <div className={styles.cta} data-hero="fade">
          <a className="pill pill--lime pill--big" href={profile.resume} download>
            Download résumé <ArrowIcon className="arr-svg arr-down" />
          </a>
          <a className="pill pill--ghost pill--big" href="#work">
            Explore my work
          </a>
        </div>
      </div>
    </section>
  );
}
