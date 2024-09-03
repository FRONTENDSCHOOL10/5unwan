import React from 'react';
import styled from 'styled-components';


type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MiniButtonWrapper = styled.button<ButtonProps>`
  width: 63px;
  height: 42px;
  background-color: #424242;
  color: white;
  font-family: 'Noto Sans KR;
  font-size: 12px;
  font-weight: bold; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2px;
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

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <MiniButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </MiniButtonWrapper>
  );
};

export default MiniButton;



/* 미니버튼 사용 예시
import MiniButton from "@/components/primaryButton/minibutton";

	<MiniButton onClick={() => {}}>
		버튼
	</MiniButton>
*/


/* 비활성화 미니버튼 사용 예시
import MiniButton from "@/components/primaryButton/minibutton";

  	<MiniButton disabled={true}>
  		버튼
	</MiniButton>
  */