import { useState } from "react";
import { interestOptions } from "@/utils/onboarding";
import styles from "./modal.module.css";
import classNames from "classnames";
import { PrimaryMediumButton } from "@/components/Buttons/PrimaryButton";
import { SecondaryMediumButton } from "@/components/Buttons/SecondaryButton";
import IsDarkPrimaryButton from "@/components/Buttons/IsDarkButton/isDarkPrimaryButton";
import IsDarkSecondaryButton from "@/components/Buttons/IsDarkButton/isDarkSecondaryButton";
import PageTitle from "@/components/PageTitle";
import SVGIcon from "@/components/SVGicon";
import { useDarkMode } from "@/components/DarkModeContext/DarkModeContext";

export type InterestModalProps = {
  onSave: (selectedInterests: string[]) => void;
  onCancel: () => void; 
  userInterests: string[]; 
};

export default function InterestModal({ onSave, onCancel, userInterests }: InterestModalProps) {
	const [selectedInterest, setSelectedInterest] = useState(userInterests[0] || ""); // 1개 제한
  
	const handleSave = () => {
	  onSave([selectedInterest]); // 하나만 저장
	};

	const { isDark } = useDarkMode(); // 다크모드

	return (
		<div className={classNames(styles["modal-overlay"], { [styles["is-dark"]]: isDark })}>
		  <div className={styles["modal"]}>
			<PageTitle
                large
                text={{ __html: `관심있는 운동을
                <br />
                선택해 주세요.
                ` }}
              />
			<div className={styles["input-group"]}>
			  {interestOptions.map((interestOption) => (
				<div key={interestOption} className={styles["interest-option"]}>
				  <input
					type="radio"
					id={`interest-${interestOption}`}
					name="interest"
					checked={selectedInterest === interestOption}
					onChange={() => setSelectedInterest(interestOption)}
					className={styles.hiddenInput}
				  />
				  <div
					className={`${styles["image-box"]} ${selectedInterest === interestOption ? styles.selected : ""}`}
					onClick={() => setSelectedInterest(interestOption)}
					role="button"
					tabIndex={0}
				  >
					<img src={`/image/interests-img-${interestOption}.jpg`} alt={interestOption} />
					{selectedInterest === interestOption && (
					  <span className={styles["icon-box"]}>
						<SVGIcon width={50} height={50} iconId="iconCheck" />
					  </span>
					)}
				  </div>
				  <p className={`body-md-medium ${styles["interests-tit"]}`}>{interestOption}</p>
				</div>
			  ))}
			</div>
			<div className={styles["button-group"]}>
				{isDark ? (
					<IsDarkPrimaryButton
						size="medium"
						onClick={handleSave}
					>
					저장
					</IsDarkPrimaryButton>
				) : (
					<PrimaryMediumButton
						onClick={handleSave}
					>
					저장
					</PrimaryMediumButton>
				)}

				{isDark ? (
					<IsDarkSecondaryButton
						size="medium"
						onClick={onCancel}
					>
					취소
					</IsDarkSecondaryButton>
				) : (
					<SecondaryMediumButton
						onClick={onCancel}
					>
					취소
					</SecondaryMediumButton>
				)}
			</div>
		  </div>
		</div>
	  );
	}