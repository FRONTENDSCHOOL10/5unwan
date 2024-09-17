import useMapStore from '@/stores/mapStore';
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
  address?: string;
}

export default function Maps() {
  const mapStore = useMapStore();
  // const defaultLocation = mapStore.defaultLocation;
  // const state = mapStore.state;
  const showList = mapStore.showList;
  const search = mapStore.search;
  const setMarkers = mapStore.setMarkers;
  const updateMarker = mapStore.updateMarker;
  const { user } = useOutletContext<UserContext>();
  const [map, setMap] = useState<kakao.maps.Map>();
  // const [map, setMap] = useState<any>(null);

  // 좌표로 상세 주소를 가져오는 함수
  function getAddressFromCoords(lat: number, lng: number, callback: (address: string) => void) {
    const geocoder = new kakao.maps.services.Geocoder();
    // const coord = new (window as any).kakao.maps.LatLng(lat, lng);

    geocoder.coord2Address(lng, lat, function(result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const detailAddr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
        callback(detailAddr);
      }
    });
  }

  useEffect(() => {
    if (!map) return;
    const ps = new (window as any).kakao.maps.services.Places();

    ps.keywordSearch(`${search}`, (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers: MarkerTypes[] = [];

        data.forEach((place: any, index: number) => {
          const marker = {
            position: {
              lat: parseFloat(place.y),
              lng: parseFloat(place.x),
            },
            content: place.place_name,
            address: ''  // 기본적으로 빈 값으로 설정
          };

          // 각 마커의 좌표로부터 주소를 가져오고, markers에 추가
          getAddressFromCoords(marker.position.lat, marker.position.lng, (address) => {
            marker.address = address;
            updateMarker(index, marker);
            // setMarkers((prevMarkers) => {
            //   const updatedMarkers = [...prevMarkers];
            //   updatedMarkers[index] = marker;  // 해당 마커 업데이트
            //   return updatedMarkers;
            // });
          });

          bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
          newMarkers.push(marker);  
        });

        setMarkers(newMarkers);
        map.setBounds(bounds);  // 지도 범위 설정
      }
    });
  // }, [map, search, setMarkers, updateMarker]);
  }, [map, search, setMarkers, updateMarker]);
  
  return (
    <div className={styles.container}>
      <div className="sr-only">
        <p>현재 사용자: {user?.nickname}</p>
        <br />
      </div>
      {/* <SearchForm search={search} setSearch={setSearch} handleSearchList={handleSearchList} /> */}
      <SearchForm />
      {
        showList && <SearchList />
      }
      <MapBoard map={map} setMap={setMap} />
    </div>
  )
}