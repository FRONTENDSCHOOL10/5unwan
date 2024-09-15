import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import styles from './map.module.css';
import SearchForm from './SearchForm';
import MapBoard from './MapBoard';
import SearchList from '@/routes/Maps/SearchList';

interface MarkerTypes {
  position: { lat: number, lng: number };
  content: string;
}
interface StateTypes {
  center: { lat: number; lng: number };
  errMsg: string | null;
  isLoading: boolean;
}

const defaultLocation = {
  lat: 37.5709958592808,
  lng: 126.978914477333
};

export default function Maps() {
  const { user } = useOutletContext<UserContext>();
  const [search, setSearch] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [markers, setMarkers] = useState<MarkerTypes[]>([]);
  // const [map, setMap] = useState<kakao.maps.Map>();
  const [map, setMap] = useState<any>(null);
  const [state, setState] = useState<StateTypes>({
    center: defaultLocation,
    errMsg: null,
    isLoading: true,
  });

  function handleSearchList() {
    setShowList(true);
  }

  useEffect(() => {
    if (!map) return
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${search}`, (data: any, status: any, _pagination: any) => {
      // if (status === kakao.maps.services.Status.OK) {
      if (status === (window as any).kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new (window as any).kakao.maps.LatLngBounds();
        const markers: MarkerTypes[] = [];

        for (let i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: parseFloat(data[i].y),  // 문자열로 반환된 위도 값을 숫자로 변환
              lng: parseFloat(data[i].x),  // 문자열로 반환된 경도 값을 숫자로 변환
            },
            content: data[i].place_name,
          })
          bounds.extend(new (window as any).kakao.maps.LatLng(parseFloat(data[i].y), parseFloat(data[i].x)));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map, search]);

  return (
    <div className={styles.container}>
      <div className="sr-only">
        <p>현재 사용자: {user?.nickname}</p>
        <br />
      </div>
      <SearchForm search={search} setSearch={setSearch} handleSearchList={handleSearchList} />
      {
        showList && <SearchList markers={markers} setState={setState} />
      }
      <MapBoard markers={markers} setMap={setMap} search={search} state={state} setState={setState} defaultLocation={defaultLocation} />
    </div>
  )
}