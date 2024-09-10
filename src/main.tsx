import { StrictMode, createContext } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// > css
import "@/styles/styles.css";
// > components
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
// darkmode
import { GlobalStyle } from '@/global-styles';
import { useDarkMode } from '@/hooks/useDarkMode.ts';
import { lightTheme, Theme } from '@/theme';
import Toggle from "@/components/DarkModeToggle";


interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error("error:", error),
  }),
});

const queryClient = new QueryClient();


// App 컴포넌트 내에서 useDarkMode 훅을 호출
function App() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <QueryClientProvider client={queryClient}>
          <Toggle />
          <GlobalStyle theme={theme} />
          <RouterProvider router={router} />
        </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

// DOM 컨테이너에 createRoot를 한 번만 호출하고, 이후에 render만 사용
const rootNode = document.getElementById('react-app') as HTMLElement;
const root = createRoot(rootNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);