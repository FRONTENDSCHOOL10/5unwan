import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";

export default function Home() {
  const { user } = useOutletContext<UserContext>();

  return <div>현재 사용자: {user?.email}</div>;
}
