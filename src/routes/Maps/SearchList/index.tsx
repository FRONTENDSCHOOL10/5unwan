import styles from './searchList.module.css';

interface SearchListProps {
  markers: {
    position: { lat: number, lng: number },
    content: string,
    address?: string,
  }[];
  setState: React.Dispatch<React.SetStateAction<{
    center: { lat: number; lng: number };
    errMsg: string | null;
    isLoading: boolean;
  }>>;
}

export default function SearchList({ markers, setState }: SearchListProps) {
  function handleMapMarker(position: { lat: number, lng: number }) {
    setState(() => ({
      center: position,
      errMsg: null,
      isLoading: false
    }));
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
              <div className={styles.content} onClick={() => handleMapMarker(marker.position)}>
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