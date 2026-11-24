import { useRef } from 'react';
import { projects } from '../data/projects';
import { useHorizontalRail } from '../hooks/useHorizontalRail';
import { ProjectCard } from './ProjectCard';
import { SectionHead } from './SectionHead';
import styles from './Projects.module.css';

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const { active, scrollToIndex } = useHorizontalRail(railRef);

  return (
    <section className={styles.projects} id="work" aria-labelledby="work-title">
      <div className={styles.headWrap}>
        <SectionHead
          index="02"
          title="Things I've helped build."
          note="// selected projects — scroll sideways →"
          id="work-title"
        />
      </div>

      <div
        className={styles.rail}
        ref={railRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Selected projects. Use left and right arrow keys to move between projects."
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} total={projects.length} />
        ))}
      </div>

      <div className={styles.dots} role="group" aria-label="Choose project">
        {projects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            className={i === active ? styles.dotActive : undefined}
            aria-label={`Show project ${i + 1}: ${project.name}`}
            aria-current={i === active ? 'true' : undefined}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
