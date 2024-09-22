import mapStore from "@/stores/mapStore";
import styles from "./searchList.module.css";

export default function SearchList() {
  const { markers, bookmarkList, toggleBookmark } = mapStore();
  console.log(bookmarkList);

  return (
    <div className={`${styles.container}`}>
      <ul className={styles["result-list"]}>
        {markers.length > 0 ? (
          markers.map((marker, index) => (
            <li key={index} className={styles["result-items"]}>
              <div className={styles.content}>
                <h2 className={styles.title}>{marker.content}</h2>
                <p className="ellipsis">{marker.address || "주소를 가져오는 중..."}</p>
              </div>
              <span className={styles.number}>{index + 1}</span>
              <button
                type="button"
                className={`${styles.favorite} ${
                  bookmarkList.some((bm) => bm.content === marker.content) ? styles["is-active"] : ""
                }`}
                onClick={() => toggleBookmark(marker)}  // 마커 객체를 전달
              ></button>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}