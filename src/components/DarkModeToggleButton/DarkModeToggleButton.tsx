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
        aria-label="Toggle dark mode" // 접근성을 위한 aria-label 추가
      />
      <label 
        className={styles.label} 
        htmlFor="darkModeToggle" 
        tabIndex={0} // 키보드 탐색을 위해 tabIndex 추가
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDarkMode();
            e.preventDefault(); // 기본 스페이스바 동작 방지
          }
        }}
      >
        <span className={styles.switch} />
      </label>
    </div>
  );
};

export default DarkModeToggleButton;
