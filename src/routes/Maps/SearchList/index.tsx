import mapStore from "@/stores/mapStore";
import styles from "./searchList.module.css";
import classNames from "classnames";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

export default function SearchList() {
  const { isDark } = useDarkMode();
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
    <div className={classNames(styles.container, { [styles["is-dark"]]: isDark })}>
      <div className={`no-scroll ${styles.wrapper} ${isDropDown ? styles["is-hide"] : ""}`}>
        <div className={classNames(styles.content)}>
          <span className={styles.bar} onClick={handleClickBar}></span>
          <ul className={styles["result-list"]}>
            {
              markers.length > 0 ? (
                markers.map((marker, index) => (
                  <li key={index} className={styles["result-items"]}>
                    <div className={styles.content} onClick={() => handleMapMarker(marker.position) }>
                      <h2 className={`${styles.title} body-md-bold`}>{marker.content}</h2>
                      <p className="ellipsis">{marker.address || "주소를 가져오는 중..."}</p>
                    </div>
                    <span className={`${styles.number} body-sm-bold`}>{index + 1}</span>
                    <button
                      type="button"
                      className={`${styles.favorite} ${
                        bookmarkList.some((bm) => bm.content === marker.content) ? styles["is-active"] : ""
                      }`}
                      onClick={() => toggleBookmark(marker)}
                    >
                      {/* <SVGIcon iconId="iconFavorite" width={20} height={20} /> */}
                    </button>
                  </li>
                ))
              ) : (
                <li>검색 결과가 없습니다.</li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}