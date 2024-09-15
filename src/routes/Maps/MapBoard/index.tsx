import styles from './mapBoard.module.css';
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapBoardProps {
  markers: {
    position: { lat: number, lng: number },
    content: string
  }[];
  setMap?: (map: any) => void;
  search?: string;
  state: {
    center: { lat: number; lng: number };
    errMsg: string | null;
    isLoading: boolean;
  };
  setState: React.Dispatch<React.SetStateAction<{
    center: { lat: number; lng: number };
    errMsg: string | null;
    isLoading: boolean;
  }>>;
  defaultLocation: {
    lat: number,
    lng: number
  };
}

export default function MapBoard({ markers, setMap, search, state, setState, defaultLocation } :MapBoardProps) {
  function getCurrentLocation() {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }))
        },
        (err: GeolocationPositionError) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      )
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }

  function handleMapMarker(position: { lat: number, lng: number }) {
    setState(() => ({
      center: position,
      errMsg: null,
      isLoading: false
    }));
  }
  
  return (
    <div className={styles.container}>
      {/* 지도를 표시할 container */}
      <Map
        center={{ lat: state.center.lat, lng: state.center.lng }} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도의 크기
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}>
          {/* <div style={{color:"#000"}}>Hello World!</div> */}
        </MapMarker>
        {!state.isLoading && (
          <MapMarker position={state.center} />
        )}
        {
          markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => handleMapMarker(marker.position)}
            >
              { search === marker.content && (<div style={{color:"#000"}}>{marker.content}</div>) }
            </MapMarker>
          ))
        }
      </Map>
      <button className={styles["button-current"]} type="button" onClick={getCurrentLocation}></button>
    </div>
  );
}