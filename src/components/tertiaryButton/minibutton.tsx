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
  background-color: transparent;
  color: #757575;
  font-family: 'Noto Sans KR';
  font-size: 12px;
  font-weight: bold; 
  border: 1px solid transparent; 
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2px;
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

const MiniButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <MiniButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </MiniButtonWrapper>
  );
};

export default MiniButton;

/* 미니버튼 사용 예시
import MiniButtonT from "@/components/tertiaryButton/minibutton";

	<MiniButtonT onClick={() => {}}>
		버튼
	</MiniButtonT>
*/


/* 비활성화 미니버튼 사용 예시
import MiniButtonT from "@/components/tertiaryButton/minibutton";

  	<MiniButtonT disabled={true}>
  		버튼
	</MiniButtonT>
  */