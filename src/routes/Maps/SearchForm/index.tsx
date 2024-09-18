import useMapStore from '@/stores/mapStore';
import styles from './searchForm.module.css';
import { FormEvent, ChangeEvent } from 'react';
import Input from '@/components/Input';

export default function SearchForm() {
  const mapStore = useMapStore();
  const search = mapStore.search;
  const setSearch = mapStore.setSearch;
  const setShowList = mapStore.setShowList;

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
      <Input
        status="search"
        onChange={searchContent}
        onSubmit={searchSubmit}
        value={search}
      />
    </div>
  )
}