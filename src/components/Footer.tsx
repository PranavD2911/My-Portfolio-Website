import { mailto, profile } from '../data/profile';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <a href="#top" className={styles.logo}>
          {profile.domain}
        </a>
        <span>{profile.title}</span>
        <span>{profile.location}</span>
      </div>
      <nav className={styles.links} aria-label="Social">
        <a className="sweep" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <span aria-hidden="true">|</span>
        <a className="sweep" href={profile.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span aria-hidden="true">|</span>
        <a className="sweep" href={mailto}>
          Email
        </a>
        <span aria-hidden="true">|</span>
        <a href={profile.resume} download className={`sweep ${styles.resume}`}>
          Résumé ↓
        </a>
      </nav>
      <p className={styles.copy}>© 2026 {profile.name}. All rights reserved.</p>
    </footer>
  );
}
