import { useState } from "react";
import { interestOptions } from "@/utils/onboarding";
import styles from "./modal.module.css";
import { PrimaryMediumButton } from "@/components/Buttons/PrimaryButton";
import SVGIcon from "@/components/SVGicon";

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

	return (
		<div className={styles["modal-overlay"]}>
		  <div className={styles["modal"]}>
			<h2>관심있는 운동을 선택해 주세요.</h2>
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
				  <p className={"body-md-medium"}>{interestOption}</p>
				</div>
			  ))}
			</div>
			<div className={styles["button-group"]}>
  <PrimaryMediumButton onClick={handleSave}>저장</PrimaryMediumButton>
  <PrimaryMediumButton onClick={onCancel}>취소</PrimaryMediumButton>
</div>
		  </div>
		</div>
	  );
	}