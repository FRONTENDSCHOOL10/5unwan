import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUserQuery } from "@/hooks/user"; 
import { deleteUser } from "@/api/pocketbase";
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";
import styles from "./deleteAccount.module.css";

export default function DeleteAccount() {
  const { user, isLoading, isError } = useCurrentUserQuery(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");

  const deleteUserMutation = useMutation({
    mutationFn: async (password: string) => {
      await deleteUser(password);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/delete-complete");  // 회원탈퇴 성공 시 완료 페이지로 이동
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
      <h1>{user?.nickname}님 회원탈퇴를 위해 비밀번호를 입력해주세요.</h1>
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요."
      />
      <LargeButton onClick={handleDeleteAccount}>탈퇴하기</LargeButton>
      <LargeButton onClick={() => navigate("/my-page")} className={styles.cancelButton}>
        취소
      </LargeButton>
    </div>
  );
}
