import { Navigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";
import styles from "./onBoardingResume.module.css";
import Header from "@/components/Header";
import {PrimaryLargeButton} from "@/components/Buttons/PrimaryButton";

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep === "done") {
    return <Navigate to="/onboarding/done" />;
  } else {
    return (
      <>
        <Header className={styles["header-resume"]} />
        <div className={styles.container}>
          <h1 className={`${styles.title} body-xl-bold`}>
            회원가입 시 <br />
            등록되지 않은 정보가 <br />
            있으므로 해당 페이지로 <br />
            이동합니다.
          </h1>
          <PrimaryLargeButton to={ONBOARDING_STEPS[currentStep]}>확인</PrimaryLargeButton>
        </div>
      </>
    );
  }
}

Component.displayName = "OnboardingResumeRoute";
