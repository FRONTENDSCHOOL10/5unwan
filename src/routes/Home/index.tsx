import { useState, useEffect } from "react";
import { getExercise, logout, Exercise } from "@/api/pocketbase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./home.module.css";
// > components
import UserInfo from '@/routes/Home/UserInfo';
import Article from '@/components/Article';
import ExerciseType from '@/components/ExerciseTypes';

import { useExercisesQuery } from "@/hooks/useExercisesQuery";

export default function Home() {
  const [filtered, setFiltered] = useState<Exercise[] | string>("");
  const [isActive, setIsActive] = useState<string>("");
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

  async function handleList(type: string) {
    if (type) {
      try {
        const data = await getExercise(type);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setFiltered("");
    }
  }

  const handleClick = (type: string) => {
    handleList(type);
    setIsActive(type === "" ? "" : type);
  };

  useEffect(() => {
    console.log(filtered);
  }, [filtered]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <p>현재 사용자: {user?.email}</p>
          <br />
          <button
            onClick={async () => {
              await logoutMutation.mutateAsync();
            }}
          >
            로그아웃
          </button>
        </div>
        <ExerciseType
          exercises={exercises}
          handleClick={handleClick}
          isActive={isActive}
        />
        <Article exercises={exercises} filtered={filtered} />
      </div>
    </>
  );
}
