import { Link, Navigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep !== "done") {
    return <Navigate to={ONBOARDING_STEPS[currentStep]} />;
  } else {
    return (
      <div>
        <h1>
          홍길동님의 회원가입이 완료되었습니다.
          <br />
          오늘도 득근득근!
        </h1>
        <Link to="/">홈으로 가기</Link>
      </div>
    );
  }
}

Component.displayName = "OnboardingDoneRoute";
