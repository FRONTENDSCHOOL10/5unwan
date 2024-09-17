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

export type WorkoutRecordFormProps = {
  onSuccess: () => void | Promise<void>;
  onCancel: () => void;
};

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
  });

  const createWorkoutMutation = useMutation({
    mutationFn: createWorkout,
    onSuccess,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { user, day, category, start, end, title, content } = formData;

    if (!user || !day || !category.length || !start || !end || !title || !content) {
      alert("모든 내용을 입력해주세요.");
      return;
    }

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    </form>
  );
}
