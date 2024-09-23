import mapStore from "@/stores/mapStore";
import styles from "./searchTypes.module.css";

export function SearchTypes() {
  const { searchTypes, setSearch, setShowList } = mapStore();

  function handleTypeClick(e: React.MouseEvent<HTMLLIElement>) {
    const type = e.currentTarget.dataset.type;
    if (type) {
      setSearch(type);
      setShowList(true);
    }
  }

  return (
    <ul className={`${styles.wrapper} no-scroll`}>
      {
        searchTypes.map((type, index) => (
          <li key={index} onClick={handleTypeClick} data-type={type}>{type}</li>
        ))
      }
    </ul>
  )
} 