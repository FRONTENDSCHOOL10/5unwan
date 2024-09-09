import { Link } from 'react-router-dom';
import styles from "./article.module.css";

interface exerciseProps {
  exercises: {
    id: string;
    title: string;
    img_url: string;
    link: string;
  }[];
}

export default function Article({ exercises }:exerciseProps) {
  return (
    <>
      <section className={styles.wrapper}>
      {
        exercises.map((exercise) => (
          <Link to={exercise.link} id={exercise.id} className={styles.article}>
            <div className={styles["img-wrapper"]}>
              <img src={exercise.img_url} alt="" />
            </div>            
            <h2 className="ellipsis">{exercise.title}</h2>
          </Link>
        ))
      }
      </section>
    </>
  )
}