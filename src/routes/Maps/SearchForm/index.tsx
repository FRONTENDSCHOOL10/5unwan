import styles from './searchForm.module.css';
import Input from '@/components/Input';

export default function SearchForm() {
  return (
    <div className={styles.container}>
      <Input status="search" />
    </div>
  )
}