import React from 'react';
import styles from './MiniButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button
      className={styles.miniButtonWrapper}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default MiniButton;


/* 미니버튼 사용 예시
import MiniButton from "@/components/primaryButton/minibutton";

	<MiniButton onClick={() => {}}>
		버튼
	</MiniButton>
*/


/* 비활성화 미니버튼 사용 예시
import MiniButton from "@/components/primaryButton/minibutton";

  	<MiniButton disabled={true}>
  		버튼
	</MiniButton>
  */