import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// > css
import "@/styles/globals.css";
// > components
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@/routes/Login";
import Home from "@/routes/Home";
import PrivateRoute from "@/routes/PrivateRoute";
import Start from "@/routes/Start";
import Register from "@/routes/Register";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/start",
    element: <Start />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

const rootNode = document.getElementById("react-app");
createRoot(rootNode!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
