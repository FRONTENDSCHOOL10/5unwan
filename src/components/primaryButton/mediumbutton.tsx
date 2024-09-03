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
  background-color: #424242;
  color: white;
  font-family: 'Noto Sans KR';
  font-size: 14px;
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

const MediumButton: React.FC<ButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <MediumButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </MediumButtonWrapper>
  );
};

export default MediumButton;

/* 미디엄 버튼 사용 예시 
import MediumButton from "@/components/primaryButton/mediumbutton";

	<MediumButton onClick={() => {}}>
		버튼
	</MediumButton>
*/

/* 비활성화 미디엄 버튼 사용 예시
import MediumButton from "@/components/primaryButton/mediumbutton";

	<MediumButton disabled={true}>
	버튼
	</MediumButton>
*/
