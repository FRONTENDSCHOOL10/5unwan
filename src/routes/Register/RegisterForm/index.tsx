import { createUser } from "@/api/pocketbase";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import { useMutation } from "@tanstack/react-query";
import React, { useId, useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";

export type RegisterFormProps = {
  onSuccess: () => void | Promise<void>;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const id = useId();
  const [formData, setFormData] = useState(() => {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  });

  const registerMutation = useMutation({
    mutationFn: createUser,
    onSuccess,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { email, password, passwordConfirm } = formData;
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    const newUser = {
      email,
      password,
      passwordConfirm,
    };

    await registerMutation.mutateAsync(newUser);
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
    <>
      <PageTitle text="이메일과 비밀번호를 입력해주세요." />
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <div role="group">
            <label htmlFor={`${id}-email`}>
              <h2>이메일</h2>
            </label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              placeholder="이메일을 입력"
              value={formData.email}
              onChange={handleUpdateFormData}
            />
          </div>
          <div role="group">
            <label htmlFor={`${id}-password`}>
              <h2>비밀번호</h2>
            </label>
            <input
              id={`${id}-password`}
              name="password"
              type="password"
              placeholder="8문자 이상, 특수 문자 포함"
              value={formData.password}
              onChange={handleUpdateFormData}
            />
          </div>
          <div role="group">
            <label htmlFor={`${id}-passwordConfirm`}>
              <h2>비밀번호 확인</h2>
            </label>
            <input
              id={`${id}-passwordConfirm`}
              name="passwordConfirm"
              type="password"
              value={formData.passwordConfirm}
              onChange={handleUpdateFormData}
            />
          </div>
        </div>
        <PrimaryLargeButton
            type="submit"
            disabled={
              !formData.email.trim() ||
              !formData.password.trim() ||
              !formData.passwordConfirm.trim() ||
              registerMutation.isPending
            }
          >
          {`다음 1/${ONBOARDING_STEPS.length + 1}`}
          </PrimaryLargeButton>
      </form>
    </>
  );
}
