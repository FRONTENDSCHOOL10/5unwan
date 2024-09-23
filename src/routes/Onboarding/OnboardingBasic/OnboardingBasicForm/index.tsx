import { getPbImageUrl, UpdateUser, User } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import { convertImageToWebP } from "@/utils/convertImageToWebP";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import SVGIcon from "@/components/SVGicon";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import { SecondaryMiniButton } from '@/components/Buttons/SecondaryButton';
import styles from "./style.module.css";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

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
  const avatarImageRef = useRef<HTMLImageElement | null>(null);

  const [formData, setFormData] = useState<{
    newAvatarFile: File | null;
    nickname: string;
    gender: User["gender"];
  }>({
    newAvatarFile: null,
    nickname: user.nickname || "",
    gender: user.gender || "",
  });

  const [newAvatarFileSrc, setNewAvatarFileSrc] = useState<string | null>(null);
  const { updateMutation } = useCurrentUser();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { nickname, gender, newAvatarFile } = formData;

    const userValues: UpdateUser = {
      nickname,
      gender,
      ...(newAvatarFile && { avatar: await convertImageToWebP(newAvatarFile) }),
    };

    await updateMutation.mutateAsync(
      { userId: user.id, userValues },
      { onSuccess }
    );
  };

  const handleUpdateFormData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleUpdateAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prevFormData) => ({ ...prevFormData, newAvatarFile: file }));
  };

  const handleGenderChange = (value: User["gender"], e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 방지
    setFormData((prevFormData) => ({ ...prevFormData, gender: value }));
  };

  useEffect(() => {
    if (!formData.newAvatarFile) {
      setNewAvatarFileSrc(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.newAvatarFile);
    setNewAvatarFileSrc(objectUrl);

    const handleLoad = () => URL.revokeObjectURL(objectUrl);
    const avatarImageElement = avatarImageRef.current;
    if (avatarImageElement) {
      avatarImageElement.addEventListener("load", handleLoad);
    }

    return () => {
      if (avatarImageElement) {
        avatarImageElement.removeEventListener("load", handleLoad);
      }
      URL.revokeObjectURL(objectUrl);
    };
  }, [formData.newAvatarFile]);

  return (
      <form onSubmit={handleSubmit}>
        <div className={styles["container"]}>
          <ul className={styles["content"]}>
            <PageTitle text="프로필과 닉네임, 성별을 입력해주세요." />
            <li className={styles["list-profile"]}>
              <figure className={styles["image-container"]}>
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
              </figure>
              <label className={styles["image-edit"]} role="button">
                <span className="sr-only">
                  <Input
                    name="newAvatarFile"
                    type="file"
                    onChange={handleUpdateAvatar}
                    labelHide
                    errorTextHide
                    accept=".jpg, .webp, .svg, .gif"
                    aria-label="프로필사진 업로드"
                  />
                </span>
                <span className={styles["icon-box"]}>
                  <SVGIcon width={20} height={20} iconId="iconAdd"/>
                </span>
              </label>
            </li>
            <li className={styles["list-nickname"]}>
              <Input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleUpdateFormData}
                labelTitle="닉네임"
                placeholder="닉네임을 입력해 주세요."
                errorTextHide
              />
            </li>
            <li className={styles["list-gender"]} aria-label="성별 선택">
              <title className="body-sm-medium">성별</title>
              <ul className={styles["gender-input"]}>
                <li>
                  <span className="sr-only">
                    <Input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={formData.gender === "M"}
                      onChange={handleUpdateFormData}
                    />
                  </span>
                  <SecondaryMiniButton
                    onClick={(e) => handleGenderChange("M", e)}
                    aria-pressed={formData.gender === "M"}
                    className={formData.gender === "M" ? styles["active-button"] : ""}
                  >
                    남자
                    {formData.gender === "M" && (
                      <span className={styles["icon-box"]}>
                        <SVGIcon width={20} height={20} iconId="iconCheck" />
                      </span>
                    )}
                  </SecondaryMiniButton>
                </li>
                <li>
                  <span className="sr-only">
                    <Input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={formData.gender === "F"}
                      onChange={handleUpdateFormData}
                    />
                  </span>
                  <SecondaryMiniButton
                    onClick={(e) => handleGenderChange("F", e)}
                    aria-pressed={formData.gender === "F"}
                    className={formData.gender === "F" ? styles["active-button"] : ""}
                  >
                    여자
                    {formData.gender === "F" && (
                      <span className={styles["icon-box"]}>
                        <SVGIcon width={20} height={20} iconId="iconCheck" />
                      </span>
                    )}
                  </SecondaryMiniButton>
                </li>
              </ul>
            </li>
          </ul>
          <PrimaryLargeButton
            type="submit"
            disabled={
              !formData.nickname.trim() ||
              !formData.gender ||
              updateMutation.isPending
            }
          >
            {`다음 ${currentStep + 2}/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
        </div>
        {updateMutation.isError && 
          "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"}
      </form>
  );
}
