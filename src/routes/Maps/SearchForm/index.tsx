import mapStore from "@/stores/mapStore";
import styles from "./searchForm.module.css";
import { FormEvent, ChangeEvent } from 'react';
import { SearchTypes } from "@/routes/Maps/SearchTypes";
import Input from "@/components/Input";

export default function SearchForm() {
  const { search, setSearch, setShowList, setIsDropDown } = mapStore();

  function handleSearchList() {
    setIsDropDown(false);
    setShowList(true);

    if (search === "") {
      setShowList(false);
    }
  }  

  function searchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearchList();
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
      <SearchTypes />
    </div>
  )
}