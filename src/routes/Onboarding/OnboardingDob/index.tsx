import { UserContext } from "@/routes/PrivateRoute";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OnboardingDobForm } from "@/routes/Onboarding/OnboardingDob/OnboardingDobForm";
import { ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardingDob() {
  const { user } = useOutletContext<UserContext>();
  const currentRoute = location.pathname.toLowerCase();
  const currentStep = ONBOARDING_STEPS.indexOf(currentRoute);
  const navigate = useNavigate();
  return (
    <div>
      <OnboardingDobForm
        onSuccess={() => {
          navigate("/onboarding/height");
        }}
        user={user}
        currentStep={currentStep}
      />
    </div>
  );
}
