import { User } from "@/api/pocketbase";

export const ONBOARDING_STEPS = [
  "/onboarding/basic",
  "/onboarding/dob",
  "/onboarding/height",
  "/onboarding/weight",
  "/onboarding/interests",
];

export function getOnboardingStep(user: User) {
  if (!user.nickname || !user.gender) {
    return ONBOARDING_STEPS.indexOf("/onboarding/basic");
  } else if (!user.dob) {
    return ONBOARDING_STEPS.indexOf("/onboarding/dob");
  } else if (!user.height) {
    return ONBOARDING_STEPS.indexOf("/onboarding/height");
  } else if (!user.weight) {
    return ONBOARDING_STEPS.indexOf("/onboarding/weight");
  } else if (!user.interests || user.interests.length === 0) {
    return ONBOARDING_STEPS.indexOf("/onboarding/interests");
  } else {
    return "done";
  }
}

export const interestOptions = [
  "fitness",
  "running",
  "yoga",
  "pilates",
  "sport-climbing",
  "etc",
];
