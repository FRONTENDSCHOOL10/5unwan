import { useEffect, Dispatch, SetStateAction } from "react";
import styles from './mapBoard.module.css';

declare global {
  interface Window {
    kakao: any;
  }
}

// Dispatch: 상태 변경을 위한 함수의 타입
// SetStateAction: useState로 생성된 상태를 업데이트할 때 사용되는 타입
interface MapBoardProps {
  map: kakao.maps.Map | null;
  setMap: Dispatch<SetStateAction<kakao.maps.Map | null>>;
  marker: kakao.maps.Marker | null;
  setMarker: Dispatch<SetStateAction<kakao.maps.Marker | null>>;
}

const defaultLocation = {
  lat: 37.5709958592808,
  lng: 126.978914477333
};

export default function MapBoard({map, setMap, marker, setMarker}:MapBoardProps) {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = document.getElementById("map"); // 지도를 표시할 div
    if (!container) return;

    const options: kakao.maps.MapOptions = {
      center: new window.kakao.maps.LatLng(defaultLocation.lat, defaultLocation.lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    
    // 지도 생성
    const mapCreate = new window.kakao.maps.Map(container, options);
    setMap(mapCreate); // map에 mapCreate넣기

    // 마커 생성
    const newMarker = new window.kakao.maps.Marker({
      position: options.center,
      map: mapCreate,
    });
    setMarker(newMarker);
  }, [setMap, setMarker]);

  useEffect(() => {
    if (!map || !marker) return;

    const clickListener = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        (result: kakao.maps.services.Address[], status: kakao.maps.services.Status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const addr = result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            console.log(addr);

            marker.setMap(null);
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
          }
        }
      );
    };

    window.kakao.maps.event.addListener(map, "click", clickListener);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", clickListener);
    };
  }, [map, marker]);

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      (error) => {
        console.error(`Error occurred. Error code: ${error.code}`);
        alert("위치 정보를 가져오는데 실패했습니다.");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }

  function getPosSuccess(pos: GeolocationPosition) {
    const currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );

    if (map && marker) {
      map.panTo(currentPos);

      marker.setMap(null);
      marker.setPosition(currentPos);
      marker.setMap(map);
    }
  }

  return (
    <div className={styles.container}>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
      <button type="button" onClick={getCurrentLocation}>현재위치</button>
    </div>
  );
}