import { kakaoSignUpOrLogin as kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/routes/Login/LoginForm";
export default function Login() {
  const navigate = useNavigate();
  const kakaoSignUpOrLoginMutation = useMutation({
    mutationFn: kakaoSignUpOrLogin,
    onSuccess: () => {
      navigate("/");
    },
  });

  async function kakaoLogin() {
    await kakaoSignUpOrLoginMutation.mutateAsync();
  }

  return (
    <>
      <div>
        <LoginForm
          onSuccess={() => {
            navigate("/");
          }}
        />
        <button onClick={kakaoLogin}>카카오 로그인</button>
      </div>
    </>
  );
}
