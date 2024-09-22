import { useState } from "react";
import { interestOptions } from "@/utils/onboarding";
import styles from "./modal.module.css";
import { PrimaryLargeButton } from "@/components/Buttons/PrimaryButton";
import SVGIcon from "@/components/SVGicon";

export type InterestModalProps = {
  onSave: (selectedInterests: string[]) => void;
  userInterests: string[]; // 기존에 저장된 관심사
};

export default function InterestModal({ onSave, userInterests }: InterestModalProps) {
  const [formData, setFormData] = useState<Record<string, boolean>>(() => {
    return interestOptions.reduce((acc, interest) => {
      acc[interest] = userInterests.includes(interest);
      return acc;
    }, {} as Record<string, boolean>);
  });

  const handleSave = () => {
    const selectedInterests = Object.keys(formData).filter((interest) => formData[interest]);
    onSave(selectedInterests);
  };

  const handleUpdateFormData = (name: string, checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  return (
    <div className={styles["modal-overlay"]}> {/* 모달 오버레이 추가 */}
      <div className={styles["modal"]}> {/* 모달 자체 */}
        <h2>관심있는 운동을 선택해 주세요.</h2>
        <div className={styles["input-group"]}>
          {interestOptions.map((interestOption) => (
            <div key={interestOption}>
              <input
                id={`interest-${interestOption}`}
                name={interestOption}
                type="checkbox"
                checked={formData[interestOption] || false}
                onChange={(e) => handleUpdateFormData(interestOption, e.target.checked)}
                className={styles.hiddenInput}
              />
              <div
                className={styles["image-box"]}
                onClick={() => handleUpdateFormData(interestOption, !formData[interestOption])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateFormData(interestOption, !formData[interestOption]);
                  }
                }}
              >
                <img src={`/image/interests-img-${interestOption}.jpg`} alt={interestOption} />
                {formData[interestOption] && (
                  <span className={styles["icon-box"]}>
                    <SVGIcon width={50} height={50} iconId="iconCheck" />
                  </span>
                )}
              </div>
              <p className={"body-md-medium"}>{interestOption}</p>
            </div>
          ))}
        </div>
        <PrimaryLargeButton onClick={handleSave}>저장</PrimaryLargeButton>
      </div>
    </div>
  );
}