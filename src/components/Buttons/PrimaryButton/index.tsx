import React from "react";
import { Link } from "react-router-dom";
import styles from "./button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  className?: string;
  type?: string;
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

export const PrimaryLargeButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="large" />
);

export const PrimaryMediumButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="medium" />
);

export const PrimaryMiniButton: React.FC<ButtonProps> = (props) => (
  <Button {...props} size="mini" />
);

export default { PrimaryLargeButton, PrimaryMediumButton, PrimaryMiniButton };

/* 
import { PrimaryLargeButton, PrimaryMediumButton, PrimaryMiniButton } from "@/components/Buttons/PrimaryButton/index";

      <PrimaryLargeButton onClick={() => console.log('Large Button Clicked')}>
        큰 버튼 (클릭)
      </SecondaryLargeButton>

      <PrimaryMediumButton disabled={true}>
        중간 버튼 (비활성화)
      </SecondaryMediumButton>

      <PrimaryMiniButton to="/next-page">
        작은 버튼 (페이지 이동)
      </PrimaryMiniButton>
*/
