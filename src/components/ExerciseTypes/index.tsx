import styles from './exerciseTypes.module.css';

interface exerciseProps {
  exercises: {
    id: string;
    type: string;
  }[];
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

export default function ExerciseType({ exercises }: exerciseProps) {
  return (
    <>
      <ul className={`${styles["exercise-type-list"]} no-scroll`}>
        <li className={`${styles["exercise-type-item"]} ${styles["is-active"]}`}>
          전체
        </li>
        {
          exercises.map((exercise) => (
            <li key={exercise.id} className={styles["exercise-type-item"]}>{getTypes(exercise.type)}</li>
          ))
        }
      </ul>
    </>
  )
}