import { useEffect } from "react";
import { logout } from "@/api/pocketbase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./home.module.css";
// > components
import UserInfo from "@/routes/Home/UserInfo";
import Article from "@/routes/Home/Article";
import ExerciseType from "@/routes/Home/ExerciseTypes";
import { getExercises } from "@/api/pocketbase";
import homeStore from "@/stores/homeStore";
import { useExercisesQuery } from "@/hooks/useExercisesQuery";

export default function Home() {
  const { setExercises } = homeStore();
  const { user } = useOutletContext<UserContext>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess() {
      queryClient.clear();
      navigate("/login");
    },
  });

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
        <div className="sr-only">
          <p>현재 사용자: {user?.email}</p>
          <br />
          <button onClick={async () => { await logoutMutation.mutateAsync() }}>로그아웃</button>
        </div>
        <UserInfo user={user} />
        <ExerciseType />
        <Article />
      </div>
    </>
  );
}
