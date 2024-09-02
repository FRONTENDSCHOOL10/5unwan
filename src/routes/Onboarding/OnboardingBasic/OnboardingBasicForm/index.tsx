import { updateCurrentUser, User } from "@/api/pocketbase";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export type OnboardingBasicFormProps = {
  onSuccess: () => void | Promise<void>;
  user: User;
  currentStep: number;
};

export function OnboardingBasicForm({
  onSuccess,
  user,
  currentStep,
}: OnboardingBasicFormProps) {
  const [formData, setFormData] = useState<Pick<User, "nickname" | "gender">>(
    () => {
      return {
        // TODO: avatar,
        nickname: user.nickname || "",
        gender: user.gender || "",
      };
    }
  );

  const queryClient = useQueryClient();

  const onboardingBasicMutation = useMutation({
    mutationFn: updateCurrentUser,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { nickname, gender } = formData;

    const userValues = {
      nickname,
      gender,
    };

    await onboardingBasicMutation.mutateAsync(
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
        <label htmlFor="nickname">
          <h2 className="visually-hidden">닉네임</h2>
        </label>
        <input
          name="nickname"
          type="text"
          placeholder="닉네임"
          value={formData.nickname}
          onChange={handleUpdateFormData}
        />
      </div>
      <div role="radiogroup" aria-label="성별 선택">
        <div>
          <input
            type="radio"
            name="gender"
            id="male"
            value="M"
            checked={formData.gender === "M"}
            onChange={handleUpdateFormData}
            // className="visually-hidden"
          />
          <label htmlFor="male">남자</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            id="female"
            value="F"
            checked={formData.gender === "F"}
            onChange={handleUpdateFormData}
            // className="visually-hidden"
          />
          <label htmlFor="female">여자</label>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          !formData.nickname.trim() || onboardingBasicMutation.isPending
        }
      >
        {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
      </button>
      {onboardingBasicMutation.isError
        ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
        : null}
    </form>
  );
}
