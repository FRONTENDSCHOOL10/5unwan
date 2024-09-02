import { useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { useUser } from "@/hooks/user";

export default function MyPage() {
  const { user, isLoading, isError, logout } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      <p>현재 사용자: {user?.nickname || "알 수 없음"}</p>
      <br />
      <span>마이페이지</span>
      <br />
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

