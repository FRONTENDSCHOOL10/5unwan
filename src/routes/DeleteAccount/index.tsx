import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user";
import { deleteUser } from "@/api/pocketbase";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { SecondaryLargeButton } from "@/components/Buttons/SecondaryButton";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";
import styles from "./deleteAccount.module.css"

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
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <PageTitle
              large
              text={{ __html: `${user?.nickname }님 회원탈퇴를 위해
              <br />
              비밀번호를 입력해주세요.
              ` }}
            />
          <Input
              type="password"
              value={password}
              labelTitle="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              errorTextHide
            />
          <div className={styles.btn}>
            <PrimaryLargeButton
              onClick={handleDeleteAccount}
              disabled={
                !password
              }>
              탈퇴하기
            </PrimaryLargeButton>
            <SecondaryLargeButton
              onClick={() => navigate("/my-page")}
              className={styles.cancelButton}
            >
              취소
            </SecondaryLargeButton>
          </div>
        </div>
      </div>
    </div>
  );
}

Component.displayName = "DeleteAccountRoute";
