import { createUser } from "@/api/pocketbase";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

export type RegisterFormProps = {
  onSuccess: () => void | Promise<void>;
};

export function RegisterForm({ onSuccess }: RegisterFormProps) {
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
    <form onSubmit={handleSubmit}>
      <div role="group">
        <label htmlFor="email">
          <h2>이메일</h2>
        </label>
        <input
          name="email"
          type="email"
          placeholder="이메일을 입력"
          value={formData.email}
          onChange={handleUpdateFormData}
        />
      </div>
      <div role="group">
        <label htmlFor="password">
          <h2>비밀번호</h2>
        </label>
        <input
          name="password"
          type="password"
          placeholder="8문자 이상, 특수 문자 포함"
          value={formData.password}
          onChange={handleUpdateFormData}
        />
      </div>
      <div role="group">
        <label htmlFor="passwordConfirm">
          <h2>비밀번호 확인</h2>
        </label>
        <input
          name="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          onChange={handleUpdateFormData}
        />
      </div>
      <button
        type="submit"
        disabled={
          !formData.email.trim() ||
          !formData.password.trim() ||
          !formData.passwordConfirm.trim() ||
          registerMutation.isPending
        }
      >
        다음 1/6
      </button>
    </form>
  );
}
