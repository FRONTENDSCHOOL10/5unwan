import styles from './searchForm.module.css';
import { FormEvent, ChangeEvent } from 'react';
import Input from '@/components/Input';

interface SearchFormProps {
  search?: string;
  value?: string;
  setSearch: (value: string) => void;
  handleSearchList: () => void;
}

export default function SearchForm({ search, setSearch, handleSearchList } :SearchFormProps) {

  function searchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearchList();
    console.log('검색어 :', search);
  }
  
  function searchContent(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <div className={styles.container}>
      <Input status="search" onChange={searchContent} onSubmit={searchSubmit} value={search} />
    </div>
  )
}