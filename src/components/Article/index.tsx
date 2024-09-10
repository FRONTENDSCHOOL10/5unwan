import { Link } from 'react-router-dom';
import styles from "./article.module.css";

interface exerciseProps {
  filtered: {
    length: number;
    items: {
      id: string;
      title: string;
      img_url: string;
      link: string;
    }[]
  };
  exercises: {
    id: string;
    title: string;
    img_url: string;
    link: string;
  }[];

}

export default function Article({ exercises, filtered }: exerciseProps) {
  const displayExercises = filtered && filtered.items ? filtered.items : exercises;

  return (
    <>
      <section className={styles.wrapper}>
        {displayExercises.map((exercise) => (
          <div key={exercise.id} className={styles.article}>
            <Link to={exercise.link} key={exercise.id} className={styles.article}>
                <div className={styles["img-wrapper"]}>
                  <img src={exercise.img_url} alt="" />
                </div>            
                <h2 className="ellipsis">{exercise.title}</h2>
              </Link>
          </div>
        ))}
      </section>
    </>
  );
}