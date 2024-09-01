import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";

export default function Calendar() {
  const { user } = useOutletContext<UserContext>();

  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>캘린더</span>
    </div>
  );
}
