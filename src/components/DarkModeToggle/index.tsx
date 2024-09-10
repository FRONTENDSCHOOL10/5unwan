import { ReactElement, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '@/main';
import { lightTheme, Theme } from '@/theme';

interface ToggleProps {
  theme: Theme;
}

const ToggleButton = styled('button')<ToggleProps>`
  position: fixed;
  right: 1.5rem;
  bottom: 5rem;
  border-radius: var(--rounded-full);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.toggleBack};
  color: ${({ theme }) => theme.text};
  box-shadow: var(--gnb-shadow);
  z-index: 10000;
`;

const Emoji = styled.figure`
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DarkModeToggle(): ReactElement {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} theme={theme}>
      {theme === lightTheme ? (
        <>
          <Emoji>
              🌚
          </Emoji>
        </>
      ) : (
        <>
          <Emoji>
              🌞
          </Emoji>
        </>
      )}
    </ToggleButton>
  );
}