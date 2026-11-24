import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <section className={styles.manifest} aria-labelledby="manifesto-title">
      <div className={styles.top}>
        <p className={styles.note}>// manifesto</p>
        <span className={styles.idx}>(00) — about</span>
      </div>
      <h2 className={styles.lines} id="manifesto-title">
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            I build <mark className="mk mk--lime">front.</mark>
          </span>
        </span>
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            I build <mark className="mk mk--mint">back.</mark>
          </span>
        </span>
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            I build for <mark className="mk mk--gold">real users.</mark>
          </span>
        </span>
      </h2>
      <p className={`${styles.sub} reveal`}>
        I&apos;m a Full Stack Software Engineer working across mobile, web, and backend technologies. I enjoy
        turning complex requirements into practical, scalable software — from designing user interfaces to
        developing APIs and integrating databases.
      </p>
    </section>
  );
}
