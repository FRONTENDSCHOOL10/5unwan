import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './mediumButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
};

const MediumButtonS: React.FC<ButtonProps> = ({ children, onClick, disabled, to }) => {
  if (to) {

    return (
      <Link to={to} className={styles['medium-button-wrapper']}>
        {children}
      </Link>
    );
  }

 
  return (
    <button
      className={styles['medium-button-wrapper']}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
  
};

export default MediumButtonS;


/* 버튼 사용 예시 
import MediumButtonS from "@/components/Buttons/SecondaryButton/mediumButton";

<MediumButtonS onClick={() => {}}>
  버튼 (클릭)
</MediumButtonS>

<MediumButtonS disabled={true}>
  버튼 (비활성화)
</MediumButtonS>

<MediumButtonS to="/next-page">
  버튼 (페이지 이동)
</MediumButtonS>
*/
