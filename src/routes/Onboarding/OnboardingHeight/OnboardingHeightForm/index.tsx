import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, {  useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

export type OnboardingHeightFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
};

export function OnboardingHeightForm({
  onSuccess,
  user,
  currentStep,
}: OnboardingHeightFormProps) {
  const [formData, setFormData] = useState(() => {
    return {
      height: user.height <= 0 ? "" : String(user.height),
    };
  });

  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const height = parseFloat(formData.height) || 0;

    const userValues = {
      height,
    };

    await updateMutation.mutateAsync(
      { userId: user.id, userValues },
      {
        onSuccess,
      }
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
          <section className={styles.content}>
            <PageTitle text="키를 입력해 주세요." />
            <section className={styles["input-group"]}>
              <Input
                name="height"
                type="number"
                placeholder="160"
                onChange={handleUpdateFormData}
                value={formData.height}
                labelHide
                errorTextHide
              />
              <p className={`body-sm-bold ${styles["desc"]}`}>cm</p>
            </section>
          </section>
          <PrimaryLargeButton
              type="submit"
              disabled={!formData.height || updateMutation.isPending}
          >
            {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
        </div>


        {updateMutation.isError
          ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
          : null}
      </form>
  );
}
