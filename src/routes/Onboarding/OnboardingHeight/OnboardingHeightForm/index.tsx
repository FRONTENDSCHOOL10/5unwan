import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useState } from "react";

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
      <div role="group">
        <label htmlFor="height">
          <h2 className="sr-only">신장</h2>
        </label>
        <input
          name="height"
          type="text"
          placeholder="160"
          value={formData.height}
          onChange={handleUpdateFormData}
        />
        cm
      </div>

      <button
        type="submit"
        disabled={!formData.height || updateMutation.isPending}
      >
        {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
      </button>
      {updateMutation.isError
        ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
        : null}
    </form>
  );
}
