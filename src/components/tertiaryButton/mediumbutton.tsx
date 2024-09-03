import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const MediumButtonWrapper = styled.button<ButtonProps>`
  width: 140px;  
  height: 44px; 
  background-color: transparent;
  color: #757575;
  font-family: 'Noto Sans KR';
  font-size: 14px;
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

const MediumButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <MediumButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </MediumButtonWrapper>
  );
};

export default MediumButton;

/* 미디엄 버튼 사용 예시 
import MediumButtonT from "@/components/tertiaryButton/mdiumbutton";

	<MediumButtonT onClick={() => {}}>
		버튼
	</MediumButtonT>
*/

/* 비활성화 미디엄 버튼 사용 예시
import MediumButtonT from "@/components/tertiaryButton/mdiumbutton";

  	<MediumButtonT disabled={true}>
  		버튼
	</MediumButtonT>
*/
