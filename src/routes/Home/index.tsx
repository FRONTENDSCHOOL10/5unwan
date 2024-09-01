import { useNavigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { logout } from "@/api/pocketbase";

export default function Home() {
  const { user } = useOutletContext<UserContext>();
  const navigate = useNavigate();
  return (
    <div>
      <p>현재 사용자: {user?.email}</p>
      <br />
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
