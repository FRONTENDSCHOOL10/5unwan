import { currentUser, logout } from "@/api/pocketbase";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCurrentUserQuery() {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: currentUser,
    onError: (error) => {
      console.error("Failed to fetch current user:", error);
    },
  });

  return { user: query.data, ...query };
}

export function useUser() {
  const navigate = useNavigate();
  const { user, isLoading, isError } = useCurrentUserQuery();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { user, isLoading, isError, logout: handleLogout };
}
