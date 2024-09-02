import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";

export default function MyPage() {
  const { user } = useOutletContext<UserContext>();

  return (
    <div>
      <p>현재 사용자: {user?.nickname}</p>
      <br />
      <span>마이페이지</span>
    </div>
  );
}
