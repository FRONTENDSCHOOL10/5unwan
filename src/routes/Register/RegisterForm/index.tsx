import { createUser } from "@/api/pocketbase";
import { ONBOARDING_STEPS } from "@/utils/onboarding";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styles from "./style.module.css"
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

export type RegisterFormProps = {
  onSuccess: () => void | Promise<void>;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  // const id = useId();
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
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
          <section className={styles.content}>
          <PageTitle text="이메일과 비밀번호를 입력해주세요." />
              <span className={styles["input-group"]}>
                <Input
                  name="email"
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  value={formData.email}
                  onChange={handleUpdateFormData}
                  labelTitle="이메일"
                  errorTextHide
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="8문자 이상, 특수 문자 포함해 주세요."
                  value={formData.password}
                  onChange={handleUpdateFormData}
                  labelTitle="비밀번호"
                  errorTextHide
                />
                <Input
                  name="passwordConfirm"
                  type="password"
                  placeholder=""
                  value={formData.passwordConfirm}
                  onChange={handleUpdateFormData}
                  labelTitle="비밀번호 확인"
                  errorTextHide
                />
              </span>
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
            </section>
      </form>
    </div>
  );
}
