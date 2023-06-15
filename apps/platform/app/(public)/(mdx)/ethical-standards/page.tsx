// @todo replace markdown/ethical-standards with mdx files and import from there
import TermsMDX from './ethical-standards.mdx';
import styles from '../style.module.css';

export default function Page() {
  return (
    <section className={styles.mdxContent}>
      <TermsMDX />
    </section>
  );
}
