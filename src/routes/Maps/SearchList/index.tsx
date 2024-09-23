import mapStore from "@/stores/mapStore";
import styles from "./searchList.module.css";

export default function SearchList() {
  const { markers, bookmarkList, toggleBookmark, isDropDown, setIsDropDown, setState, map } = mapStore();

  function handleClickBar() {
    setIsDropDown(!isDropDown);
  }

  function handleMapMarker(position: { lat: number, lng: number }) {
    const currentPos = new window.kakao.maps.LatLng(
      position.lat,
      position.lng
    );
    setState(() => ({
      center: position,
      errMsg: null,
      isLoading: false,
      showCurrentLocationOnly: false,
    }));
    map.panTo(currentPos);
  }

  return (
    <div className={`no-scroll ${styles.container} ${isDropDown ? styles["is-hide"] : ""}`}>
      <span className={styles.bar} onClick={handleClickBar}></span>
      <ul className={styles["result-list"]}>
        {
          markers.length > 0 ? (
            markers.map((marker, index) => (
              <li key={index} className={styles["result-items"]}>
                <div className={styles.content} onClick={() => handleMapMarker(marker.position) }>
                  <h2 className={styles.title}>{marker.content}</h2>
                  <p className="ellipsis">{marker.address || "주소를 가져오는 중..."}</p>
                </div>
                <span className={styles.number}>{index + 1}</span>
                <button
                  type="button"
                  className={`${styles.favorite} ${
                    bookmarkList.some((bm) => bm.content === marker.content) ? styles["is-active"] : ""
                  }`}
                  onClick={() => toggleBookmark(marker)}
                ></button>
              </li>
            ))
          ) : (
            <li>검색 결과가 없습니다.</li>
          )
        }
      </ul>
    </div>
  );
}