import React from 'react';
import styles from './primaryButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size: 'large' | 'medium' | 'mini'; 
};

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, disabled, size }) => {
  const buttonClass =
    size === 'large'
      ? styles["large-button-wrapper"]
      : size === 'medium'
      ? styles["medium-button-wrapper"]
      : styles["mini-button-wrapper"];

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

export default PrimaryButton;


/* 
import PrimaryButton from "@/components/darkmodeButton/primaryButton";

<PrimaryButton size="large" onClick={() => {}}>
  큰 버튼
</PrimaryButton>

<PrimaryButton size="medium" onClick={() => {}}>
  중간 버튼
</PrimaryButton>

<PrimaryButton size="mini" onClick={() => {}}>
  작은 버튼
</PrimaryButton>

<PrimaryButton size="large" disabled={true}>
  비활성화된 버튼
</PrimaryButton>
*/