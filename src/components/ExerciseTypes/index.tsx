import styles from './exerciseTypes.module.css';
import { useState, useEffect } from 'react';

interface exerciseProps {
  exercises: {
    id: string;
    type: string;
  }[];
  handleList: (type: string) => void;
  handleClick: (type: string) => void;
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
  const [isActive, setIsActive] = useState<string>('');
  const typeList = [...new Set(exercises.map(exercise => exercise.type))];

  

  const handleClick = (type: string) => {
    handleList(type);
    if (type === '') {
      setIsActive('');
    } else {
      setIsActive(type);
    }
  }

    // 상태 변경을 감지하여 로그 출력
  useEffect(() => {
    console.log('activeType changed:', isActive);
  }, [isActive]);
  return (
    <>
      <ul className={`${styles["exercise-type-list"]} no-scroll`}>
        <li className={`${styles["exercise-type-item"]} ${isActive === '' ? styles["is-active"] : ''}`} onClick={() => handleClick('')}>
          전체
        </li>
        {
          typeList.map((type, index) => (
            <li key={index} className={`${styles["exercise-type-item"]} ${isActive === type ? styles["is-active"] : ''}`} onClick={() => handleClick(type)}>{getTypes(type)}</li>
          ))
        }
      </ul>
    </>
  )
}