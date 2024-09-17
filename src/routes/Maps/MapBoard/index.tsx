import useMapStore from '@/stores/mapStore';
import styles from './mapBoard.module.css';
// import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { Map, MapMarker } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapBoardProps {
  // markers: {
  //   position: { lat: number, lng: number },
  //   content: string
  // }[];
  map: any;
  setMap?: (map: any) => void;
}

export default function MapBoard({ map, setMap }: MapBoardProps) {
  const mapStore = useMapStore();
  const defaultLocation = mapStore.defaultLocation;
  const state = mapStore.state;
  // const setState = mapStore.setState;
  const markers = mapStore.markers;
  const selectedMarkerContent = mapStore.selectedMarkerContent;
  // const map = mapStore.map;
  // const setMap = mapStore.setMap;
  console.log(state.isLoading);
  console.log(markers);

  // function getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(
  //       (position: GeolocationPosition) => {
  //         setState((prev) => ({
  //           ...prev,
  //           center: {
  //             lat: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //           isLoading: false,
  //         }));
  //       },
  //       (err: GeolocationPositionError) => {
  //         setState((prev) => ({
  //           ...prev,
  //           errMsg: err.message,
  //           isLoading: false,
  //         }));
  //       }
  //     )
  //   } else {
  //     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  //     setState((prev) => ({
  //       ...prev,
  //       errMsg: "geolocation을 사용할 수 없어요.",
  //       isLoading: false,
  //     }));
  //   }
  // }
  // Kakao Maps Service 객체와 인포윈도우를 선언
  const geocoder = new kakao.maps.services.Geocoder();
  const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  // 좌표로부터 상세 주소를 가져오는 함수
  function searchDetailAddrFromCoords(coords: any, callback: any) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  function handleCurrentLocation(mouseEvent: any) {
    const latLng = mouseEvent.latLng;

    // 좌표를 바탕으로 상세 주소 요청
    searchDetailAddrFromCoords(latLng, function(result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const RoadNameAddress = result[0].road_address ? `도로명 주소: ${result[0].road_address.address_name}` : '';
        const lotNumberAddress = `지번 주소: ${result[0].address.address_name}`;
        const content = `
          <div style="padding:5px;">
            <div>법정동 주소정보:</div>
            <div>${RoadNameAddress}</div>
            <div>${lotNumberAddress}</div>
          </div>
        `;

        // 클릭한 위치에 마커를 표시하고 인포윈도우를 엽니다.
        const marker = new kakao.maps.Marker({
          position: latLng
        });
        marker.setMap(map);  // 마커를 지도에 표시

        infoWindow.setContent(content);  // 인포윈도우에 주소를 표시
        infoWindow.open(map, marker);  // 인포윈도우를 지도에 표시
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* 지도를 표시할 container */}
      <Map
        center={ { lat: defaultLocation.lat, lng: defaultLocation.lng } } // 지도의 중심 좌표
        // center={state.center} // 지도의 중심 좌표
        style={{ width: "100vw", height: "100vh" }} // 지도의 크기
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {/* <ZoomControl position={"RIGHT"} /> */}
        {
          state.isLoading
            ?
          <MapMarker
            position={{ lat: defaultLocation.lat, lng: defaultLocation.lng }}
          >
            <div style={{ color: "#000" }}>📌멋쟁이사자처럼</div> 
          </MapMarker>
            :
          <MapMarker position={{ lat: state.center.lat, lng: state.center.lng }}>
            <div style={{ color: "#000", width: "100%", whiteSpace: "nowrap", overflow: "hidden"}}>📌{selectedMarkerContent}</div>
          </MapMarker>
        }
      </Map>
      <button className={styles["button-current"]} type="button" onClick={handleCurrentLocation}></button>
    </div>
  );
}