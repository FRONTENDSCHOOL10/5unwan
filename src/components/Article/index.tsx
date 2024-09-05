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
      <div className={styles.container}>
          {
            exercises.map((exercise) => (
              <Link to={exercise.link} key={exercise.id} className={styles.article}>
                <img src={exercise.img_url} alt={exercise.title} />
                <h3 className="ellipsis">{exercise.title}</h3>
              </Link>
            ))
          }
        </div>
    </>
  )
}