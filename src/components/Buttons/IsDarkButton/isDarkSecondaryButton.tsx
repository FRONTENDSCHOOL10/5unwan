import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './isDarkSecondaryButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size: 'large' | 'medium' | 'mini';
  to?: string; 
};

const IsDarkButton: React.FC<ButtonProps> = ({ children, onClick, disabled, size, to }) => {
  const buttonClass =
    size === 'large'
      ? styles["large-button-wrapper"]
      : size === 'medium'
      ? styles["medium-button-wrapper"]
      : styles["mini-button-wrapper"];

  if (to) {

    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );
  }

 
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default IsDarkButton;



/* 
import IsDarkSecondaryButton from "@/components/Buttons/IsDarkButton/isDarkSecondaryButton";

<IsDarkSecondaryButton size="large" onClick={() => {}}>
  큰 버튼
</IsDarkSecondaryButton>

<IsDarkSecondaryButton size="medium" onClick={() => {}}>
  중간 버튼
</IsDarkSecondaryButton>

<IsDarkSecondaryButton size="mini" onClick={() => {}}>
  작은 버튼
</IsDarkSecondaryButton>

<IsDarkSecondaryButton size="large" disabled={true}>
  비활성화된 버튼
</IsDarkSecondaryButton>

<IsDarkSecondaryButton size="large" to="/next-page">
  페이지 이동 버튼
</IsDarkSecondaryButton>
*/