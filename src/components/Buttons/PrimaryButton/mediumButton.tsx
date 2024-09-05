import React from 'react';
import styles from './mediumbutton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MediumButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles["medium-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
	  type="button" 
    >
      {children}
    </button>
  );
};

export default MediumButton;


/* 버튼 사용 예시 

import MediumButton from "@/components/Buttons/PrimaryButton/MediumButton";

<MediumButton onClick={() => {}}>
  버튼
</MediumButton>

<MediumButton disabled={true}>
  버튼
</MediumButton>

*/