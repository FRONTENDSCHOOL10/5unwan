import { useCurrentUser } from "@/hooks/user";
import { useNavigate } from "react-router-dom";
import { deleteUser, getPbImageUrl  } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./myPageModal.module.css";
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";

export default function MyPage() {
  const { user, isLoading, isError, logout } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword] = useState("");

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (password: string) => {
      await deleteUser(password);
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/start");
    },
    onError: (error) => {
      console.error(error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const showConfirmDeleteModal = () => {
    setShowConfirmModal(true); //
  };

  const handleConfirmDelete = () => {
    deleteUserMutation.mutate(password, {
      onSuccess() {
        setShowConfirmModal(false);
      },
    });
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  // 나이 계산
  const birthDate = new Date(user?.dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  // 프로필 이미지 URL 가져오기
  const profileImageUrl = getPbImageUrl(user, user?.avatar || "");

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
<div>
	<span className={styles["mypage-title"]}>마이페이지</span>
     <br />

      {/* 프로필 정보*/}
	  <div className={styles["avatar-container"]}>
      <img
        src={profileImageUrl || "/default-profile.png"}
        alt="프로필 이미지"
        className={styles.avatar}
      />
    </div>
    <h1 className={styles["nickname"]}>{user?.nickname || "사용자 이름"}</h1>
    
    {/* 유저 정보 */}
    <div className={styles["profile-stats-container"]}>
      <div className={styles["stat-item"]}>
        {user?.weight || 0}kg
      </div>
      <div className={styles.divider}></div>
      <div className={styles["stat-item"]}>
        {user?.height || 0}cm
      </div>
      <div className={styles.divider}></div>
      <div className={styles["stat-item"]}>
        {age || "알 수 없음"}세
      </div>
    </div>

      {/* 관심 운동 섹션 추가 */}
      <div className={styles.interests}>
        <h3>관심 운동</h3>
        <div className={styles.interestsList}>
          {user?.interests?.length > 0 ? (
            user.interests.map((interest: string, index: number) => (
              <div key={index} className={styles.interest}>
                <span>{interest}</span>
              </div>
            ))
          ) : (
            <p>관심 운동이 없습니다.</p>
          )}
        </div>
      </div>

	  
      <button onClick={() => logoutMutation.mutate()}>로그아웃</button>
      <br />
      <button onClick={() => setShowDeleteModal(true)}>회원 탈퇴</button>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h1>
              <span className={styles["nickname"]}>{user?.nickname}</span>
              <span className={styles["message"]}>
                님 회원탈퇴를 위해<br></br>
                비밀번호를 입력해주세요.
              </span>
            </h1>

            <Input
              status="text"
              isDark={false}
              label="비밀번호"
              placeholder="8문자 이상, 특수 문자 포함해주세요."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <LargeButton onClick={showConfirmDeleteModal}>확인</LargeButton>
            <LargeButton
              onClick={() => setShowDeleteModal(false)}
              className={styles["cancel-button"]}
            >
              취소
            </LargeButton>
          </div>
        </div>
      )}

{showConfirmModal && (
        <div className={styles.modal}>
          <div className={styles["confirmation-modal-content"]}>
            <h2>정말 탈퇴하시겠습니까?</h2>
            <div className={styles["confirmation-buttons"]}>
              <button
                className={`${styles["confirmation-button"]} ${styles["confirmation-button-confirm"]}`}
                onClick={handleConfirmDelete}
                disabled={deleteUserMutation.isPending}
              >
                확인
              </button>
              <button
                className={`${styles["confirmation-button"]} ${styles["confirmation-button-cancel"]}`}
                onClick={handleCancelDelete}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
