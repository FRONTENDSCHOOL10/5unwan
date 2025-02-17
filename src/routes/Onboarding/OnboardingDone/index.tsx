import {  Navigate, useOutletContext } from "react-router-dom";
import { UserContext } from "@/routes/PrivateRoute";
import { getOnboardingStep, ONBOARDING_STEPS } from "@/utils/onboarding";
import PageTitle from "@/components/PageTitle";
import SVGIcon from "@/components/SVGicon";
import { SecondaryLargeButton } from '@/components/Buttons/SecondaryButton';
import styles from "./style.module.css"

export function Component() {
  const { user } = useOutletContext<UserContext>();
  const currentStep = getOnboardingStep(user);

  if (currentStep !== "done") {
    return <Navigate to={ONBOARDING_STEPS[currentStep]} />;
  } else {
    return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.content}>
            <span className={styles["icon-box"]}>
              <SVGIcon
                iconId="iconSignatureSmall"
                width={90}
                height={90}
                color="var(--grayscale-700)"
                />
            </span>
            <PageTitle
              text={{ __html: `${user?.nickname }의
              <br />
              회원가입이 완료되었습니다.
              <br />
              오늘도 득근득근!
              ` }}
            />
            <SecondaryLargeButton to="/">
              홈으로 가기
            </SecondaryLargeButton>
          </section>
        </div>
      </div>
    );
  }
}

Component.displayName = "OnboardingDoneRoute";
