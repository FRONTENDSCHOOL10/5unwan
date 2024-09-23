import homeStore from '@/stores/homeStore';
import styles from "./exerciseTypes.module.css";
import { User, getExercise } from '@/api/pocketbase';
import { useState, useEffect } from 'react';

interface userProps {
  user: User;
}

function getTypes(type: string) {
  switch (type) {
    case "fitness":
      return "헬스";
    case "yoga":
      return "요가";
    case "badminton":
      return "배드민턴";
    case "sport-climbing":
      return "클라이밍";
    case "tennis":
      return "테니스";
    case "running":
      return "런닝";
    default:
      return "기타";
  }
}

export default function ExerciseType({ user }: userProps) {
  const { isActive, setIsActive, exercises, setFiltered } = homeStore();
  const [newTypeList, setNewTypeList] = useState<string[]>([]);

  function sortTypeList() {
    const typeList = [...new Set(exercises.map((exercise) => exercise.type))];
    if (user.interests[0] && typeList.includes(user.interests[0])) {
      const index = typeList.indexOf(user.interests[0]);
      const [interestType] = typeList.splice(index, 1);
      typeList.unshift(interestType);
    }
    setNewTypeList(typeList);
  }
  
  useEffect(() => {
    sortTypeList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercises]);

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

  function handleTypeAllClick(type: string) {
    handleList(type);
    setIsActive(type === "" ? "" : type);
  }

  return (
    <ul className={`${styles["exercise-type-list"]} no-scroll`}>
      <li className={`${styles["exercise-type-item"]} ${isActive === "" ? styles["is-active"] : ""}`} onClick={() => handleTypeAllClick("")}>
        전체
      </li>
      {
        newTypeList.map((type, index) => (
          <li key={index} className={`${styles["exercise-type-item"]} ${isActive === type ? styles["is-active"] : ""}`} onClick={() => handleTypeAllClick(type)}>
            { getTypes(type) }
          </li>
        ))
      }   
    </ul>
  );
}
