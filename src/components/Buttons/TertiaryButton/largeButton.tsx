import React from 'react';
import styles from './largeButton.module.css';

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
	  type="button" 
    >
      {children}
    </button>
  );
};

export default LargeButton;


/* 라지 버튼 사용 예시 
import LargeButtonT from "@/components/Buttons/TertiaryButton/largeButton";

	<LargeButtonT onClick={() => {}}>
		버튼
	</LargeButtonT>

  	<LargeButtonT disabled={true}>
  		버튼
	</LargeButtonT>
*/
