import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  // onClick?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  to?: string;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button: React.FC<ButtonProps & { size: "large" | "medium" | "mini" }> = ({
  children,
  onClick,
  disabled,
  to,
  className,
  type,
  size,
}) => {
  const buttonClass = `${styles[`${size}-button-wrapper`]} ${className || ""}`;

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
      type={type}
    >
      {children}
    </button>
  );
};

export const SecondaryLargeButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="large" />
);

export const SecondaryMediumButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="medium" />
);

export const SecondaryMiniButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="mini" />
);

export default {
  SecondaryLargeButton,
  SecondaryMediumButton,
  SecondaryMiniButton,
};

/* 
import { SecondaryLargeButton, SecondaryMediumButton, SecondaryMiniButton } from '@/components/Buttons/SecondaryButton';

      <SecondaryLargeButton onClick={() => console.log('Large Button Clicked')}>
        큰 버튼 (클릭)
      </SecondaryLargeButton>

      <SecondaryMediumButton disabled={true}>
        중간 버튼 (비활성화)
      </SecondaryMediumButton>

      <SecondaryMiniButton to="/next-page">
        작은 버튼 (페이지 이동)
      </SecondaryMiniButton>
*/
