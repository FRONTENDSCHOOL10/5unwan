import React from 'react';
import { useDarkMode } from '@/components/DarkModeContext/DarkModeContext';
import styles from './style.module.css'; // CSS 모듈을 가져옵니다.

const DarkModeToggleButton: React.FC = () => {
  const { isDark, setIsDark } = useDarkMode();

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <input 
        type="checkbox" 
        className={styles.checkbox} 
        id="darkModeToggle" 
        checked={isDark} 
        onChange={toggleDarkMode}
      />
      <label className={styles.label} htmlFor="darkModeToggle">
        <span className={styles.switch} />
      </label>
    </div>
  );
};

export default DarkModeToggleButton;
