import mapStore from '@/stores/mapStore';
import styles from './searchForm.module.css';
import { FormEvent, ChangeEvent } from 'react';
import Input from '@/components/Input';

export default function SearchForm() {
  const { search, setSearch, setShowList } = mapStore();

  function handleSearchList() {
    setShowList(true);

    if (search === '') {
      setShowList(false);
    }
  }  

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
      <form onSubmit={searchSubmit}>
        <Input
          type="search"
          name="search"
          value={search}
          onChange={searchContent}
          labelHide={true}
          errorTextHide={true}
        />
      </form>
    </div>
  )
}