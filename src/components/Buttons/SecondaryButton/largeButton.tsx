import React from 'react';
import { Link } from 'react-router-dom';
import styles from './largeButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string;
};

const LargeButtonS: React.FC<ButtonProps> = ({ children, onClick, disabled, to }) => {
  if (to) {

    return (
      <Link to={to} className={styles["large-button-wrapper"]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={styles["large-button-wrapper"]}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default LargeButtonS;



/* 버튼 사용 예시
import LargeButtonS from "@/components/Buttons/SecondaryButton/largeButton";

<LargeButtonS onClick={() => {}}>
  버튼 (클릭)
</LargeButtonS>

<LargeButtonS disabled={true}>
  버튼 (비활성화)
</LargeButtonS>

<LargeButtonS to="/next-page">
  버튼 (페이지 이동)
</LargeButtonS>

*/
