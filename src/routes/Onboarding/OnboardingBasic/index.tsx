import { UserContext } from "@/routes/PrivateRoute";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OnboardingBasicForm } from "@/routes/Onboarding/OnboardingBasic/OnboardingBasicForm";
import { ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardingBasic() {
  const { user } = useOutletContext<UserContext>();
  const currentRoute = location.pathname.toLowerCase();
  const currentStep = ONBOARDING_STEPS.indexOf(currentRoute);
  const navigate = useNavigate();
  return (
    <div>
      <OnboardingBasicForm
        onSuccess={() => {
          navigate("/");
        }}
        user={user}
        currentStep={currentStep}
      />
    </div>
  );
}