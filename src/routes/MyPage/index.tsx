import { useCurrentUser } from "@/hooks/user";
import { useNavigate } from "react-router-dom";
import { deleteUser, getPbImageUrl, updateUserProfile } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./myPageModal.module.css";
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";
import MiniButton from "@/components/Buttons/SecondaryButton/miniButton";
import MediumButton from "@/components/Buttons/PrimaryButton/mediumButton";

export default function MyPage() {
  const { user, isLoading, isError, logout, updateMutation } = useCurrentUser();
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

  // 추가된 상태: 프로필 이미지 파일과 미리보기 URL 상태
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

  // 프로필 수정 저장 함수에 이미지 파일 추가
  const handleSaveChanges = () => {
    const updateData = {
      nickname,
      weight,
      height,
      dob,
      avatar: avatarFile, // 선택한 프로필 이미지 파일 추가
    };

    updateUserProfile(user.id, updateData)
      .then(() => {
        queryClient.invalidateQueries(["current-user"]);
        setIsEditMode(false);
        // setShowSaveMessage(true); // 이 부분은 코드에 없어서 주석 처리했습니다.
        // setTimeout(() => setShowSaveMessage(false), 3000);
      });
  };

  // 이미지 파일 선택 시 미리보기와 파일 저장
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file); // 선택한 파일 상태로 저장
      const previewUrl = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
      setProfilePreview(previewUrl); // 미리보기 URL 설정
    }
  };

  const birthDate = new Date(user?.dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const profileImageUrl = getPbImageUrl(user, user?.avatar || "");

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
            value={height}
            type="number"
            onChange={(e) => setHeight(Number(e.target.value))}
          />

          <Input
            label="몸무게"
            value={weight}
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
          <h1 className={styles["nickname"]}>
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
        </div>
      )}
    </div>
  );
}
