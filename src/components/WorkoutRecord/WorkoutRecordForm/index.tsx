<<<<<<< Updated upstream
import React, { useId, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createWorkout } from "@/api/pocketbaseWorkouts";
import { useCurrentUser } from "@/hooks/user";
import styles from "./workoutRecordModal.module.css";
import classNames from "classnames";
import { PrimaryMediumButton } from "@/components/Buttons/PrimaryButton";
import { SecondaryMediumButton } from "@/components/Buttons/SecondaryButton";
// import Input from '@/components/Input';
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

const categories = ["헬스", "런닝", "테니스", "클라이밍", "요가", "배드민턴", "기타"];
=======
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createWorkout } from "@/api/pocketbaseWorkouts";
import { PrimaryMediumButton } from "@/components/Buttons/PrimaryButton";
>>>>>>> Stashed changes

export type WorkoutRecordFormProps = {
  onSuccess: () => void | Promise<void>;
  onCancel: () => void;
};

<<<<<<< Updated upstream
export function WorkoutRecordForm({ onSuccess, onCancel }: WorkoutRecordFormProps) {
  const { isDark } = useDarkMode(); // Use DarkMode context

  const id = useId();
  const { user } = useCurrentUser();

  const [formData, setFormData] = useState({
    user: user?.id || "",
    day: new Date().toISOString().split('T')[0],
    category: [] as string[],
    start: "",
    end: "",
    title: "",
    content: "",
=======
export function WorkoutRecordForm( { onSuccess }: WorkoutRecordFormProps) {
  const [formData, setFormData] = useState(() => {
    return {
      day: "",
      category: "",
      start: "",
      end: "",
      title: "",
      content: "",
      photos: [],
    }
>>>>>>> Stashed changes
  });

  const createWorkoutMutation = useMutation({
    mutationFn: createWorkout,
    onSuccess,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
<<<<<<< Updated upstream

    const { user, day, category, start, end, title, content } = formData;

    if (!user || !day || !category.length || !start || !end || !title || !content) {
=======
    
    if ( !formData.day || !formData.category || !formData.start || !formData.end  || !formData.title  || !formData.content ) {
>>>>>>> Stashed changes
      alert("모든 내용을 입력해주세요.");
      return;
    }

<<<<<<< Updated upstream
    const newWorkout = {
      user,
      day,
      category: category.join(", "),
      start,
      end,
      title,
      content,
    };

    await createWorkoutMutation.mutateAsync(newWorkout);
  };

  const handleUpdateFormData: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
=======
    // createWorkout API 호출
    await createWorkoutMutation.mutateAsync(formData);
  };

  // 폼 입력 값 업데이트
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
>>>>>>> Stashed changes
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

<<<<<<< Updated upstream
  const handleUpdateCategory = (value: string) => {
    setFormData((prev) => {
      const newCategory = prev.category.includes(value)
        ? prev.category.filter(cat => cat !== value)
        : [...prev.category, value];
      return { ...prev, category: newCategory };
    });
  };

  const [day] = useState(new Date().toISOString().split('T')[0]);

  return (
    <form onSubmit={handleSubmit} className={classNames(styles.content, { [styles["is-dark"]]: isDark })}>
      <ul className={classNames(styles.content)}>
        <li className={styles["list-day"]}>
          <p className={`body-md-bold ${styles["list-day"]}`}>{day}</p>
        </li>

        <li className={styles["list-category"]}>
          <title className="body-md-bold">운동 종류</title>
          <section>
            {categories.map((cat) => {
              const buttonClassName = classNames('body-sm-medium', {
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
            <input
              className="body-sm-medium"
              id={`${id}-start`}
              type="time"
              name="start"
              value={formData.start}
              onChange={handleUpdateFormData}
              required
            />
            <p className="body-sm-bold">부터</p>
            <input
              className="body-sm-medium"
              id={`${id}-end`}
              type="time"
              name="end"
              value={formData.end}
              onChange={handleUpdateFormData}
              required
            />
            <p className="body-sm-bold">까지</p>
          </section>
        </li>

        <li className={styles["list-title"]}>
          <title className="body-md-bold">제목</title>
          <input
            id={`${id}-title`}
            type="text"
            name="title"
            placeholder="운동 제목"
            value={formData.title}
            onChange={handleUpdateFormData}
          />
          {/* Input 컴포넌트 사용 시 onChange가 안먹히는지
              버튼 disabled가 풀리지 않아요.  */}
          {/* <Input
            title="Test Input"
            isDark={isDark}
            placeholder="제목을 입력해 주세요"
            onChange={handleUpdateFormData}
            textHide
            titleHide
          /> */}
        </li>

        <li className={styles["list-content"]}>
          <title className="body-md-bold">내용</title>
          <textarea
            id={`${id}-content`}
            name="content"
            placeholder="내용을 입력해 주세요."
            value={formData.content}
            onChange={handleUpdateFormData}
          />
        </li>

        {/* <li className={styles["list-photo"]}>
          <input
              type="file"
              name="photos"
          />
        </li> */}

      </ul>

      <div className={styles["work-btn"]}>
        <PrimaryMediumButton
          type="submit"
          disabled={
            !formData.category.length ||
            !formData.start ||
            !formData.end ||
            !formData.title ||
            !formData.content ||
            createWorkoutMutation.isPending
          }
        >
          등록하기
        </PrimaryMediumButton>
        <SecondaryMediumButton
          type="button"
          onClick={onCancel}
        >
          취소하기
        </SecondaryMediumButton>
      </div>
=======
  // 사진 업로드 핸들러
  const handlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 날짜 */}
      <input
        type="date"
        name="day"
        value={formData.day}
        onChange={handleInputChange}
        required
      />

      {/* 카테고리 */}
      <input
        type="text"
        name="category"
        placeholder="운동 종류 (헬스, 클라이밍, 배드민턴)"
        value={formData.category}
        onChange={handleInputChange}
        required
      />

      {/* 시작 시간 */}
      <input
        type="time"
        name="start"
        value={formData.start}
        onChange={handleInputChange}
        required
      />

      {/* 종료 시간 */}
      <input
        type="time"
        name="end"
        value={formData.end}
        onChange={handleInputChange}
        required
      />

      {/* 제목 */}
      <input
        type="text"
        name="title"
        placeholder="운동 제목"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      {/* 내용 */}
      <textarea
        name="content"
        placeholder="운동 내용"
        value={formData.content}
        onChange={handleInputChange}
        required
      />

      {/* 사진 업로드 */}
      <input
        type="file"
        name="photos"
        multiple
        onChange={handlePhotoChange}
      />

      {/* 제출 버튼 */}
      <PrimaryMediumButton
        type="submit"
        disabled={
          !formData.day ||
          !formData.category ||
          !formData.start ||
          !formData.end ||
          !formData.title ||
          !formData.content ||
          createWorkoutMutation.isPending
        }
      >
        등록하기
      </PrimaryMediumButton>
      <PrimaryMediumButton
        // type="button" 
        // onClick={onCancel}
      >
        취소하기
      </PrimaryMediumButton>
>>>>>>> Stashed changes
    </form>
  );
}
