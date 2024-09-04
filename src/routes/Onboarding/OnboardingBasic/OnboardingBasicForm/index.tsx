import {
  getPbImageUrl,
  updateCurrentUser,
  UpdateUser,
  User,
} from "@/api/pocketbase";
import { convertImageToWebP } from "@/utils/convertImageToWebP";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

  const onboardingBasicMutation = useMutation({
    mutationFn: updateCurrentUser,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });

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

    // Clean up the object URL when the component unmounts or when the avatar file changes
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
      <div
        role="group"
        // className="flex flex-col items-center"
      >
        <h3 className="sr-only">프로필 사진</h3>
        <div
        // className="relative w-1/4"
        >
          <img
            aria-hidden="true"
            ref={avatarImageRef}
            src={
              newAvatarFileSrc ||
              getPbImageUrl(user, user.avatar) ||
              "/avatar-placeholder.webp"
            }
            alt="프로필 사진"
            // className="aspect-square w-full rounded-full object-cover"
          />

          <label
            htmlFor={`${id}-newAvatarFile`}
            role="button"
            // className="absolute bottom-[0.06rem] right-[0.06rem] flex w-1/4 rounded-full bg-background p-[0.125rem] [box-shadow:0.25rem_0.25rem_0.25rem_0px_rgba(0,_0,_0,_0.15)] cursor-pointer xs:bottom-[0.084rem] xs:right-[0.084rem] xs:p-[0.175rem] sm:bottom-[0.108rem] sm:right-[0.108rem] sm:p-[0.225rem] focus-within:ring-1 focus-within:ring-blue-500 focus:ring-blue-500"
          >
            {/* <img
              src="/icon/pencil.svg"
              alt="연필"
              aria-hidden="true"
              className="aspect-square w-full"
              /> */}
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
            // className="sr-only"
          />
          <label htmlFor={`${id}-female`}>여자</label>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          !formData.nickname.trim() ||
          !formData.gender.trim() ||
          onboardingBasicMutation.isPending
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
