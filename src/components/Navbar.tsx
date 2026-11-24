import { useEffect, useRef, useState } from 'react';
import { navLinks, profile } from '../data/profile';
import { useActiveSection, useScrolledPast } from '../hooks/useActiveSection';
import { ArrowIcon } from './ArrowIcon';
import styles from './Navbar.module.css';

const sectionIds = navLinks.map((link) => link.id);

export function Navbar() {
  const solid = useScrolledPast(24);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    // The rest of the page is unreachable while the full-screen menu covers it.
    const header = headerRef.current;
    const blocked = Array.from(header?.parentElement?.children ?? []).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header,
    );
    blocked.forEach((el) => (el.inert = true));
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      menuBtnRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      blocked.forEach((el) => (el.inert = false));
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${solid ? styles.solid : ''} ${open ? styles.menuOpen : ''}`}
    >
      <a className={styles.logo} href="#top" onClick={close} aria-label={`${profile.name}, back to top`}>
        {profile.brand}
        <sup>®</sup>
      </a>

      <nav className={styles.nav} aria-label="Primary">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={active === link.id ? styles.active : undefined}
            aria-current={active === link.id ? 'location' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.right}>
        <a className={`pill pill--ghost ${styles.resume}`} href={profile.resume} download>
          Résumé
        </a>
        <a className={`pill pill--lime ${styles.hello}`} href="#contact">
          Say hello <ArrowIcon />
        </a>
        <button
          ref={menuBtnRef}
          type="button"
          className={`pill pill--ghost ${styles.menuBtn}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ol>
            {navLinks.map((link, i) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={close}>
                  <span>0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.overlayCtas}>
          <a className="pill pill--lime pill--big" href="#contact" onClick={close}>
            Say hello <ArrowIcon />
          </a>
          <a className="pill pill--ghost pill--big" href={profile.resume} download>
            Résumé <ArrowIcon className="arr-svg arr-down" />
          </a>
        </div>
        <p className={styles.overlayMeta}>
          {profile.email}
          <br />
          {profile.location}
        </p>
      </div>
    </header>
  );
}
