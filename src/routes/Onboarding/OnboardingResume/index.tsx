import { Link, Navigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep === "done") {
    return <Navigate to="/onboarding/done" />;
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

Component.displayName = "OnboardingResumeRoute";
