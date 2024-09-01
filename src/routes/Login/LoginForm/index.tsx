import { loginWithPassword } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <form onSubmit={handleSubmit}>
      <div role="group">
        <label htmlFor="email">
          <h2 className="visually-hidden">이메일</h2>
        </label>
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          value={formData.email}
          onChange={handleUpdateFormData}
        />
      </div>
      <div role="group">
        <label htmlFor="password">
          <h2 className="visually-hidden">비밀번호</h2>
        </label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={handleUpdateFormData}
        />
      </div>
      <div>
        <Link to="#">비밀번호 찾기</Link>
      </div>
      <button
        type="submit"
        disabled={
          !formData.email.trim() ||
          !formData.password.trim() ||
          loginMutation.isPending
        }
      >
        로그인
      </button>
      {loginMutation.error instanceof ClientResponseError &&
      loginMutation.error.response.code === 400
        ? "이메일 또는 비밀번호를 확인해주세요."
        : loginMutation.isError
        ? "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
        : null}
    </form>
  );
}
