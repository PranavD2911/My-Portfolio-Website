import styles from './SectionHead.module.css';

interface SectionHeadProps {
  index: string;
  title: string;
  note: string;
  id?: string;
}

export function SectionHead({ index, title, note, id }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <span className={`${styles.idx} reveal`}>({index})</span>
      <h2 className={styles.title} id={id}>
        <span className="mask-line">
          <span className="reveal" data-reveal="mask">
            {title}
          </span>
        </span>
      </h2>
      <span className={`${styles.note} reveal`}>{note}</span>
    </div>
  );
}
