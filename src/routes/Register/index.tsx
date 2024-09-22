import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import { RegisterForm } from "@/routes/Register/RegisterForm";
import Header from "@/components/Header";

export default function Register() {
  const navigate = useNavigate();
  const matches = useMatches();
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아감
  };

  return (
    <>
      {!hideHeader && (
      <Header
          leftIconId={"iconArrowsLeft"}
          leftIconVisible
          leftonClick={handleGoBack}
          // rightIconId={"iconArrowsRight"}
          rightIconVisible
        />)}
      <div>
        <RegisterForm
          onSuccess={() => {
            navigate("/onboarding");
          }}
        />
      </div>
    </>
  );
}
