import useMapStore from '@/stores/mapStore';
import styles from './searchList.module.css';

// interface SearchListProps {
//   markers: {
//     position: { lat: number, lng: number },
//     content: string,
//     address?: string,
//   }[];
// }

export default function SearchList() {
  const mapStore = useMapStore();
  const setState = mapStore.setState;
  const markers = mapStore.markers;
  const setSelectedMarkerContent = mapStore.setSelectedMarkerContent;

  function handleMapMarker(position: { lat: number, lng: number }, content: string) {
    setState(() => ({
      center: position,
      errMsg: null,
      isLoading: false
    }));
    setSelectedMarkerContent(content);
  }

  return (
    <div className={`${styles.container} no-scroll`}>
      <ul className={styles["result-list"]}>
        {
          markers.length > 0 ? (
          markers.map((marker, index) => (
            <li
              key={index}
              className={styles["result-items"]}
            >
              <div className={styles.content} onClick={() => handleMapMarker(marker.position, marker.content)}>
                <h2 className={styles.title}>{marker.content}</h2>
                <p className="ellipsis">{marker.address || '주소를 가져오는 중...'}</p>
              </div>
              <span className={styles.number}>{index + 1}</span>
              <button type="button" className={`${styles.favorite} ${styles["is-active"]}`}></button>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  )
}