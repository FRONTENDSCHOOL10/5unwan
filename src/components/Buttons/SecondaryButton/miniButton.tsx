import React from 'react';
import { Link } from 'react-router-dom';
import styles from './miniButton.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  to?: string; 
  className?: string;
};

const MiniButtonT: React.FC<ButtonProps> = ({ children, onClick, disabled, to, className }) => {
	const buttonClass = `${styles['mini-button-wrapper']} ${className || ''}`;
  
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
		type="button"
	  >
		{children}
	  </button>
	);
  };

export default MiniButtonT;



/* 버튼 사용 예시
import MiniButtonS from "@/components/Buttons/SecondaryButton/miniButton";

<MiniButtonS onClick={() => {}}>
  버튼 (클릭)
</MiniButtonS>

<MiniButtonS disabled={true}>
  버튼 (비활성화)
</MiniButtonS>

<MiniButtonS to="/next-page">
  버튼 (페이지 이동)
</MiniButtonS>
  */