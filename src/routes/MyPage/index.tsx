import { useCurrentUserQuery } from "@/hooks/user";
import { useNavigate } from "react-router-dom";
import { deleteUser, getPbImageUrl, updateUserProfile, logout } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./myPageModal.module.css";
import Input from "@/components/Input/index";
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";
import MiniButtonT from "@/components/Buttons/SecondaryButton/miniButton";
import MediumButton from "@/components/Buttons/PrimaryButton/mediumButton";
import MiniButton from "@/components/Buttons/PrimaryButton/miniButton";

export default function MyPage() {
	const { user, isLoading, isError } = useCurrentUserQuery(); 
	const navigate = useNavigate(); 
	const queryClient = useQueryClient(); 

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
			navigate("/logout-complete");  
		},
	});

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
					setIsEditMode(false);
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
			className={styles["edit-icon"]}
			onClick={() => {
			  setIsEditMode(true);
			  setGender(user?.gender || "");
			}}
		  >
			<use xlinkHref="/src/components/SVGicon/svgSprites.svg#iconEdit"></use>
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
			  <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
			</label>
  
			<Input label="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
  
			<div className={styles["gender-container"]}>
			  <MiniButtonT
				className={`${gender === "M" ? styles.active : ""}`}
				onClick={() => setGender("M")}
			  >
				남자
			  </MiniButtonT>
			  <MiniButtonT
				className={`${gender === "F" ? styles.active : ""}`}
				onClick={() => setGender("F")}
			  >
				여자
			  </MiniButtonT>
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
						value={height.toString()} 
						type="number"
						onChange={(e) => setHeight(Number(e.target.value))}
					/>

					<Input
						label="몸무게"
						value={weight.toString()} 
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
					<button onClick={() => navigate("/delete-account")}>회원 탈퇴</button>
				</div>
			)}
		</div>
	);
}
