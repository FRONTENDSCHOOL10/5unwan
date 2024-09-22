import { UserContext } from "@/routes/PrivateRoute";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OnboardingBasicForm } from "@/routes/Onboarding/OnboardingBasic/OnboardingBasicForm";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import styles from "./style.module.css"

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentRoute = location.pathname.toLowerCase();
  const currentStep = ONBOARDING_STEPS.indexOf(currentRoute);
  const navigate = useNavigate();
  return (
    <div className={styles["content-wrapper"]}>
      <OnboardingBasicForm
        onSuccess={() => {
          if (currentStep === ONBOARDING_STEPS.length - 1) {
            navigate("/onboarding/done");
          } else {
            navigate(ONBOARDING_STEPS[currentStep + 1]);
          }
        }}
        user={user}
        currentStep={currentStep}
      />
    </div>
  );
}

Component.displayname = "OnboardingBasicRoute";
