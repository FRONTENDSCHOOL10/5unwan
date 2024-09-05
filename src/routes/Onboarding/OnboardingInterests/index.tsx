import { UserContext } from "@/routes/PrivateRoute";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OnboardingInterestsForm } from "@/routes/Onboarding/OnboardingInterests/OnboardingInterestsForm";
import { ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardingInterests() {
  const { user } = useOutletContext<UserContext>();
  const currentRoute = location.pathname.toLowerCase();
  const currentStep = ONBOARDING_STEPS.indexOf(currentRoute);
  const navigate = useNavigate();
  return (
    <div>
      <OnboardingInterestsForm
        onSuccess={() => {
          currentStep === ONBOARDING_STEPS.length - 1
            ? navigate("/onboarding/done")
            : navigate(ONBOARDING_STEPS[currentStep + 1]);
        }}
        user={user}
        currentStep={currentStep}
      />
    </div>
  );
}
