import type { Project } from '../data/projects';
import { ArrowIcon } from './ArrowIcon';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`${styles.card} ${styles[project.tone]} reveal`}
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}: ${project.name}`}
    >
      <div className={styles.info}>
        <div className={styles.top}>
          <span className={styles.idx}>
            №{num} — {project.timeline}
          </span>
          <span className={styles.kind}>{project.kind}</span>
        </div>

        <div>
          <h3 className={styles.name}>{project.name}</h3>
          <p className={styles.desc}>{project.description}</p>
        </div>

        <ul className={styles.tech} aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className={styles.foot}>
          <span className={styles.role}>{project.role}</span>
          {project.link && (
            <a className={styles.link} href={project.link.href} target="_blank" rel="noopener noreferrer">
              {project.link.label} <ArrowIcon />
            </a>
          )}
        </div>
      </div>

      <div className={styles.side}>
        <div className={styles.preview}>
          {project.image ? (
            <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
          ) : (
            <div className={styles.mock} aria-hidden="true">
              <div className={styles.mockBar}>
                <span>// {project.slug}</span>
                <span>preview</span>
              </div>
              <div className={styles.mockGrid}>
                {project.visual.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.contrib}>
          <p className={styles.contribLabel}>My contribution</p>
          <ul>
            {project.contributions.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
