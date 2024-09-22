import mapStore from "@/stores/mapStore";
import styles from "./mapBoard.module.css";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBoard() {
  const { defaultLocation, state, setState, currentPositionMarker, setCurrentPositionMarker, map, setMap, markers, hasSearchResults } = mapStore();

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
          showCurrentLocationOnly: true,
        }));
        setCurrentPositionMarker("현재위치");
        map.panTo(currentPos);
      },
      (err: GeolocationPositionError) => {
        setState((prev) => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
          showCurrentLocationOnly: false,
        }));
      })
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할 수 없어요.",
        isLoading: false,
        showCurrentLocationOnly: false,
      }));
    }
  }

  function showMarkers() {
    if (state.showCurrentLocationOnly) {
      return (
        <>
          <MapMarker position={{ lat: state.center.lat, lng: state.center.lng }} />
          <CustomOverlayMap
            position={{ lat: state.center.lat, lng: state.center.lng }}
            yAnchor={1}
          >
            <div className={styles["speech-bubble"]}>
              <span>📍 {currentPositionMarker}</span>
            </div>
          </CustomOverlayMap>
        </>
      );
    }

    if (!hasSearchResults) {
      return (
          <>
            <MapMarker position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }} />
            <CustomOverlayMap
              position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}
              yAnchor={1}
            >
              <div className={styles["speech-bubble"]}>
                <span>📍 멋쟁이사자처럼</span>
              </div>
            </CustomOverlayMap>
          </>
      );
    } else if (hasSearchResults) {
      return (
        markers.map((marker, index) => (
          <div key={index}>
            <MapMarker position={marker.position} />
            <CustomOverlayMap
              position={marker.position}
              yAnchor={1}
            >
              <div className={styles["speech-bubble"]}>
                <span>📍 {marker.content}</span>
              </div>
            </CustomOverlayMap>
          </div>
        ))
      );
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
          showMarkers()
        }
        <button className={styles["button-current"]} type="button" onClick={getCurrentLocation}></button>
      </Map>
    </div>
  );
}