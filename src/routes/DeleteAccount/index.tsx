import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import { deleteUser } from "@/api/pocketbase";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import styles from "./deleteAccount.module.css";

export function Component() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");

  const deleteUserMutation = useMutation({
    mutationFn: async (password: string) => {
      await deleteUser(password);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/delete-complete");
    },
    onError: (error) => {
      console.error(error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteAccount = () => {
    deleteUserMutation.mutate(password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.nickname}>{user?.nickname}</span>님 회원탈퇴를
          위해 <br />
          비밀번호를 입력해주세요.
        </h1>
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          className={styles.input}
        />
        <PrimaryLargeButton onClick={handleDeleteAccount}>
          탈퇴하기
        </PrimaryLargeButton>
        <PrimaryLargeButton
          onClick={() => navigate("/my-page")}
          className={styles.cancelButton}
        >
          취소
        </PrimaryLargeButton>
      </div>
    </div>
  );
}

Component.displayName = "DeleteAccountRoute";
