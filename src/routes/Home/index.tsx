import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { logout } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Home() {
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

  return (
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
  );
}
