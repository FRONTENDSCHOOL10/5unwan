import styles from './exerciseTypes.module.css';
import { useState } from 'react';

interface exerciseProps {
  exercises: {
    id: string;
    type: string;
  }[];
  handleList: (type: string) => void;
}

function getTypes(type:string) {
  switch (type) {
    case 'fitness':
      return '헬스';
    case 'yoga':
      return '요가';
    case 'badminton':
      return '배드민턴';
    case 'climbing':
      return '클라이밍';
    case 'tennis':
      return '테니스';
    case 'running':
      return '런닝';
    default:
      return '기타';
  }
}

export default function ExerciseType({ exercises, handleList }: exerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const typeList = [...new Set(exercises.map(exercise => exercise.type))];

  const handleClick = (type: string) => {
    handleList(type)
  }
  return (
    <>
      <ul className={`${styles["exercise-type-list"]} no-scroll`}>
        <li className={`${styles["exercise-type-item"]} ${styles["is-active"]}`} onClick={() => handleList('')}>
          전체
        </li>
        {
          typeList.map((type, index) => (
            <li key={index} className={`${styles["exercise-type-item"]} ${isActive ? `${styles["is-active"]}` : ''}`} onClick={() => handleClick(type)}>{getTypes(type)}</li>
          ))
        }
      </ul>
    </>
  )
}