import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './largebutton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; 
};

const LargeButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to }) => {
  
	if (to) {
    return (
      <Link to={to} className={styles["large-button-wrapper"]}>
        {children}
      </Link>
    );
  }


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
  버튼 (클릭)
</LargeButtonT>

<LargeButtonT disabled={true}>
  버튼 (비활성화)
</LargeButtonT>

<LargeButtonT to="/next-page">
  버튼 (페이지 이동)
</LargeButtonT>
*/
