import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getExercises } from "@/api/pocketbase";
import { useExercisesQuery } from "@/hooks/useExercisesQuery";
import styles from "./home.module.css";
import classNames from "classnames";
import homeStore from "@/stores/homeStore";
import UserInfo from "@/routes/Home/UserInfo";
import Article from "@/routes/Home/Article";
import ExerciseType from "@/routes/Home/ExerciseTypes";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

export function Component() {
  const { setExercises } = homeStore();
  const { user } = useOutletContext<UserContext>();
  const { exercises, isLoading } = useExercisesQuery();
  const { isDark } = useDarkMode();

  if (!isLoading) {
    console.log(exercises);
  }

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setExercises(data); // Store exercises in Zustand
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }

    fetchExercises();
  }, [setExercises]);

  return (
    <div className={classNames(styles.container, { [styles["is-dark"]]: isDark })}>
      <div className={styles.content}>
        <UserInfo user={user} />
        <ExerciseType user={user} />
        <Article />
      </div>
    </div>
  );
}

Component.displayName = "HomeRoute";
