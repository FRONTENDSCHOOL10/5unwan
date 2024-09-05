import { useState, useEffect } from 'react'
import { getExercises, logout } from '@/api/pocketbase'
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { UserContext } from "@/routes/PrivateRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Exercise {
  id: string;
  type: string;
  title: string;
  img_url: string;
  link: string;
}

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
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

  console.log(exercises);

  return (
    <>
      <div>
        <p>현재 사용자: {user?.email}</p>
        <br />
        <button onClick={async () => {
          await logoutMutation.mutateAsync();
        }}>
          로그아웃
        </button>
      </div>
      <ul>
        {
          exercises.map((exercise) => (
            <li key={ exercise.id }>{ exercise.type }</li>
          ))
        }
      </ul>
      {
        exercises.map((exercise) => (
          <Link to={exercise.link}>
            <img src={exercise.img_url} alt="" />
            <h3>{ exercise.title}</h3>
          </Link>
        ))

      }
    </>
  )
}
