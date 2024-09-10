import { useCurrentUserQuery } from "@/hooks/user";
import { useNavigate } from "react-router-dom";
import { deleteUser, getPbImageUrl, updateUserProfile, logout } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./myPageModal.module.css";
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";
import MiniButton from "@/components/Buttons/SecondaryButton/miniButton";
import MediumButton from "@/components/Buttons/PrimaryButton/mediumButton";

export default function MyPage() {
  const { user, isLoading, isError } = useCurrentUserQuery();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [weight, setWeight] = useState(user?.weight || 0);
  const [height, setHeight] = useState(user?.height || 0);
  const [dob, setDob] = useState(user?.dob || "");
  const [gender, setGender] = useState(user?.gender || "");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(user?.avatar ? getPbImageUrl(user, user.avatar) : "");

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
    setShowConfirmModal(true);
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

  const handleSaveChanges = () => {
    const updateData = {
      nickname,
      weight,
      height,
      dob,
      avatar: avatarFile || undefined,
    };

	if (user?.id) {
		updateUserProfile(user.id, updateData)
		  .then(() => {
			queryClient.invalidateQueries(["current-user"]); 
			setIsEditMode(false);
		  });
	  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
    }
  };

  const birthDate = user?.dob ? new Date(user.dob) : new Date();
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const profileImageUrl = user ? getPbImageUrl(user, user?.avatar || "") : "/default-profile.png";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      <div className={styles["mypage-header"]}>
        <span className={styles["mypage-title"]}>
          {isEditMode ? "프로필 수정" : "마이페이지"}
        </span>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles["edit-icon"]}
          onClick={() => {
            setIsEditMode(true);
            setGender(user?.gender || "");
          }}
        >
          <g clipPath="url(#clip0_40_612)">
            <path
              d="M10.7143 12.8571L6.42859 13.6286L7.14287 9.28572L15.3286 1.12858C15.4614 0.99468 15.6194 0.888403 15.7935 0.815876C15.9676 0.743349 16.1543 0.706009 16.3429 0.706009C16.5315 0.706009 16.7182 0.743349 16.8923 0.815876C17.0664 0.888403 17.2244 0.99468 17.3572 1.12858L18.8714 2.64286C19.0053 2.77567 19.1116 2.93367 19.1841 3.10775C19.2567 3.28184 19.294 3.46856 19.294 3.65715C19.294 3.84574 19.2567 4.03246 19.1841 4.20654C19.1116 4.38063 19.0053 4.53863 18.8714 4.67144L10.7143 12.8571Z"
              stroke="#212121"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.1428 13.5714V17.8571C17.1428 18.236 16.9923 18.5994 16.7244 18.8673C16.4565 19.1352 16.0931 19.2857 15.7142 19.2857H2.1428C1.76392 19.2857 1.40056 19.1352 1.13265 18.8673C0.864743 18.5994 0.714233 18.236 0.714233 17.8571V4.28572C0.714233 3.90684 0.864743 3.54348 1.13265 3.27557C1.40056 3.00766 1.76392 2.85715 2.1428 2.85715H6.42852"
              stroke="#212121"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_40_612">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {isEditMode ? (
        <div className={styles["edit-mode-container"]}>
          {/* 프로필 이미지 선택 기능 */}
          <label>
            <img
              src={profilePreview || profileImageUrl || "/default-profile.png"}
              alt="프로필 이미지"
              className={styles.avatar}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>

          <Input label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />

          <div className={styles["gender-container"]}>
            <MiniButton
              className={`${gender === "M" ? styles.active : ""}`}
              onClick={() => setGender("M")}
            >
              남자
            </MiniButton>
            <MiniButton
              className={`${gender === "F" ? styles.active : ""}`}
              onClick={() => setGender("F")}
            >
              여자
            </MiniButton>
          </div>

          <Input
            label="생년월일"
            value={dob}
            type="text"
            placeholder="yyyy-mm-dd"
            onChange={(e) => {
              const inputValue = e.target.value;
              const formattedValue = inputValue
                .replace(/[^0-9]/g, "")
                .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
              setDob(formattedValue);
            }}
            maxLength={10}
          />

          <Input
            label="키"
            value={height.toString()}  // number를 string으로 변환
            type="number"
            onChange={(e) => setHeight(Number(e.target.value))}
          />

          <Input
            label="몸무게"
            value={weight.toString()}  // number를 string으로 변환
            type="number"
            onChange={(e) => setWeight(Number(e.target.value))}
          />

          <div className={styles["button-container"]}>
            <MediumButton onClick={handleSaveChanges}>저장</MediumButton>
            <MediumButton onClick={() => setIsEditMode(false)}>취소</MediumButton>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles["avatar-container"]}>
            {/* 프로필 이미지 미리보기 */}
            <img
              src={profilePreview || profileImageUrl || "/default-profile.png"}
              alt="프로필 이미지"
              className={styles.avatar}
            />
          </div>
          <h1 className={styles["main-nickname"]}>
            {user?.nickname || "사용자 이름"}
          </h1>

          <div className={styles["profile-stats-container"]}>
            <div className={styles["stat-item"]}>{user?.weight || 0}kg</div>
            <div className={styles.divider}></div>
            <div className={styles["stat-item"]}>{user?.height || 0}cm</div>
            <div className={styles.divider}></div>
            <div className={styles["stat-item"]}>{age || "알 수 없음"}세</div>
          </div>

          <div className={styles.interests}>
            <h3>관심 운동</h3>
            <div className={styles.interestsList}>
              {user?.interests && user.interests.length > 0 ? (
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
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h1>
              <span className={styles["nickname"]}>{user?.nickname}</span>
              <span className={styles["message"]}>님 회원탈퇴를 위해<br />비밀번호를 입력해주세요.</span>
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

            <LargeButton onClick={showConfirmDeleteModal}>
              확인
            </LargeButton>
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
