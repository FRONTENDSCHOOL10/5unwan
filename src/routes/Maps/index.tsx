import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";

export default function Maps() {
  const { user } = useOutletContext<UserContext>();

  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>지도</span>
    </div>
  );
}
