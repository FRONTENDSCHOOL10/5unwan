import { useState, useEffect } from "react";
import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import {
  getPbImageUrl,
  updateUserProfile,
  getAvailableInterests,
} from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import styles from "./index.module.css";
import Header from "@/components/Header";
import DarkModeToggleButton from "@/components/DarkModeToggleButton/DarkModeToggleButton";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { SecondaryMiniButton } from "@/components/Buttons/SecondaryButton/index";
import Input from "@/components/Input/index";

// 모달 관련 라이브러리 사용
import Modal from "@/routes/MyPage/InterestModal/index";

export function Component() {
  const { user, isLoading, isError, logout } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/logout-complete");
  };

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

  // 관심 운동 관련 상태 관리
  const [availableInterests, setAvailableInterests] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 포켓베이스에서 관심 운동 목록 가져오기
  useEffect(() => {
    getAvailableInterests().then((interests) => {
      setAvailableInterests(interests);
    });
  }, []);

  const handleSaveChanges = () => {
    const updateData = {
      nickname,
      weight,
      height,
      dob,
      gender,
      interests: selectedInterests,
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

  // 관심 운동 선택 처리 함수
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className={styles.container}>
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
              className={`${styles.avatar} ${
                isEditMode ? styles.hoverable : ""
              }`}
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
            <Input
              value={user?.email || ""}
              disabled
              isDark={false}
              labelHide={true}
              errorTextHide={true}
            />
          </div>

          <div className={styles["input-disabled-container"]}>
            <label className={styles.label}>비밀번호</label>
            <Input
              value="고객센터를 통해 변경해주세요."
              disabled
              isDark={false}
              labelHide={true}
              errorTextHide={true}
            />
          </div>

          {/* 닉네임 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>닉네임</label>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              isDark={false}
              labelHide={true}
              errorTextHide={true}
            />
          </div>

          {/* 성별 선택 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>성별</label>
            <div className={styles["gender-container"]}>
              <SecondaryMiniButton
                onClick={() => setGender("M")}
                className={`${styles["gender-button"]} ${
                  gender === "M" ? styles.selected : ""
                }`}
              >
                남자
              </SecondaryMiniButton>
              <SecondaryMiniButton
                onClick={() => setGender("F")}
                className={`${styles["gender-button"]} ${
                  gender === "F" ? styles.selected : ""
                }`}
              >
                여자
              </SecondaryMiniButton>
            </div>
          </div>

          {/* 생년월일 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>생년월일</label>
            <Input
              value={dob}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue
                  .replace(/[^0-9]/g, "")
                  .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
                setDob(formattedValue);
              }}
              placeholder="yyyy-mm-dd"
              max={10}
              isDark={false}
              labelHide={true}
              errorTextHide={true}
            />
          </div>

          {/* 키 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>키</label>
            <Input
              type="number"
              value={height.toString()}
              onChange={(e) => setHeight(Number(e.target.value))}
              isDark={false}
              labelHide={true}
              errorTextHide={true}
            />
          </div>

          {/* 몸무게 입력 */}
          <div className={styles["input-container"]}>
            <label className={styles["label"]}>몸무게</label>
            <Input
              type="number"
              value={weight.toString()}
              onChange={(e) => setWeight(Number(e.target.value))}
              isDark={false}
              labelTitle="몸무게"
              labelHide={true}
              errorTextHide={true}
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

          <div className={styles["interests-header"]}>
            <h3 className={styles["interest-title"]}>관심 운동</h3>
            <span className={styles["edit-interest"]}>수정</span>
          </div>
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

          {/* 구분선 추가 */}
          <div className={styles["divider-line"]}></div>

          {/* 다크모드 */}
          <div className={styles["interests-header"]}>
            <h3 className={styles["interest-title"]}>다크 모드</h3>
          </div>
          <div className={styles.interestsList}>
            <DarkModeToggleButton /> {/* Use DarkModeToggleButton */}
          </div>

          {/* 구분선 추가 */}
          <div className={styles["divider-line"]}></div>

          {/* 계정 관련 섹션 */}
          <div className={styles["account-section"]}>
            <h3>계정</h3>
            <button onClick={handleLogout}>로그아웃</button>
            <br />
            <button onClick={() => navigate("/delete-account")}>
              회원 탈퇴
            </button>
          </div>
        </div>
      )}
      {/* 관심 운동 수정 모달 */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContent}>
            <h2>관심 운동 선택</h2>
            <div className={styles.interestsList}>
              {availableInterests.map((interest, index) => (
                <div key={index} className={styles.interest}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                    />
                    {interest}
                  </label>
                </div>
              ))}
            </div>
            <PrimaryLargeButton
              onClick={() => {
                setIsModalOpen(false); // 모달 닫기
                handleSaveChanges(); // 저장
              }}
            >
              저장
            </PrimaryLargeButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

Component.displayName = "MyPageRoute";
