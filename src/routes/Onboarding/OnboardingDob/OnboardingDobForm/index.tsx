import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useId, useState } from "react";

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
  const id = useId();
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
    <form onSubmit={handleSubmit}>
      <div role="group">
        <label htmlFor={`${id}-year`}>
          <h2 className="sr-only">연도</h2>
        </label>
        <input
          id={`${id}-year`}
          name="year"
          type="number"
          placeholder="YYYY"
          value={formData.year}
          onChange={handleUpdateFormData}
        />
        <label htmlFor={`${id}-month`}>
          <h2 className="sr-only">월</h2>
        </label>
        <input
          id={`${id}-month`}
          name="month"
          type="number"
          placeholder="MM"
          value={formData.month}
          onChange={handleUpdateFormData}
        />
        <label htmlFor={`${id}-day`}>
          <h2 className="sr-only">일</h2>
        </label>
        <input
          id={`${id}-day`}
          name="day"
          type="number"
          placeholder="DD"
          value={formData.day}
          onChange={handleUpdateFormData}
        />
      </div>
      <button
        type="submit"
        disabled={
          !formData.year.trim() ||
          !formData.month.trim() ||
          !formData.day.trim() ||
          updateMutation.isPending
        }
      >
        {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
      </button>
      {updateMutation.isError
        ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
        : null}
    </form>
  );
}
