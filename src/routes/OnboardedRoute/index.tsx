import { Link, Outlet, useOutletContext } from "react-router-dom";
import { UserContext } from "../PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardedRoute() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep === "done") {
    return <Outlet context={{ user }} />;
  } else {
    return (
      <div>
        <h1>
          회원가입 시 등록되지 않은 정보가 있으므로 해당 페이지로 이동합니다.
        </h1>
        <Link to={ONBOARDING_STEPS[currentStep]}>확인</Link>
      </div>
    );
  }
}
