import { Link } from 'react-router-dom';
import styles from "./article.module.css";

interface exerciseProps {
  id: string;
  title: string;
  img_url: string;
  link: string;
}

interface articleProps {
  exercises: exerciseProps[];
  filtered: exerciseProps[] | { items: exerciseProps[] } | string; // filtered는 items 배열을 포함한 객체 또는 string
}

export default function Article({ exercises, filtered }: articleProps) {
  const displayExercises = typeof filtered === 'object' && 'items' in filtered ? filtered.items : exercises;
  return (
    <>
      <section className={styles.wrapper}>
        {displayExercises.map((article :exerciseProps) => (
          <div key={article.id} className={styles.article}>
            <Link to={article.link} key={article.id} className={styles.article}>
                <div className={styles["img-wrapper"]}>
                  <img src={article.img_url} alt="" />
                </div>            
                <h2 className="ellipsis">{article.title}</h2>
              </Link>
          </div>
        ))}
      </section>
    </>
  );
}