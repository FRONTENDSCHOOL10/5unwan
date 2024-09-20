import styles from "./loginForm.module.css";
import { useState } from "react";
import { loginWithPassword } from "@/api/pocketbase";
import { ClientResponseError } from "pocketbase";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/Input";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";

export type LoginFormProps = {
  onSuccess: () => void | Promise<void>;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState(() => {
    return {
      email: "",
      password: "",
    };
  });

  const loginMutation = useMutation({
    mutationFn: loginWithPassword,
    onSuccess,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const loginInfo = {
      email,
      password,
    };

    await loginMutation.mutateAsync(loginInfo);
  };

  const handleUpdateFormData: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  function showErrorMessage() {
    if (loginMutation.error instanceof ClientResponseError && loginMutation.error.response.code === 400) {
      return <strong className={`body-xm-medium ${styles.errorText}`}>이메일 또는 비밀번호를 확인해주세요.</strong>
    } else if (loginMutation.isError) {
      return <strong className={`body-xm-medium ${styles.errorText}`}>알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요</strong>
    } else {
      return null;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <section className={styles.content}>
            <Input
              type="email"
              name="email"
              labelTitle="이메일"
              placeholder="이메일을 입력해 주세요."
              errorTextHide
              value={formData.email}
              onChange={handleUpdateFormData}
            />
            <Input
              type="password"
              name="password"
              labelTitle="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              errorTextHide
              value={formData.password}
              onChange={handleUpdateFormData}
            />
          </section>
        <PrimaryLargeButton
          type="submit"
          disabled={
            !formData.email.trim() ||
            !formData.password.trim() ||
            loginMutation.isPending
          }
          >로그인</PrimaryLargeButton>
        {
          showErrorMessage()
        }
        </div>
      </form>
  )
}