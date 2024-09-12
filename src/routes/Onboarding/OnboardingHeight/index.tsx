import { UserContext } from "@/routes/PrivateRoute";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OnboardingHeightForm } from "@/routes/Onboarding/OnboardingHeight/OnboardingHeightForm";
import { ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardingHeight() {
  const { user } = useOutletContext<UserContext>();
  const currentRoute = location.pathname.toLowerCase();
  const currentStep = ONBOARDING_STEPS.indexOf(currentRoute);
  const navigate = useNavigate();
  return (
    <div>
      <OnboardingHeightForm
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
