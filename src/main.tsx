import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// > css
import "@/styles/styles.css";
// > components
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
// > dark mode
import { DarkModeProvider } from '@/components/DarkModeContext/DarkModeContext'; // Import DarkModeProvider

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error("error:", error),
  }),
});

const rootNode = document.getElementById("react-app");
createRoot(rootNode!).render(
<StrictMode>
    <DarkModeProvider> {/* Wrap with DarkModeProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </DarkModeProvider>
  </StrictMode>
);
