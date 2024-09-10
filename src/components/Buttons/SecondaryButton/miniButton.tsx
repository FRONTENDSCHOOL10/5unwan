import React from 'react';
import { Link } from 'react-router-dom';
import styles from './miniButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; 
};

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to }) => {
  if (to) {

    return (
      <Link to={to} className={styles["mini-button-wrapper"]}>
        {children}
      </Link>
    );
  }


  return (
    <button
      className={styles["mini-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );

};

export default MiniButton;



/* 버튼 사용 예시
import MiniButtonS from "@/components/Buttons/SecondaryButton/miniButton";

<MiniButtonS onClick={() => {}}>
  버튼 (클릭)
</MiniButtonS>

<MiniButtonS disabled={true}>
  버튼 (비활성화)
</MiniButtonS>

<MiniButtonS to="/next-page">
  버튼 (페이지 이동)
</MiniButtonS>
  */