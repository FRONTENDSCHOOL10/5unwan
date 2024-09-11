import React from 'react';
import { Link } from 'react-router-dom';
import styles from './button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
  className?: string;
  type?: string; 
};

const Button: React.FC<ButtonProps & { size: 'large' | 'medium' | 'mini' }> = ({
  children,
  onClick,
  disabled,
  to,
  className,
  type,
  size,
}) => {
  const buttonClass = `${styles[`${size}-button-wrapper`]} ${className || ''}`;

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