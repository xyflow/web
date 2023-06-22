import TermsMDX from './terms-of-use.mdx';
import styles from '../style.module.css';

// @todo fix table of content deep links
export default function Page() {
  return (
    <section className={styles.mdxContent}>
      <TermsMDX />
    </section>
  );
}
