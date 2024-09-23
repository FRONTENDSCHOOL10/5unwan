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


	const [showInterestModal, setShowInterestModal] = useState(false); // 관심사 모달 상태 추가
	const [selectedInterests, setSelectedInterests] = useState<string[]>(user?.interests || []); // 선택된 관심사 상태

	
	const handleSaveChanges = async () => {
		try {
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
			console.log("User ID found:", user.id); // 로그 추가
			await updateUserProfile(user.id, updateData);  
			setIsEditMode(false);
			console.log("Profile updated successfully");
			navigate("/my-page");
		  } else {
			console.error("User ID is undefined or null");  // 에러 로그 추가
		  }
		} catch (error) {
		  console.error("Error updating profile: ", error);  
		}
	  };

	  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
		  // 1MB 이상일 경우 리사이징
		  if (file.size > 1024 * 1024) {
			const resizedFile = await resizeImage(file);
			setAvatarFile(resizedFile);
			const previewUrl = URL.createObjectURL(resizedFile);
			setProfilePreview(previewUrl);
		  } else {
			setAvatarFile(file);
			const previewUrl = URL.createObjectURL(file);
			setProfilePreview(previewUrl);
		  }
		}
	  };
// 이미지 리사이징 함수
const resizeImage = (file: File): Promise<File> => {
	// const MAX_SIZE = 1024 * 1024; // 1MB
	const MAX_WIDTH = 800;  // 원하는 최대 너비 (픽셀)
	const MAX_HEIGHT = 800; // 원하는 최대 높이 (픽셀)
  
	return new Promise((resolve, reject) => {
	  const img = document.createElement("img");
	  const canvas = document.createElement("canvas");
	  const reader = new FileReader();
  
	  reader.onload = (e) => {
		img.src = e.target?.result as string;
  
		img.onload = () => {
		  let width = img.width;
		  let height = img.height;
  
		  // 너비/높이를 유지하면서 비율에 맞게 크기 조정
		  if (width > height) {
			if (width > MAX_WIDTH) {
			  height *= MAX_WIDTH / width;
			  width = MAX_WIDTH;
			}
		  } else {
			if (height > MAX_HEIGHT) {
			  width *= MAX_HEIGHT / height;
			  height = MAX_HEIGHT;
			}
		  }
  
		  canvas.width = width;
		  canvas.height = height;
  
		  const ctx = canvas.getContext("2d");
		  if (ctx) {
			ctx.drawImage(img, 0, 0, width, height);
  
			canvas.toBlob((blob) => {
			  if (blob) {
				// Blob을 다시 File 객체로 변환
				const resizedFile = new File([blob], file.name, {
				  type: file.type,
				  lastModified: Date.now(),
				});
				resolve(resizedFile);
			  } else {
				reject(new Error("Canvas 블롭 생성 실패"));
			  }
			}, file.type, 0.8); // 품질 설정 (0.8은 80% 품질)
		  }
		};
	  };
  
	  reader.onerror = (error) => reject(error);
	  reader.readAsDataURL(file);
	});
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
			  <br></br>
			  <br></br>
			  <br></br>
			  <PrimaryLargeButton onClick={handleSaveChanges}>
            수정완료
          </PrimaryLargeButton>
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
	<div className={styles["interest-header"]}>
    <h3 className={styles["interest-title"]}>관심 운동</h3>
    <span className={styles["edit-interest"]} onClick={() => setShowInterestModal(true)}>수정</span>
  </div>
   
  <div className={styles["interest-list"]}>
    {selectedInterests.map((interest) => (
      <div key={interest} className={styles["interest-item"]}>
        <img 
          src={`/image/interests-img-${interest}.jpg`} 
          alt={interest} 
          className={styles["interest-image"]}
        />
        <span>{interest}</span>
      </div>
    ))}
  </div>
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
            <DarkModeToggleButton />
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
    onCancel={() => setShowInterestModal(false)}
  />
)}

    </div>
  );
}
