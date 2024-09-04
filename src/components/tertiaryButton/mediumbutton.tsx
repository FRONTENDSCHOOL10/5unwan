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
    >
      {children}
    </button>
  );
};

export default MediumButton;

/* 미디엄 버튼 사용 예시 
import MediumButtonT from "@/components/tertiaryButton/mdiumbutton";

	<MediumButtonT onClick={() => {}}>
		버튼
	</MediumButtonT>

  	<MediumButtonT disabled={true}>
  		버튼
	</MediumButtonT>
*/
