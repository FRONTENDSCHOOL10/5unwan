import { useState } from "react";
import styles from './mapBoard.module.css';
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

const defaultLocation = {
  lat: 37.5709958592808,
  lng: 126.978914477333
};

export default function MapBoard() {
  const [state, setState] = useState<{
    center: { lat: number; lng: number };
    errMsg: string | null;
    isLoading: boolean;
  }>({
    center: defaultLocation,
    errMsg: null,
    isLoading: true,
  });

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

  return (
    <div className={styles.container}>
      {/* 지도를 표시할 container */}
      <Map
        center={{ lat: state.center.lat, lng: state.center.lng }} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도의 크기
        level={3} // 지도의 확대 레벨
      >
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}>
          {/* <div style={{color:"#000"}}>Hello World!</div> */}
        </MapMarker>
        {!state.isLoading && (
          <MapMarker position={state.center}>
            {/* <div style={{ padding: "5px", color: "#000" }}>
              {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
            </div> */}
          </MapMarker>
        )}
      </Map>
      <button className={styles["button-current"]} type="button" onClick={getCurrentLocation}>현재위치</button>
    </div>
  );
}