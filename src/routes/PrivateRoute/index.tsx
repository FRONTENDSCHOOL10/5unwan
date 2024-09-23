import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useCurrentUser } from "@/hooks/user";
import { User } from "@/api/pocketbase";

export type UserContext = {
  user: User;
};

export function Component() {
  const { isLoading, user } = useCurrentUser();
  return isLoading ? (
    <Spinner />
  ) : user ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/start" />
  );
}

Component.displayName = "PrivateRouteRoute";
