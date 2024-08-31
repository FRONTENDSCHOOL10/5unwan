import { kakaoSignUpOrLogin as kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const kakaoSignUpOrLoginMutation = useMutation({
    mutationFn: kakaoSignUpOrLogin,
    onSuccess: () => {
      navigate("/");
    },
  });

  function kakaoLogin() {
    kakaoSignUpOrLoginMutation.mutate();
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
