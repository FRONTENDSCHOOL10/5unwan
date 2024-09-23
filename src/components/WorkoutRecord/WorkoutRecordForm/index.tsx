import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createWorkout, NewWorkout } from "@/api/pocketbaseWorkouts";
import { useCurrentUser } from "@/hooks/user";
import styles from "./workoutRecordModal.module.css";
import classNames from "classnames";
import { PrimaryMediumButton } from "@/components/Buttons/PrimaryButton";
import { SecondaryMediumButton } from "@/components/Buttons/SecondaryButton";
import IsDarkPrimaryButton from "@/components/Buttons/IsDarkButton/isDarkPrimaryButton";
import IsDarkSecondaryButton from "@/components/Buttons/IsDarkButton/isDarkSecondaryButton";
import { useToday } from "@/hooks/useWorkouts";
import { convertImageToWebP } from "@/utils/convertImageToWebP";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";
import SVGIcon from "@/components/SVGicon";
import Input from "@/components/Input/index";

const categories = [
  "헬스",
  "런닝",
  "테니스",
  "클라이밍",
  "요가",
  "배드민턴",
  "기타",
];

export type WorkoutRecordFormProps = {
  onSuccess: () => void | Promise<void>;
  onCancel: () => void;
};

export function WorkoutRecordForm({ onSuccess, onCancel }: WorkoutRecordFormProps) {
  const { isDark } = useDarkMode(); // 다크모드

  const id = useId();
  const { user: userObject } = useCurrentUser();
  const { today } = useToday();
  const photoImageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<{
    category: string[];
    start: string;
    end: string;
    title: string;
    content: string;
    newPhotoFile: File | null;
  }>(() => {
    return {
      category: [],
      start: "",
      end: "",
      title: "",
      content: "",
      newPhotoFile: null,
    };
  });

  const [newPhotoFileSrc, setNewPhotoFileSrc] = useState<string | null>(null);

  const createWorkoutMutation = useMutation({
    mutationFn: createWorkout,
    onSuccess,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const user = userObject?.id;
    const day = today;
    const { category, start, end, title, content, newPhotoFile } = formData;

    if (
      !user ||
      !day ||
      !category.length ||
      !start ||
      !end ||
      !title ||
      !content
    ) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

    const newWorkout: NewWorkout = {
      user,
      day,
      category: category.join(", "),
      start,
      end,
      title,
      content,
    };

    if (newPhotoFile) {
      const photoWebP = await convertImageToWebP(newPhotoFile);
      newWorkout.photo = photoWebP;
    }

    await createWorkoutMutation.mutateAsync(newWorkout);
  };

  const handleUpdateFormData: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formData.newPhotoFile === null) {
      setNewPhotoFileSrc(null);
      return;
    }

    const objectUrl = URL.createObjectURL(formData.newPhotoFile);
    let objectUrlRevoked = false;
    setNewPhotoFileSrc(objectUrl);

    const handleLoad = () => {
      if (!objectUrlRevoked) {
        URL.revokeObjectURL(objectUrl);
        objectUrlRevoked = true;
      }
    };

    const photoImageElement = photoImageRef.current;
    if (photoImageElement) {
      photoImageElement.addEventListener("load", handleLoad);
    }

    return () => {
      if (photoImageElement) {
        photoImageElement.removeEventListener("load", handleLoad);
      }
      if (!objectUrlRevoked) {
        URL.revokeObjectURL(objectUrl);
        objectUrlRevoked = true;
      }
    };
  }, [formData.newPhotoFile]);

  function handleUpdatePhoto(e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0] ?? null;

    setFormData((prevFormData) => {
      return { ...prevFormData, newPhotoFile: file };
    });
  }

  const handleUpdateCategory = (value: string) => {
    setFormData((prev) => {
      const newCategory = prev.category.includes(value)
        ? prev.category.filter((cat) => cat !== value)
        : [...prev.category, value];
      return { ...prev, category: newCategory };
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classNames(styles.content, { [styles["is-dark"]]: isDark })}>
      <ul className={classNames(styles.content)}>
        <li className={styles["list-day"]}>
          <p className={`body-md-bold ${styles["list-day"]}`}>{today}</p>
        </li>

        <li className={styles["list-category"]}>
          <title className="body-md-bold">운동 종류</title>
          <section>
            {categories.map((cat) => {
              const buttonClassName = classNames("body-sm-medium", {
                [styles.selected]: formData.category.includes(cat),
              });

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleUpdateCategory(cat)}
                  className={buttonClassName}
                >
                  {cat}
                </button>
              );
            })}
          </section>
        </li>

        <li className={styles["list-time"]}>
          <title className="body-md-bold">운동 시간</title>
          <section>
            {isDark ? (
              <Input
                type="time"
                name="start"
                value={formData.start}
                onChange={handleUpdateFormData}
                labelHide
                errorTextHide
                isDark
              />
            ) : (
              <Input
                type="time"
                name="start"
                value={formData.start}
                onChange={handleUpdateFormData}
                labelHide
                errorTextHide
            />
            )}
            <p className="body-sm-bold">부터</p>
            {isDark ? (
              <Input
              type="time"
              name="end"
              value={formData.end}
              onChange={handleUpdateFormData}
              labelHide
              errorTextHide
              isDark
            />
            ) : (
              <Input
              type="time"
              name="end"
              value={formData.end}
              onChange={handleUpdateFormData}
              labelHide
              errorTextHide
            />
            )}
            <p className="body-sm-bold">까지</p>
          </section>
        </li>

        <li className={styles["list-title"]}>
          <title className="body-md-bold">운동 제목</title>
          {isDark ? (
            <Input
              type="text"
              name="title"
              placeholder="운동 제목"
              value={formData.title}
              onChange={handleUpdateFormData}
              labelHide
              errorTextHide
              isDark
            />
            ) : (
              <Input
                type="text"
                name="title"
                placeholder="운동 제목"
                value={formData.title}
                onChange={handleUpdateFormData}
                labelHide
                errorTextHide
              />
            )}
        </li>

        <li className={styles["list-content"]}>
          <title className="body-md-bold">운동 내용</title>
          <textarea
            id={`${id}-content`}
            name="content"
            placeholder="내용을 입력해 주세요."
            value={formData.content}
            onChange={handleUpdateFormData}
            rows={4}
          />
        </li>

        <li className={styles["list-photo"]}>
          <title className="body-md-bold">운동 사진</title>
          <section>
            <figure className={styles["image-container"]} onClick={handleImageClick}>
              {newPhotoFileSrc ? (
                <img
                  aria-hidden="true"
                  ref={photoImageRef}
                  src={newPhotoFileSrc}
                  alt="운동 사진"
                />
              ) : (
                <SVGIcon iconId="iconAdd" width={40} height={40} />
              )}
            </figure>

            <input
              ref={fileInputRef}
              id={`${id}-newPhotoFile`}
              type="file"
              name="newPhotoFile"
              accept=".jpg, .webp, .svg, .gif, .webp"
              aria-label="운동기록 사진 업로드"
              onChange={handleUpdatePhoto}
              style={{ display: "none" }}
            />
            {isDark ? (
              <Input
              ref={fileInputRef}
              type="file"
              name="newPhotoFile"
              accept=".jpg, .webp, .svg, .gif"
              aria-label="운동기록 사진 업로드"
              onChange={handleUpdatePhoto}
              labelHide
              errorTextHide
              isDark
            />
            ) : (
              <Input
                ref={fileInputRef}
                type="file"
                name="newPhotoFile"
                accept=".jpg, .webp, .svg, .gif"
                aria-label="운동기록 사진 업로드"
                onChange={handleUpdatePhoto}
                labelHide
                errorTextHide
              />
            )}
          </section>
        </li>
      </ul>

      <div className={styles["work-btn"]}>
      {isDark ? (
        <IsDarkPrimaryButton
          type="submit"
          size="medium"
          disabled={
            !formData.category.length ||
            !formData.start ||
            !formData.end ||
            !formData.title ||
            !formData.content ||
            !formData.newPhotoFile ||
            createWorkoutMutation.isPending
          }
        >
          등록하기
        </IsDarkPrimaryButton>
      ) : (
        <PrimaryMediumButton
          type="submit"
          disabled={
            !formData.category.length ||
            !formData.start ||
            !formData.end ||
            !formData.title ||
            !formData.content ||
            !formData.content ||
            createWorkoutMutation.isPending
          }
        >
          등록하기
        </PrimaryMediumButton>
      )}
        {isDark ? (
        <IsDarkSecondaryButton
          type="button"
          onClick={onCancel}
          size="medium"
        >
          취소하기
        </IsDarkSecondaryButton>
      ) : (
        <SecondaryMediumButton
          type="button"
          onClick={onCancel}
        >
          취소하기
        </SecondaryMediumButton>
      )}

      </div>
    </form>
  );
}
