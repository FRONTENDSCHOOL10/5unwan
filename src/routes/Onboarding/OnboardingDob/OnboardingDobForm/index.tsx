import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

export type OnboardingDobFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
};

export function OnboardingDobForm({
  onSuccess,
  user,
  currentStep,
}: OnboardingDobFormProps) {
  const [formData, setFormData] = useState(() => {
    return {
      // TODO: avatar,
      year: user.dob.split("-")[0] || "",
      month: user.dob.split("-")[1] || "",
      day: user.dob.split("-")[2] || "",
    };
  });

  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { year, month, day } = formData;

    const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    const userValues = {
      dob,
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
      <PageTitle text="생년월일을 입력해주세요." />
          <section className={styles["input-group"]}>
            <Input
              name="year"
              type="number"
              placeholder="YYYY"
              onChange={handleUpdateFormData}
              value={formData.year}
              labelHide
              errorTextHide
            />
            <Input
              name="month"
              type="number"
              placeholder="MM"
              onChange={handleUpdateFormData}
              value={formData.month}
              labelHide
              errorTextHide
            />
             <Input
              name="day"
              type="number"
              placeholder="DD"
              onChange={handleUpdateFormData}
              value={formData.day}
              labelHide
              errorTextHide
            />
          </section>
          <PrimaryLargeButton
            type="submit"
            disabled={
              !formData.year.trim() ||
              !formData.month.trim() ||
              !formData.day.trim() ||
              updateMutation.isPending
            }
          >
            {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
        {updateMutation.isError
          ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
          : null}
        </form>
    </div>
  );
}
