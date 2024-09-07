import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './largeButton.module.css';

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	to?: string;
	className?: string;  
  }
  
  const LargeButton: React.FC<ButtonProps> = ({ children, onClick, disabled, to, className }) => {
	if (to) {
	  return (
		<Link to={to} className={`${styles["large-button-wrapper"]} ${className}`}>
		  {children}
		</Link>
	  );
	}
  
	return (
	  <button
		onClick={onClick}
		disabled={disabled}
		className={`${styles["large-button-wrapper"]} ${className}`} 
	  >
		{children}
	  </button>
	);
  };
  
  export default LargeButton;



/* 버튼 사용 예시 
import LargeButton from "@/components/Buttons/PrimaryButton/largeButton";

<LargeButton onClick={() => {}}>
  버튼
</LargeButton>

<LargeButton disabled={true}>
  버튼
</LargeButton>

<LargeButton to="/next-page">
  버튼 (페이지 이동)
</LargeButton>

*/