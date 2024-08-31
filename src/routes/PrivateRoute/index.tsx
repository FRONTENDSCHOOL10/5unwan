import { Navigate, Outlet } from "react-router-dom";
import { AuthModel } from "pocketbase";
import { Spinner } from "@/components/Spinner";
import { useCurrentUserQuery } from "@/hooks/user";

export type UserContext = {
  user: AuthModel;
};

export default function PrivateRoute() {
  const { isLoading, user } = useCurrentUserQuery();
  return isLoading ? (
    <Spinner />
  ) : user ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/login" />
  );
}
