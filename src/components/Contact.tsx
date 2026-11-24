import { mailto, profile } from '../data/profile';
import { ArrowIcon } from './ArrowIcon';
import styles from './Contact.module.css';

const channels = [
  { label: 'Email', value: profile.email, href: mailto, external: false },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, external: false },
  { label: 'LinkedIn', value: 'in/pranav-dhage', href: profile.linkedin, external: true },
  { label: 'GitHub', value: profile.githubHandle, href: profile.github, external: true },
];

export function Contact() {
  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <p className={styles.note}>// hiring? let&apos;s talk.</p>

      <h2 className={styles.title} id="contact-title">
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            Open to
          </span>
        </span>
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            <mark className="mk mk--lime">new roles.</mark>
          </span>
        </span>
      </h2>

      <a
        className={`${styles.cta} reveal`}
        href={mailto}
        data-magnetic="0.12"
        aria-label={`Get in touch, email ${profile.email}`}
      >
        Get in touch <ArrowIcon />
      </a>

      <div className={styles.grid}>
        <div className="reveal">
          <p className={styles.sub}>
            I&apos;m looking for full-time Software Engineer roles where I can work across Flutter, React.js, and
            ASP.NET Core. If my experience fits your team, I&apos;d be glad to talk.
          </p>
          <a className={`pill pill--lime pill--big ${styles.resume}`} href={profile.resume} download>
            Download résumé <ArrowIcon className="arr-svg arr-down" />
          </a>
        </div>

        <ul className={styles.channels}>
          {channels.map((c) => (
            <li key={c.label} className="reveal">
              <a
                className="wipe"
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={styles.chLabel}>{c.label}</span>
                <span className={styles.chValue}>{c.value}</span>
                <ArrowIcon className={`arr-svg ${styles.chArrow}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
