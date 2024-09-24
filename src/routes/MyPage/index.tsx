import { useState, useRef } from "react";
import { useNavigate, useMatches } from "react-router-dom";
import { RouteHandle } from "@/router";
import { getPbImageUrl, updateUserProfile } from "@/api/pocketbase";
import { useCurrentUser } from "@/hooks/user";
import styles from "./index.module.css";
import classNames from "classnames";
import Header from "@/components/Header";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";
import DarkModeToggleButton from "@/components/DarkModeToggleButton/DarkModeToggleButton";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton/index";
import IsDarkPrimaryButton from "@/components/Buttons/IsDarkButton/isDarkPrimaryButton";
import IsDarkSecondaryButton from "@/components/Buttons/IsDarkButton/isDarkSecondaryButton";
import Input from "@/components/Input/index";
import SVGIcon from "@/components/SVGicon";
import InterestModal from "@/routes/MyPage/InterestModal/index";
import { SecondaryMiniButton } from "@/components/Buttons/SecondaryButton/index";

export function Component() {
  const { user, isLoading, isError, logout } = useCurrentUser();
  const navigate = useNavigate();
  const avatarImageRef = useRef<HTMLImageElement | null>(null);

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
  const defaultAvatarUrl = "/avatar-placeholder.webp";
  const profileImageUrl = user?.avatar
    ? getPbImageUrl(user, user.avatar)
    : defaultAvatarUrl;
  const [profilePreview, setProfilePreview] = useState<string | null>(
    profileImageUrl
  );
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || []
  );

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
        console.log("User ID found:", user.id);
        await updateUserProfile(user.id, updateData);
        setIsEditMode(false);
        console.log("Profile updated successfully");
        navigate("/my-page");
      } else {
        console.error("User ID is undefined or null");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  const { isDark } = useDarkMode();

  const resizeImage = (file: File): Promise<File> => {
    const MAX_WIDTH = 800;
    const MAX_HEIGHT = 800;

    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;

        img.onload = () => {
          let width = img.width;
          let height = img.height;

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

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const resizedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                  });
                  resolve(resizedFile);
                } else {
                  reject(new Error("Canvas blob creation failed"));
                }
              },
              file.type,
              0.8
            );
          }
        };
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const birthDate = user?.dob ? new Date(user.dob) : new Date();
  const age = new Date().getFullYear() - birthDate.getFullYear();

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
    <div
      className={classNames(styles.container, { [styles["is-dark"]]: isDark })}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
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
              <div className={styles["avatar-box"]}>
                <figure className={styles["image-container"]}>
                  <img
                    aria-hidden="true"
                    ref={avatarImageRef}
                    src={profilePreview || "/avatar-placeholder.webp"}
                    className={styles.avatar}
                    alt="프로필 이미지"
                  />
                </figure>
                <label className={styles["image-edit"]} role="button">
                  <span className="sr-only">
                    <Input
                      name="newAvatarFile"
                      type="file"
                      onChange={handleFileChange}
                      labelHide
                      errorTextHide
                      accept=".jpg, .webp, .svg, .gif"
                      aria-label="프로필사진 업로드"
                    />
                  </span>
                  <span className={styles["icon-box"]}>
                    <SVGIcon width={20} height={20} iconId="iconAdd" />
                  </span>
                </label>
              </div>

              <div className={styles["input-container"]}>
                <div className={styles["input-wrapper"]}>
                  <div
                    className={`${styles["input-content"]} ${styles["input-disabled"]}`}
                  >
                    <label className={styles.label}>아이디</label>
                    {isDark ? (
                      <Input
                        value={user?.email || ""}
                        disabled
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
                      <Input
                        value={user?.email || ""}
                        disabled
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                  <div
                    className={`${styles["input-content"]} ${styles["input-disabled"]}`}
                  >
                    <label className={styles.label}>비밀번호</label>
                    {isDark ? (
                      <Input
                        value="고객센터를 통해 변경해주세요."
                        disabled
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
                      <Input
                        value="고객센터를 통해 변경해주세요."
                        disabled
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                  <div className={styles["input-content"]}>
                    <label className={styles["label"]}>닉네임</label>
                    {isDark ? (
                      <Input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
                      <Input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                  <div className={styles["input-content"]}>
                    <label className={styles["label"]}>성별</label>
                    <div className={styles["gender-content"]}>
                      {isDark ? (
                        <IsDarkSecondaryButton
                          size="medium"
                          onClick={() => setGender("M")}
                          className={`${styles["gender-button"]} ${
                            gender === "M" ? styles.selected : ""
                          }`}
                        >
                          남자
                          {gender === "M" && (
                            <span className={styles["icon-box"]}>
                              <SVGIcon
                                width={20}
                                height={20}
                                iconId="iconCheck"
                              />
                            </span>
                          )}
                        </IsDarkSecondaryButton>
                      ) : (
                        <SecondaryMiniButton
                          onClick={() => setGender("M")}
                          className={`${styles["gender-button"]} ${
                            gender === "M" ? styles.selected : ""
                          }`}
                        >
                          취소하기
                        </SecondaryMiniButton>
                      )}
                      {isDark ? (
                        <IsDarkSecondaryButton
                          size="medium"
                          onClick={() => setGender("F")}
                          className={`${styles["gender-button"]} ${
                            gender === "F" ? styles.selected : ""
                          }`}
                        >
                          여자
                          {gender === "F" && (
                            <span className={styles["icon-box"]}>
                              <SVGIcon
                                width={20}
                                height={20}
                                iconId="iconCheck"
                              />
                            </span>
                          )}
                        </IsDarkSecondaryButton>
                      ) : (
                        <SecondaryMiniButton
                          onClick={() => setGender("F")}
                          className={`${styles["gender-button"]} ${
                            gender === "F" ? styles.selected : ""
                          }`}
                        >
                          여자
                          {gender === "F" && (
                            <span className={styles["icon-box"]}>
                              <SVGIcon
                                width={20}
                                height={20}
                                iconId="iconCheck"
                              />
                            </span>
                          )}
                        </SecondaryMiniButton>
                      )}
                    </div>
                  </div>
                  <div className={styles["input-content"]}>
                    <label className={styles["label"]}>생년월일</label>
                    {isDark ? (
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
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
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
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                  <div className={styles["input-content"]}>
                    <label className={styles["label"]}>키</label>
                    {isDark ? (
                      <Input
                        type="number"
                        value={height.toString()}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
                      <Input
                        type="number"
                        value={height.toString()}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                  <div className={styles["input-content"]}>
                    <label className={styles["label"]}>몸무게</label>
                    {isDark ? (
                      <Input
                        type="number"
                        value={weight.toString()}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        labelHide
                        errorTextHide
                        isDark
                      />
                    ) : (
                      <Input
                        type="number"
                        value={weight.toString()}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        labelHide
                        errorTextHide
                      />
                    )}
                  </div>
                </div>
              </div>

              {isDark ? (
                <IsDarkPrimaryButton size="large" onClick={handleSaveChanges}>
                  수정완료
                </IsDarkPrimaryButton>
              ) : (
                <PrimaryLargeButton onClick={handleSaveChanges}>
                  수정완료
                </PrimaryLargeButton>
              )}
            </div>
          ) : (
            <div>
              <div className={styles["avatar-box"]}>
                <img
                  src={
                    profilePreview || profileImageUrl || "/default-profile.png"
                  }
                  alt="프로필 이미지"
                  className={styles.avatar}
                />
              </div>

              <h1 className={`body-xl-bold ${styles["main-nickname"]}`}>
                {user?.nickname || "사용자 이름"}
              </h1>

              <div className={styles["profile-stats-container"]}>
                <div className={styles["stat-item"]}>
                  {user?.weight || 0}
                  <span className={`body-sm-bold ${styles["desc"]}`}>kg</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles["stat-item"]}>
                  {user?.height || 0}
                  <span className={`body-sm-bold ${styles["desc"]}`}>cm</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles["stat-item"]}>
                  {age || "알 수 없음"}
                  <span className={`body-sm-bold ${styles["desc"]}`}>세</span>
                </div>
              </div>

              <div className={styles["interests-container"]}>
                <div className={styles["interest-header"]}>
                  <h3 className={`body-md-bold ${styles["interest-title"]}`}>
                    관심 운동
                  </h3>
                  <span
                    className={`body-sm-bold ${styles["edit-interest"]}`}
                    onClick={() => setShowInterestModal(true)}
                  >
                    수정하기
                  </span>
                </div>
                <div className={styles["interest-list"]}>
                  {selectedInterests.map((interest) => (
                    <div key={interest} className={styles["interest-item"]}>
                      <img
                        src={`/image/interests-img-${interest}.jpg`}
                        alt={interest}
                        className={styles["interest-image"]}
                      />
                      <span
                        className={`body-sm-bold ${styles["interest-tit"]}`}
                      >
                        {interest}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles["divider-line"]}></div>

              <h3 className={`body-md-bold ${styles["interest-title"]}`}>
                다크 모드
              </h3>

              <div className={styles["darkmode-toggle"]}>
                <DarkModeToggleButton />
              </div>

              <div className={styles["divider-line"]}></div>

              <div className={styles["account-section"]}>
                <h3 className={`body-md-bold ${styles["interest-title"]}`}>
                  계정
                </h3>
                <button onClick={handleLogout} className="body-sm-bold">
                  로그아웃
                </button>
                <br />
                <button
                  onClick={() => navigate("/delete-account")}
                  className="body-sm-bold"
                >
                  회원 탈퇴
                </button>
                <br />
              </div>
            </div>
          )}

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
      </div>
    </div>
  );
}

Component.displayName = "MyPageRoute";
