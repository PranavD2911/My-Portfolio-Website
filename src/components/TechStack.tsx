import { stack } from '../data/stack';
import { SectionHead } from './SectionHead';
import styles from './TechStack.module.css';

export function TechStack() {
  return (
    <section className={styles.stack} id="stack" aria-labelledby="stack-title">
      <SectionHead index="01" title="What I work with" note="// languages & tools" id="stack-title" />
      {stack.map((group, i) => (
        <div className={`${styles.row} wipe reveal`} key={group.title}>
          <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
          <div className={styles.main}>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
          </div>
          <ul className={styles.tags} aria-label={`${group.title} technologies`}>
            {group.tools.map((tool) => (
              <li className="tag" key={tool}>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
