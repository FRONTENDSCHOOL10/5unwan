import mapStore from "@/stores/mapStore";
import styles from "./mapBoard.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBoard() {
  const { defaultLocation, state, setState, selectedMarkerContent, setSelectedMarkerContent, map, setMap } = mapStore();

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        
        setState((prev) => ({
          ...prev,
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          isLoading: false,
        }));
        setSelectedMarkerContent("현재위치");
        map.panTo(currentPos);
      },
      (err: GeolocationPositionError) => {
        setState((prev) => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
        }));
      })
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요.",
        isLoading: false,
      }));
    }
  }

  return (
    <div className={styles.container}>
      <Map
        center={ {lat: defaultLocation.lat, lng: defaultLocation.lng }} 
        style={{ width: "100vw", height: "calc(100vh - 60px)" }}
        level={3}
        onCreate={setMap}
      >
        {
          state.isLoading
            ?
          <MapMarker position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}>
            <div style={{ color: "#000" }}>📍 멋쟁이사자처럼</div> 
          </MapMarker>
            :
          <MapMarker position={{ lat: state.center.lat, lng: state.center.lng }}>
            <div style={{ color: "#000", width: "100%", whiteSpace: "nowrap", overflow: "hidden"}}>📍 {selectedMarkerContent}</div>
          </MapMarker>
        }
        <button className={styles["button-current"]} type="button" onClick={getCurrentLocation}></button>
      </Map>
    </div>
  );
}