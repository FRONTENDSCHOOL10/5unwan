import { Link } from "react-router-dom";
import styles from "./article.module.css";
import homeStore from "@/stores/homeStore";

export default function Article() {
  const { filtered, exercises } = homeStore();
  const displayExercises =
    typeof filtered === "object" && "items" in filtered
      ? filtered.items
      : exercises;
  return (
    <>
      <section className={styles.wrapper}>
        {displayExercises.map((article) => (
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