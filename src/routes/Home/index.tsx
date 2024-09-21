import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getExercises } from "@/api/pocketbase";
import { useExercisesQuery } from "@/hooks/useExercisesQuery";
import styles from "./home.module.css";
import homeStore from "@/stores/homeStore";
// > components
import UserInfo from "@/routes/Home/UserInfo";
import Article from "@/routes/Home/Article";
import ExerciseType from "@/routes/Home/ExerciseTypes";

export default function Home() {
  const { setExercises } = homeStore();
  const { user } = useOutletContext<UserContext>();
  const { exercises, isLoading } = useExercisesQuery();

  // TODO: loading 보여주기,, spinner?  */
  if (!isLoading) {
    console.log(exercises);
  }
  
  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises();
        setExercises(data);  // Store exercises in Zustand
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    }

    fetchExercises();
  }, [setExercises]); 

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <UserInfo user={user} />
          <ExerciseType />
          <Article />
        </div>
      </div>
    </>
  );
}
