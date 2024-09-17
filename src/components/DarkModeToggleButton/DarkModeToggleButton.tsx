import React from 'react';
import { useDarkMode } from '@/components/DarkModeContext/DarkModeContext';

const DarkModeToggleButton: React.FC = () => {
  const { isDark, setIsDark } = useDarkMode();

  const toggleDarkMode = (prev: boolean) => {
    setIsDark(!prev);
  };

  return (
    <button onClick={() => toggleDarkMode(isDark)}>
      {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
};

export default DarkModeToggleButton;
