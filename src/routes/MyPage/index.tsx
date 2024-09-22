import { useState } from "react";
import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import { getPbImageUrl, updateUserProfile } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import styles from "./index.module.css";
import Header from "@/components/Header";
import DarkModeToggleButton from "@/components/DarkModeToggleButton/DarkModeToggleButton";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import { SecondaryMiniButton } from "@/components/Buttons/SecondaryButton/index";
import Input from "@/components/Input/index";
import SVGIcon from "@/components/SVGicon";
import InterestModal from "@/routes/MyPage/InterestModal/index"; 

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


    // 관심사 모달을 위한 상태
	const [showInterestModal, setShowInterestModal] = useState(false); // 관심사 모달 상태 추가
	const [selectedInterests, setSelectedInterests] = useState<string[]>(user?.interests || []); // 선택된 관심사 상태

	
  const handleSaveChanges = () => {
    const updateData = {
      nickname,
      weight,
      height,
      dob,
      gender,
      avatar: avatarFile || undefined,
	  interests: selectedInterests,
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
    <div className={styles.container}>
      {!hideHeader && (
        <>
          {!isEditMode ? (
            <Header
              className={styles.header}
              leftIconVisible
              rightIconId="iconEdit"
              rightIconVisible
              rightonClick={() => setIsEditMode(true)} 
            />
          ) : (
            <Header
              className={styles.header}
              leftIconId="iconArrowsLeft"
              leftIconVisible
              leftonClick={() => setIsEditMode(false)}
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
      className={`${styles["gender-button"]} ${gender === "M" ? styles.selected : ""}`}
    >
      남자
      {gender === "M" && (
        <span className={styles["icon-box"]}>
          <SVGIcon width={20} height={20} iconId="iconCheck" />
        </span>
      )}
    </SecondaryMiniButton>
    <SecondaryMiniButton
      onClick={() => setGender("F")}
      className={`${styles["gender-button"]} ${gender === "F" ? styles.selected : ""}`}
    >
      여자
      {gender === "F" && (
        <span className={styles["icon-box"]}>
          <SVGIcon width={20} height={20} iconId="iconCheck" />
        </span>
      )}
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

    {/* 관심사 수정 기능 */}
	<div className={styles["interests-container"]}>
	<h3 className={styles["interest-title"]}>관심 운동</h3>
	<span className={styles["edit-interest"]} onClick={() => setShowInterestModal(true)}>수정</span>
  {/* 선택된 관심사 목록 표시 */}
  <ul>
    {selectedInterests.map((interest) => (
      <li key={interest}>{interest}</li>
    ))}
  </ul>
</div>

          {/* 구분선 추가 */}
          <div className={styles["divider-line"]}></div>

          {/* 계정 관련 섹션 */}
          <div className={styles["account-section"]}>
            <h3>계정</h3>
<button
  onClick={async () => {
    await logout(); 
    navigate("/logout-complete"); 
  }}
>
  로그아웃
</button>
            <br />
            <button onClick={() => navigate("/delete-account")}>
              회원 탈퇴
            </button>
            <br />
            <DarkModeToggleButton /> {/* Use DarkModeToggleButton */}
          </div>
        </div>
      )}
      {/* 관심사 선택 모달 */}
      {showInterestModal && (
        <InterestModal 
          userInterests={selectedInterests} 
          onSave={(newInterests) => {
            setSelectedInterests(newInterests);
            setShowInterestModal(false);
          }}
        />
      )}

    </div>
  );
}
