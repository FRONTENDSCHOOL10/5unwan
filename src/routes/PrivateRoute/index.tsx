import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/hooks/user";
import { User } from "@/api/pocketbase";
import { SpinnerPortal } from "@/components/SpinnerPortal";

export type UserContext = {
  user: User;
};

export function Component() {
  const { isLoading, user } = useCurrentUser();
  return isLoading ? (
    <SpinnerPortal />
  ) : user ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/start" />
  );
}

Component.displayName = "PrivateRouteRoute";
