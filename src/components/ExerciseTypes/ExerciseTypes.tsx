import styles from './exerciseTypes.module.css';

interface exerciseProps {
  exercises: {
    id: string;
    type: string;
  }[];
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
            <li key={ exercise.id } className={styles["exercise-type-item"]}>{ exercise.type }</li>
          ))
        }
      </ul>
    </>
  )
}