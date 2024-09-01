import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { UserContext } from "../PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";

export default function OnboardingRoute() {
  const location = useLocation();
  const targetRoute = location.pathname.toLowerCase();
  const targetStep = ONBOARDING_STEPS.indexOf(targetRoute);
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep === "done" || currentStep >= targetStep) {
    return <Outlet context={{ user }} />;
  } else {
    return <Navigate to={ONBOARDING_STEPS[currentStep]} />;
  }
}
