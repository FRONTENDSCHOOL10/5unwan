import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
  useNavigate,
  useMatches,
} from "react-router-dom";
import { RouteHandle } from "@/router";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";
import Header from "@/components/Header";

export default function OnboardingRoute() {
  const location = useLocation();
  const targetRoute = location.pathname.toLowerCase();
  const targetStep = ONBOARDING_STEPS.indexOf(targetRoute);
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);
  const navigate = useNavigate();
  const matches = useMatches();
  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  if (currentStep === "done" || currentStep >= targetStep) {
    return (
      <>
        {!hideHeader && (
          <Header
            leftIconId={"iconArrowsLeft"}
            leftIconVisible
            leftonClick={handleGoBack}
            rightIconVisible
          />
        )}
        <Outlet context={{ user }} />
      </>
    );
  } else {
    return <Navigate to={ONBOARDING_STEPS[currentStep]} />;
  }
}
