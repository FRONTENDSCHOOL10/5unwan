import { initiateKakaoSignUp } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  async function kakaoLogin() {
    await initiateKakaoSignUp();
    navigate("/");
  }
  return (
    <>
      <div>
        <h1>득근득근^^_</h1>
        <div>
          <button onClick={kakaoLogin}>카카오로 시작하기</button>
        </div>
      </div>
    </>
  );
}
