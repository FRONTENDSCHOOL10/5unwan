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
      className={styles['large-button-wrapper']}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default LargeButton;


/* 라지 버튼 사용 예시 
import LargeButtonT from "@/components/tertiaryButton/largebutton";

	<LargeButtonT onClick={() => {}}>
		버튼
	</LargeButtonT>

  	<LargeButtonT disabled={true}>
  		버튼
	</LargeButtonT>
*/
