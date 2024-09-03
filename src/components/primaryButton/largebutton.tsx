import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const LargeButtonWrapper = styled.button<ButtonProps>`
  width: 280px; 
  height: 54px;  
  background-color: #424242;
  color: white;
  font-family: 'Noto Sans KR';
  font-size: 14px; 
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #212121;
  }

  &:active {
    background-color: #333333;
  }

  &:disabled {
    background-color: #E0E0E0;
    color: #9E9E9E;
    cursor: not-allowed;
  }
`;

const LargeButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <LargeButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </LargeButtonWrapper>
  );
};

export default LargeButton;

/* 라지 버튼 사용 예시 
import LargeButton from "@/components/primaryButton/largebutton";

	<LargeButton onClick={() => alert('Large Button Clicked!')}>
		라지버튼
	</LargeButton>
*/

/* 비활성화 라지 버튼 사용 예시
import LargeButton from "@/components/primaryButton/largebutton";

	const handleClick = () => {
  	  alert('Disabled Button Clicked!');
	  };

  	<LargeButton onClick={handleClick} disabled={true}>
  		Disabled Button
	</LargeButton>
*/
