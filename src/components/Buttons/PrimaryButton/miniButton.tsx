import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './minibutton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; 
  className?: string; // className 추가
};

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to, className }) => {
  if (to) {

    return (
      <Link 
        to={to} 
        className={`${styles["mini-button-wrapper"]} ${className}`} // 전달받은 className 추가
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles["mini-button-wrapper"]} ${className}`} // 전달받은 className 추가
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
import MiniButton from "@/components/Buttons/PrimaryButton/miniButton";

<MiniButton onClick={() => {}}>
  버튼
</MiniButton>

<MiniButton disabled={true}>
  버튼
</MiniButton>

<MiniButton to="/next-page">
  버튼 (페이지 이동)
</MiniButton>
*/