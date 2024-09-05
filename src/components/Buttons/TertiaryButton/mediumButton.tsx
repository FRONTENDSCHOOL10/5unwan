import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './mediumButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
};

const MediumButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to }) => {
  if (to) {
  
    return (
      <Link to={to} className={styles["medium-button-wrapper"]}>
        {children}
      </Link>
    );
  }


  return (
    <button
      className={styles["medium-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );

};

export default MediumButton;


/* 미디엄 버튼 사용 예시 
import MediumButtonT from "@/components/Buttons/TertiaryButton/mediumButton";

<MediumButtonT onClick={() => {}}>
  버튼 (클릭)
</MediumButtonT>

<MediumButtonT disabled={true}>
  버튼 (비활성화)
</MediumButtonT>

<MediumButtonT to="/next-page">
  버튼 (페이지 이동)
</MediumButtonT>
*/
