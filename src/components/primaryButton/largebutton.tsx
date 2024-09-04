import React from 'react';
import styles from './largebutton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const LargeButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles["large-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LargeButton;


/* 버튼 사용 예시 

import LargeButton from "@/components/PrimaryButton/LargeButton";

<LargeButton onClick={() => {}}>
  버튼
</LargeButton>

<LargeButton disabled={true}>
  버튼
</LargeButton>

*/

