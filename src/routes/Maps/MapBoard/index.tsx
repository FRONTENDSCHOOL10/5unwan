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
  // Kakao Maps Service 객체와 인포윈도우를 선언합니다.
  const geocoder = new (window as any).kakao.maps.services.Geocoder();
  const infowindow = new (window as any).kakao.maps.InfoWindow({ zIndex: 1 });

  // 좌표로부터 상세 주소를 가져오는 함수
  function searchDetailAddrFromCoords(coords: any, callback: any) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  function handleMapClick(mouseEvent: any) {
    const latlng = mouseEvent.latLng;

    // 좌표를 바탕으로 상세 주소 요청
    searchDetailAddrFromCoords(latlng, function(result: any, status: any) {
      if (status === (window as any).kakao.maps.services.Status.OK) {
        const detailAddr = result[0].road_address ? `도로명 주소: ${result[0].road_address.address_name}` : '';
        const jibunAddr = `지번 주소: ${result[0].address.address_name}`;
        const content = `
          <div style="padding:5px;">
            <div>법정동 주소정보:</div>
            <div>${detailAddr}</div>
            <div>${jibunAddr}</div>
          </div>
        `;

        // 클릭한 위치에 마커를 표시하고 인포윈도우를 엽니다.
        const marker = new (window as any).kakao.maps.Marker({
          position: latlng
        });
        marker.setMap(map);  // 마커를 지도에 표시

        infowindow.setContent(content);  // 인포윈도우에 주소를 표시
        infowindow.open(map, marker);  // 인포윈도우를 지도에 표시
      }
    });
  }

  // function handleMapMarker(position: { lat: number, lng: number }) {
  //   setState(() => ({
  //     center: position,
  //     errMsg: null,
  //     isLoading: false
  //   }));
  // }
  
  return (
    <div className={styles.container}>
      {/* 지도를 표시할 container */}
      <Map
        center={{ lat: state.center.lat, lng: state.center.lng }} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도의 크기
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
        onClick={handleMapClick}
      >
        <ZoomControl position={"RIGHT"} />
        <MapMarker position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}>
          {/* <div style={{color:"#000"}}>Hello World!</div> */}
        </MapMarker>
        {!state.isLoading && (
          <MapMarker position={state.center} />
        )}
        {
          markers.map((marker, index) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              // onClick={() => handleMapMarker(marker.position)}
            >
              {search && marker.content && (<div className={styles.name}><span className={styles.number}>{index+1}</span><strong>{marker.content}</strong></div>) }
            </MapMarker>
          ))
        }
      </Map>
      <button className={styles["button-current"]} type="button" onClick={getCurrentLocation}></button>
    </div>
  );
}