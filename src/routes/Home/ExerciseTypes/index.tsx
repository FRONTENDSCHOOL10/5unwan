import { useEffect } from 'react';
import homeStore from '@/stores/homeStore';
import styles from "./exerciseTypes.module.css";
import { getExercise } from '@/api/pocketbase';

function getTypes(type: string) {
  switch (type) {
    case "fitness":
      return "헬스";
    case "yoga":
      return "요가";
    case "badminton":
      return "배드민턴";
    case "climbing":
      return "클라이밍";
    case "tennis":
      return "테니스";
    case "running":
      return "런닝";
    default:
      return "기타";
  }
}

export default function ExerciseType() {
  const { isActive, setIsActive, exercises, setFiltered } = homeStore();
  const typeList = [...new Set(exercises.map((exercise) => exercise.type))];

  async function handleList(type: string) {
    if (type) {
      try {
        const data = await getExercise(type);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setFiltered("");
    }
  }
  const handleClick = (type: string) => {
    handleList(type);
    setIsActive(type === "" ? "" : type);
  };

  return (
    <>
      <ul className={`${styles["exercise-type-list"]} no-scroll`}>
        <li
          className={`${styles["exercise-type-item"]} ${
            isActive === "" ? styles["is-active"] : ""
          }`}
          onClick={() => handleClick("")}
        >
          전체
        </li>
        {typeList.map((type, index) => (
          <li
            key={index}
            className={`${styles["exercise-type-item"]} ${
              isActive === type ? styles["is-active"] : ""
            }`}
            onClick={() => handleClick(type)}
          >
            {getTypes(type)}
          </li>
        ))}
      </ul>
    </>
  );
}
