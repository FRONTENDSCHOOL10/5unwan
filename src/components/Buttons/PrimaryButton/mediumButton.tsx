import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mediumButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; 
  className?: string;
};

const MediumButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to, className }) => {
  if (to) {

    return (
      <Link 
        to={to} 
        className={`${styles["medium-button-wrapper"]} ${className}`} 
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${styles["medium-button-wrapper"]} ${className}`} 
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
import MediumButton from "@/components/Buttons/PrimaryButton/mediumButton";

<MediumButton onClick={() => {}}>
  버튼
</MediumButton>

<MediumButton disabled={true}>
  버튼
</MediumButton>

<MediumButton to="/next-page">
  버튼 (페이지 이동)
</MediumButton>
*/