import { certifications, education, jobs } from '../data/experience';
import { profile } from '../data/profile';
import { ArrowIcon } from './ArrowIcon';
import { SectionHead } from './SectionHead';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section className={styles.exp} id="about" aria-labelledby="about-title">
      <SectionHead index="04" title="Experience" note="// about me" id="about-title" />

      <ol>
        {jobs.map((job, i) => (
          <li className={`${styles.row} wipe reveal`} key={job.company}>
            <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
            <div className={styles.main}>
              <h3>{job.company}</h3>
              <p className={styles.meta}>
                <span className={styles.role}>{job.role}</span>
                <span>{job.period}</span>
                <span>{job.location}</span>
              </p>
            </div>
            <ul className={styles.tags} aria-label={`Key areas at ${job.company}`}>
              {job.areas.map((area) => (
                <li className="tag" key={area}>
                  {area}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className={styles.extra}>
        <div className={`${styles.block} reveal`} data-reveal="left">
          <p className={styles.label}>// education</p>
          <h3 className={styles.school}>{education.school}</h3>
          <p className={styles.degree}>{education.degree}</p>
          <p className={styles.small}>
            <span>{education.period}</span>
            <span className={styles.grade}>{education.grade}</span>
          </p>
        </div>

        <div className={`${styles.block} reveal`} data-reveal="right">
          <p className={styles.label}>// certifications</p>
          <ul className={styles.certs}>
            {certifications.map((cert, i) => (
              <li key={cert}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${styles.resumeRow} reveal`}>
        <p>
          <span className={styles.label}>// résumé</span>
          Full work history, skills, and certifications in one PDF.
        </p>
        <a className="pill pill--lime pill--big" href={profile.resume} download>
          Download résumé <ArrowIcon className="arr-svg arr-down" />
        </a>
      </div>
    </section>
  );
}
