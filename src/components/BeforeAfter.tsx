import { shifts } from '../data/beforeAfter';
import styles from './BeforeAfter.module.css';

const scattered = [
  { label: 'UI', x: 8, y: 10, rot: -12 },
  { label: 'API', x: 56, y: 6, rot: 9 },
  { label: 'DB', x: 30, y: 30, rot: -4 },
  { label: 'Auth', x: 70, y: 32, rot: 16 },
  { label: 'Sync', x: 12, y: 50, rot: 7 },
  { label: 'UI', x: 48, y: 52, rot: -18 },
  { label: 'API', x: 76, y: 58, rot: -6 },
  { label: 'Build', x: 28, y: 68, rot: 12 },
];
const layers = [
  { name: 'apps', tiles: ['Mobile', 'Web', 'Admin'] },
  { name: 'shared', tiles: ['Reusable components'] },
  { name: 'services', tiles: ['REST API', 'WebSockets'] },
  { name: 'data', tiles: ['EF Core', 'SQL Server'] },
];

export function BeforeAfter() {
  return (
    <section className={styles.ba} id="impact" aria-labelledby="ba-title">
      <div className={styles.word} aria-hidden="true">
        <span className={styles.line} data-drift="4">
          <span className="mask-line">
            <span className="reveal" data-reveal="mask">
              BEFORE
            </span>
          </span>
        </span>
        <div className={styles.circle}>
          <span>&amp;</span>
        </div>
        <span className={`${styles.line} ${styles.lineRight}`} data-drift="-4">
          <span className="mask-line">
            <span className="reveal" data-reveal="mask">
              AFTER
            </span>
          </span>
        </span>
      </div>

      <div className={styles.head}>
        <p className={`${styles.note} reveal`}>// development impact</p>
        <h2 className={styles.title} id="ba-title">
          <span className="mask-line">
            <span className="reveal" data-reveal="mask">
              From complex requirements
            </span>
          </span>
          <span className="mask-line">
            <span className="reveal" data-reveal="mask">
              to working software.
            </span>
          </span>
        </h2>
      </div>

      <div className={styles.panels}>
        <figure className={`${styles.panel} ${styles.before} reveal`} data-reveal="left">
          <div className={styles.chaos} aria-hidden="true">
            {scattered.map((chip, i) => (
              <span
                key={`${chip.label}-${i}`}
                className={styles.chip}
                style={{ left: `${chip.x}%`, top: `${chip.y}%`, ['--rot' as string]: `${chip.rot}deg` }}
              >
                {chip.label}
              </span>
            ))}
          </div>
          <figcaption>before: scattered pieces, every screen built twice</figcaption>
        </figure>

        <figure className={`${styles.panel} ${styles.after} reveal`} data-reveal="right">
          <div className={styles.order} aria-hidden="true">
            {layers.map((layer) => (
              <div key={layer.name} className={`${styles.layer} ${styles[layer.name]}`}>
                <span className={styles.tag}>{layer.name}</span>
                <div className={styles.tiles}>
                  {layer.tiles.map((tile) => (
                    <span key={tile} className={styles.block}>
                      {tile}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <figcaption>after: one system, shared parts, connected services</figcaption>
        </figure>
      </div>

      <ul className={styles.rows}>
        {shifts.map((shift) => (
          <li className={`${styles.row} wipe reveal`} key={shift.label}>
            <span className={styles.label}>{shift.label}</span>
            <span className={styles.beforeText}>
              <span className="visually-hidden">Before: </span>
              {shift.before}
            </span>
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
            <span className={styles.afterText}>
              <span className="visually-hidden">After: </span>
              {shift.after}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
