import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { interestOptions, ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useId, useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";

export type OnboardingInterestsFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
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

    const interests = Object.keys(formData);

    const userValues = {
      interests,
    };

    await updateMutation.mutateAsync(
      { userId: user.id, userValues },
      { onSuccess }
    );
  };

  const handleUpdateFormData: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, checked } = e.target;

    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, [name]: checked };
      } else {
        const formData = { ...prevFormData };
        delete formData[name];
        return formData;
      }
    });
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
                  <label htmlFor={`${id}-${interestOption}`}>
                    <h2 className="sr-only">관심 운동</h2>
                  </label>
                  <input
                    id={`${id}-${interestOption}`}
                    key={interestOption}
                    name={interestOption}
                    type="checkbox"
                    value={interestOption}
                    checked={formData[interestOption]}
                    onChange={handleUpdateFormData}
                  />
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
