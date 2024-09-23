import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // 로컬 스토리지에서 다크 모드 상태를 가져옵니다.
    const storedValue = localStorage.getItem('isDark');
    return storedValue === 'true'; // "true"일 경우 true로 변환
  });

  useEffect(() => {
    // 다크 모드 상태에 따라 <body>에 클래스를 추가하거나 제거합니다.
    document.body.classList.toggle('is-dark', isDark);
    // 다크 모드 상태를 로컬 스토리지에 저장합니다.
    localStorage.setItem('isDark', JSON.stringify(isDark));
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
