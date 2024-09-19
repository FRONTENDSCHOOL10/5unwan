import { useState } from "react";
import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import { getPbImageUrl, updateUserProfile } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import styles from "./index.module.css";

import Header from "@/components/Header";
import DarkModeToggleButton from "@/components/DarkModeToggleButton/DarkModeToggleButton";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { TertiaryMiniButton } from "@/components/Buttons/TertiaryButton/index";

export default function MyPage() {
  const { user, isLoading, isError, logout } = useCurrentUser();
  const navigate = useNavigate();
  const matches = useMatches();
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [weight, setWeight] = useState(user?.weight || 0);
  const [height, setHeight] = useState(user?.height || 0);
  const [dob, setDob] = useState(user?.dob || "");
  const [gender, setGender] = useState<"" | "M" | "F">(user?.gender || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState(
    user?.avatar ? getPbImageUrl(user, user.avatar) : ""
  );

  const handleSaveChanges = () => {
    const updateData = {
      nickname,
      weight,
      height,
      dob,
      gender,
      avatar: avatarFile || undefined,
    };

    if (user?.id) {
      updateUserProfile(user.id, updateData).then(() => {
        setIsEditMode(false);
        navigate("/my-page");
      });
    }
  };

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
  const profileImageUrl = user
    ? getPbImageUrl(user, user?.avatar || "")
    : "/default-profile.png";

  const hideHeader = matches.some(
    (match) => (match.handle as RouteHandle)?.hideHeader
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div>
      {!hideHeader && (
        <>
          {!isEditMode ? (
            <Header
              className={styles.header}
              leftIconVisible
              rightIconId="iconEdit"
              rightIconVisible
              rightonClick={() => setIsEditMode(true)} // 편집 모드로 전환
            />
          ) : (
            <Header
              className={styles.header}
              leftIconId="iconArrowsLeft"
              leftIconVisible
              leftonClick={() => setIsEditMode(false)} // 편집 모드 종료
              rightIconVisible
            />
          )}
        </>
      )}

      {isEditMode ? (
        <div className={styles["edit-mode-container"]}>
          {/* 프로필 이미지 선택 기능 */}
          <label>
            <img
              src={profilePreview || profileImageUrl || "/default-profile.png"}
              alt="프로필 이미지"
              className={`${styles.avatar} ${isEditMode ? styles.hoverable : ""}`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>

          <div className={styles["input-disabled-container"]}>
            <label className={styles["label"]}>아이디</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              className={styles["input-class"]}
            />
          </div>

          <div className={styles["input-disabled-container"]}>
            <label className={styles["label"]}>비밀번호</label>
            <input
              type="text"
              value="고객센터를 통해 변경해주세요."
              disabled
              className={styles["input-class"]}
            />
          </div>

          {/* 닉네임 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles["input-class"]}
            />
          </div>

          {/* 성별 선택 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>성별</label>
            <div className={styles["gender-container"]}>
              <TertiaryMiniButton
                onClick={() => setGender("M")}
                className={`${styles["gender-button"]} ${gender === "M" ? styles.selected : ""}`}
              >
                남자
              </TertiaryMiniButton>
              <TertiaryMiniButton
                onClick={() => setGender("F")}
                className={`${styles["gender-button"]} ${gender === "F" ? styles.selected : ""}`}
              >
                여자
              </TertiaryMiniButton>
            </div>
          </div>

          {/* 생년월일 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>생년월일</label>
            <input
              type="text"
              value={dob}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue
                  .replace(/[^0-9]/g, "")
                  .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                setDob(formattedValue);
              }}
              placeholder="yyyy-mm-dd"
              maxLength={10}
              className={styles["input-class"]}
            />
          </div>

          {/* 키 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>키</label>
            <input
              type="number"
              value={height.toString()}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={styles["input-class"]}
            />
          </div>

          {/* 몸무게 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>몸무게</label>
            <input
              type="number"
              value={weight.toString()}
              onChange={(e) => setWeight(Number(e.target.value))}
              className={styles["input-class"]}
            />
          </div>

          <div className={styles["button-container"]}>
            <PrimaryLargeButton onClick={handleSaveChanges}>
              수정완료
            </PrimaryLargeButton>
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

          {/* 구분선 추가 */}
          <div className={styles["divider-line"]}></div>

          {/* 계정 관련 섹션 */}
          <div className={styles["account-section"]}>
            <h3>계정</h3>
            <button onClick={logout}>로그아웃</button>
            <br />
            <button onClick={() => navigate("/delete-account")}>
              회원 탈퇴
            </button>
            <br />
            <DarkModeToggleButton /> {/* Use DarkModeToggleButton */}
          </div>
        </div>
      )}
    </div>
  );
}
