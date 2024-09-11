import { Link } from "react-router-dom";
import styles from "./article.module.css";
import { Exercise } from "@/api/pocketbase";

interface articleProps {
  exercises: Exercise[];
  filtered: Exercise[] | { items: Exercise[] } | string; // filtered는 items 배열을 포함한 객체 또는 string
}

export default function Article({ exercises, filtered }: articleProps) {
  const displayExercises =
    typeof filtered === "object" && "items" in filtered
      ? filtered.items
      : exercises;
  return (
    <>
      <section className={styles.wrapper}>
        {displayExercises.map((article: Exercise) => (
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
