import styles from './searchList.module.css';

interface SearchListProps {
  markers: {
    position: { lat: number, lng: number },
    content: string
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
    <div className={styles.container}>
      <h3>검색 결과</h3>
      <ul>
        {
          markers.length > 0 ? (
          markers.map((marker, index) => (
            <li
              key={index}
              onClick={() => handleMapMarker(marker.position)}
            >
              <h3>{index + 1}</h3>
              <p>{marker.content}</p>
            </li>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </ul>
    </div>
  )
}