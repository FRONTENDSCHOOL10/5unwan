import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { interestOptions, ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useId, useState } from "react";
import styles from "./style.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";
import SVGIcon from "@/components/SVGicon";

export type OnboardingInterestsFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
};

// interestOptions의 타입을 기반으로 한 labels 정의
const interestLabels: Record<string, string> = {
  fitness: "헬스",
  running: "런닝",
  yoga: "요가",
  pilates: "필라테스",
  "sport-climbing": "클라이밍",
  etc: "기타",
};

export function OnboardingInterestsForm({
  onSuccess,
  user,
  currentStep,
}: OnboardingInterestsFormProps) {
  const id = useId();
  const [formData, setFormData] = useState<Record<string, boolean>>(() => {
    return (user.interests || []).reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {} as Record<string, boolean>);
  });

  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const interests = Object.keys(formData).filter(key => formData[key]);

    const userValues = {
      interests,
    };

    await updateMutation.mutateAsync(
      { userId: user.id, userValues },
      { onSuccess }
    );
  };

  const handleUpdateFormData = (name: string, checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <section className={styles.content}>
          <PageTitle text="관심있는 운동을 선택해 주세요." />
          <section className={styles["input-group"]}>
            {interestOptions.map((interestOption) => {
              return (
                <div key={interestOption}>
                  <input
                    id={`${id}-${interestOption}`}
                    name={interestOption}
                    type="checkbox"
                    checked={formData[interestOption] || false}
                    onChange={(e) => handleUpdateFormData(interestOption, e.target.checked)}
                    className={styles.hiddenInput}
                  />
                  <div
                    className={styles["image-box"]}
                    onClick={() => handleUpdateFormData(interestOption, !formData[interestOption])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateFormData(interestOption, !formData[interestOption]);
                      }
                    }}
                  >
                    <img src={`/image/interests-img-${interestOption}.jpg`} alt={interestLabels[interestOption]} />
                    {formData[interestOption] && (
                      <span className={styles["icon-box"]}>
                        <SVGIcon width={50} height={50} iconId="iconCheck" />
                      </span>
                    )}
                  </div>
                  <p className={"body-md-medium"}>{interestLabels[interestOption]}</p>
                </div>
              );
            })}
          </section>

          <PrimaryLargeButton
            type="submit"
            disabled={
              Object.keys(formData).length === 0 || updateMutation.isPending
            }
          >
            {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
          {updateMutation.isError
            ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
            : null}
        </section>
      </div>
    </form>
  );
}
