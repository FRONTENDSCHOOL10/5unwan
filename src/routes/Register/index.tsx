import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import { RegisterForm } from "@/routes/Register/RegisterForm";
import Header from "@/components/Header";

export function Component() {
  const navigate = useNavigate();
  const matches = useMatches();
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );
  const handleGoBack = () => {
    navigate(-1);
  };

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
        <RegisterForm
          onSuccess={() => {
            navigate("/onboarding");
          }}
        />
      </div>
    </>
  );
}

Component.displayName = "RegisterRoute";
