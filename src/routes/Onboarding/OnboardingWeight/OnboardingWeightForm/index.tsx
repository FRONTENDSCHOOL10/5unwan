import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

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
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <ul className={styles.content}>
          <PageTitle text="몸무게를 입력해 주세요." />
          <section className={styles["input-group"]}>
            <Input
              name="weight"
              type="text"
              placeholder="70"
              onChange={handleUpdateFormData}
              value={formData.weight}
              labelHide
              errorTextHide
            />
            <p className={`body-sm-bold ${styles["desc"]}`}>kg</p>
          </section>
          <PrimaryLargeButton
            type="submit"
            disabled={!formData.weight || updateMutation.isPending}
          >
            {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
          {updateMutation.isError
            ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
            : null}
        </ul>
      </div>
    </form>
  );
}
