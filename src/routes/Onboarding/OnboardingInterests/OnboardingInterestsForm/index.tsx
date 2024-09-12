import { User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { interestOptions, ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { useId, useState } from "react";

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
      <div role="group">
        <label htmlFor="interests">
          <h2 className="sr-only">관심 운동</h2>
        </label>
        {interestOptions.map((interestOption) => {
          return (
            <input
              id={`${id}-${interestOption}`}
              key={interestOption}
              name={interestOption}
              type="checkbox"
              value={interestOption}
              checked={formData[interestOption]}
              onChange={handleUpdateFormData}
            />
          );
        })}
      </div>

      <button
        type="submit"
        disabled={
          Object.keys(formData).length === 0 || updateMutation.isPending
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
