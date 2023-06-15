// @todo replace markdown/terms-of-use with mdx files and import from there
import TermsMDX from './privacy-policy.mdx';
import styles from '../style.module.css';

export default function Page() {
  return (
    <section className={styles.mdxContent}>
      <TermsMDX />
    </section>
  );
}
