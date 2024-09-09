import { useState, useEffect } from 'react'
import { getExercises, getExercise, logout } from '@/api/pocketbase'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserContext } from "@/routes/PrivateRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from './home.module.css';
// > components
import Article from '@/components/Article';
import ExerciseType from '@/components/ExerciseTypes';
interface exerciseProps {
  id: string;
  type: string;
  title: string;
  img_url: string;
  link: string;
}

export default function Home() {
  const [exercises, setExercises] = useState<exerciseProps[]>([]);
  const [filtered, setFiltered] = useState<exerciseProps[]>([]);
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

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExercises();
  }, []);

  async function handleList(type: string) {
    if (type) {
      try {
        const data = await getExercise(type);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setFiltered([]);
    }
  }

  useEffect(() => {
    console.log(filtered);
  }, [filtered]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <p>현재 사용자: {user?.email}</p>
          <br />
          <button onClick={async () => {
            await logoutMutation.mutateAsync();
          }}>
            로그아웃
          </button>
        </div>
        <ExerciseType exercises={exercises} handleList={handleList} />
        <Article exercises={exercises} filtered={filtered} />
      </div>
    </>
  );
}
