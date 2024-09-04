import React from 'react';
import styles from './minibutton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles["mini-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MiniButton;

/* 버튼 사용 예시
import MiniButtonS from "@/components/secondaryButton/minibutton";

	<MiniButtonS onClick={() => {}}>
		버튼
	</MiniButtonS>

  	<MiniButtonS disabled={true}>
  		버튼
	</MiniButtonS>
  */