/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 타입 정의
interface DarkModeContextType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

// 컨텍스트 생성
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // 다크 모드 상태에 따라 <body>에 클래스를 추가하거나 제거합니다.
    document.body.classList.toggle('is-dark', isDark);
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// 커스텀 훅
export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
