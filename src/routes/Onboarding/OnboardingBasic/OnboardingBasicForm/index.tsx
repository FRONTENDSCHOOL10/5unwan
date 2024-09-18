import { getPbImageUrl, UpdateUser, User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { convertImageToWebP } from "@/utils/convertImageToWebP";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";

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
  const id = useId();
  const avatarImageRef = useRef<HTMLImageElement | null>(null);

  const [formData, setFormData] = useState<{
    newAvatarFile: File | null;
    nickname: string;
    gender: User["gender"];
  }>(() => {
    return {
      newAvatarFile: null,
      nickname: user.nickname || "",
      gender: user.gender || "",
    };
  });

  const [newAvatarFileSrc, setNewAvatarFileSrc] = useState<string | null>(null);

  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { nickname, gender, newAvatarFile } = formData;

    const userValues: UpdateUser = {
      nickname,
      gender,
    };

    if (newAvatarFile) {
      const avatarWebP = await convertImageToWebP(newAvatarFile);
      userValues.avatar = avatarWebP;
    }

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

  useEffect(() => {
    if (formData.newAvatarFile === null) {
      setNewAvatarFileSrc(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.newAvatarFile);
    let objectUrlRevoked = false;
    setNewAvatarFileSrc(objectUrl);

    const handleLoad = () => {
      if (!objectUrlRevoked) {
        URL.revokeObjectURL(objectUrl);
        objectUrlRevoked = true;
      }
    };

    const avatarImageElement = avatarImageRef.current;
    if (avatarImageElement) {
      avatarImageElement.addEventListener("load", handleLoad);
    }

    return () => {
      if (avatarImageElement) {
        avatarImageElement.removeEventListener("load", handleLoad);
      }
      if (!objectUrlRevoked) {
        URL.revokeObjectURL(objectUrl);
        objectUrlRevoked = true;
      }
    };
  }, [formData.newAvatarFile]);

  function handleUpdateAvatar(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null;

    setFormData((prevFormData) => {
      return { ...prevFormData, newAvatarFile: file };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div role="group">
        <h3 className="sr-only">프로필 사진</h3>
        <div>
          <img
            aria-hidden="true"
            ref={avatarImageRef}
            src={
              newAvatarFileSrc ||
              getPbImageUrl(user, user.avatar) ||
              "/avatar-placeholder.webp"
            }
            alt="프로필 사진"
          />

          <label htmlFor={`${id}-newAvatarFile`} role="button">
            <input
              id={`${id}-newAvatarFile`}
              type="file"
              name="newAvatarFile"
              accept=".jpg, .webp, .svg, .gif, .webp"
              aria-label="프로필사진 업로드"
              onChange={handleUpdateAvatar}
            />
          </label>
        </div>
      </div>
      <div role="group">
        <label htmlFor={`${id}-nickname`}>
          <h2 className="sr-only">닉네임</h2>
        </label>
        <input
          id={`${id}-nickname`}
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
            id={`${id}-male`}
            value="M"
            checked={formData.gender === "M"}
            onChange={handleUpdateFormData}
            // className="sr-only"
          />
          <label htmlFor={`${id}-male`}>남자</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            id={`${id}-female`}
            value="F"
            checked={formData.gender === "F"}
            onChange={handleUpdateFormData}
          />
          <label htmlFor={`${id}-female`}>여자</label>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          !formData.nickname.trim() ||
          !formData.gender.trim() ||
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
