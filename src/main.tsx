import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// > css
import "@/styles/styles.css";
// > components
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

const queryClient = new QueryClient();

const rootNode = document.getElementById("react-app");
createRoot(rootNode!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
