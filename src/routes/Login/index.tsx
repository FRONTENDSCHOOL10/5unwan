import { kakaoSignUpOrLogin } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useMatches } from "react-router-dom";
import { LoginForm } from "@/routes/Login/LoginForm";
import { RouteHandle } from "@/router";
import Header from "@/components/Header";

export default function Login() {
  const navigate = useNavigate();
  const matches = useMatches();
  
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );

  const kakaoSignUpOrLoginMutation = useMutation({
    mutationFn: kakaoSignUpOrLogin,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  async function kakaoLogin() {
    await kakaoSignUpOrLoginMutation.mutateAsync();
  }

  return (
    <>
      {!hideHeader && (
        <Header
          leftIconId={"iconArrowsLeft"}
          leftIconVisible
          leftonClick={handleGoBack}
          rightIconVisible
        />
      )}
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
