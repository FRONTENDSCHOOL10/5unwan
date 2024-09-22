import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep } from "@/utils/onboarding";

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep === "done") {
    return <Outlet context={{ user }} />;
  } else {
    return <Navigate to="/onboarding/resume" />;
  }
}

Component.displayName = "OnboardedRouteRoute";
