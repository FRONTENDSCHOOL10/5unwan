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
  background-color: transparent;
  color: #757575;
  font-family: 'Noto Sans KR';
  font-size: 14px; 
  font-weight: bold;
  border: 1px solid transparent; 
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: transparent;
    color: #424242;
    border-color: transparent; 
  }

  &:active {
    background-color: transparent;
    color: #424242;
    border-color: transparent; 
  }

  &:disabled {
    background-color: transparent;
    color: #BDBDBD;
    border-color: transparent; 
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
import LargeButtonT from "@/components/tertiaryButton/largebutton";

	<LargeButtonT onClick={() => {}}>
		버튼
	</LargeButtonT>
*/

/* 비활성화 라지 버튼 사용 예시
import LargeButtonT from "@/components/tertiaryButton/largebutton";

  	<LargeButtonT disabled={true}>
  		버튼
	</LargeButtonT>
*/
