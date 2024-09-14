import { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import styles from './map.module.css';
import SearchForm from './SearchForm';
import MapBoard from './MapBoard';

export default function Maps() {
  const { user } = useOutletContext<UserContext>();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);

  return (
    <div className={styles.container}>
      <div className="sr-only">
        <p>현재 사용자: {user?.nickname}</p>
        <br />
      </div>
      <SearchForm />
      <MapBoard map={map} setMap={setMap} marker={marker} setMarker={setMarker} />
    </div>
  )
}