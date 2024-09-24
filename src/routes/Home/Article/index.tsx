import { Link } from "react-router-dom";
import styles from "./article.module.css";
import homeStore from "@/stores/homeStore";
import classNames from "classnames";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

export default function Article() {
  const { filtered, exercises } = homeStore();
  const { isDark } = useDarkMode();

  const displayExercises =
    typeof filtered === "object" && "items" in filtered
      ? filtered.items
      : exercises;
  
    return (
      <section className={classNames(styles.container, { [styles["is-dark"]]: isDark })}>
      {
          displayExercises.map((article) => (
            <div key={article.id} className={styles.article}>
              <Link to={article.link} key={article.id} className={styles.article}>
                <div className={styles["img-wrapper"]}>
                  <img src={article.img_url} alt={article.title} />
                </div>
                <h2 className={`ellipsis body-lg-bold ${styles.title}`}>{article.title}</h2>
              </Link>
            </div>
          ))
        }
      </section>
  );
}
