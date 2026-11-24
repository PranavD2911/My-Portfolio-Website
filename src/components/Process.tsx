import { processSteps } from '../data/process';
import { SectionHead } from './SectionHead';
import styles from './Process.module.css';

export function Process() {
  return (
    <section className={styles.process} id="process" aria-labelledby="process-title">
      <SectionHead index="03" title="From idea to implementation." note="// how I work" id="process-title" />
      <ol className={styles.steps}>
        {processSteps.map((step, i) => (
          <li className="reveal" key={step.title}>
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
