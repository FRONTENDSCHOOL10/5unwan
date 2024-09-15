import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import styles from './map.module.css';
import SearchForm from './SearchForm';
import MapBoard from './MapBoard';
import SearchList from '@/routes/Maps/SearchList';

export default function Maps() {
  const { user } = useOutletContext<UserContext>();
  const [search, setSearch] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);

  function handleSearchList() {
    setShowList(true);
  }

  return (
    <div className={styles.container}>
      <div className="sr-only">
        <p>현재 사용자: {user?.nickname}</p>
        <br />
      </div>
      <SearchForm search={search} setSearch={setSearch} handleSearchList={handleSearchList} />
      {
        showList && <SearchList />
      }
      <MapBoard />
    </div>
  )
}