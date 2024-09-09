import { updateCurrentUser, User } from "@/api/pocketbase";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

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

  const queryClient = useQueryClient();

  const onboardingWeightMutation = useMutation({
    mutationFn: updateCurrentUser,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const weight = parseFloat(formData.weight) || 0;

    const userValues = {
      weight,
    };

    await onboardingWeightMutation.mutateAsync(
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
        <label htmlFor="weight">
          <h2 className="sr-only">체중</h2>
        </label>
        <input
          name="weight"
          type="text"
          placeholder="70"
          value={formData.weight}
          onChange={handleUpdateFormData}
        />
        kg
      </div>

      <button
        type="submit"
        disabled={!formData.weight || onboardingWeightMutation.isPending}
      >
        {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
      </button>
      {onboardingWeightMutation.isError
        ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
        : null}
    </form>
  );
}
