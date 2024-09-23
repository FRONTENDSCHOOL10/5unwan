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

export default function ExerciseType({ user } :userProps) {
  console.log(user);
  const { isActive, setIsActive, exercises, setFiltered } = homeStore();
  // const typeList = [...new Set(exercises.map((exercise) => exercise.type))];
  const [newTypeList, setNewTypeList] = useState<string[]>([]);
  // types을 정렬하여 interests[0]이 있는 경우 맨 앞으로 이동
  function sortTypeList() {
    const typeList = [...new Set(exercises.map((exercise) => exercise.type))];
    if (user.interests[0] && typeList.includes(user.interests[0])) {
      const index = typeList.indexOf(user.interests[0]);
      const [interestType] = typeList.splice(index, 1); // 해당 타입을 제거하고 반환
      typeList.unshift(interestType); // 해당 타입을 맨 앞에 추가
    }
    setNewTypeList(typeList); // 정렬된 리스트를 상태에 저장
  }

  useEffect(() => {
    sortTypeList();
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
        {newTypeList.map((type, index) => (
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
