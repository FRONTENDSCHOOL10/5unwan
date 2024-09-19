import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useId, useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";

export type OnboardingWeightFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
};

export function OnboardingWeightForm({
  onSuccess,
  user,
  currentStep,
}: OnboardingWeightFormProps) {
  const id = useId();
  const [formData, setFormData] = useState(() => {
    return {
      weight: user.weight <= 0 ? "" : String(user.weight),
    };
  });

  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const weight = parseFloat(formData.weight) || 0;

    const userValues = {
      weight,
    };

    await updateMutation.mutateAsync(
      { userId: user.id, userValues },
      { onSuccess }
    );
  };

  const handleUpdateFormData: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  return (
    <>
      <PageTitle text="몸무게를 입력해 주세요." />
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label htmlFor={`${id}-weight`}>
            <h2 className="sr-only">체중</h2>
          </label>
          <input
            id={`${id}-weight`}
            name="weight"
            type="text"
            placeholder="70"
            value={formData.weight}
            onChange={handleUpdateFormData}
          />
          kg
        </div>
        <PrimaryLargeButton
          type="submit"
          disabled={!formData.weight || updateMutation.isPending}
        >
          {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
        </PrimaryLargeButton>
        {updateMutation.isError
          ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
          : null}
      </form>
    </>
  );
}
