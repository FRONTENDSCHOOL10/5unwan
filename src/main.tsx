import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// > css
import "@/styles/globals.css";
import "@/styles/reset.css";
// > components
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "@/routes/Login";
import Home from "@/routes/Home";
import PrivateRoute from "@/routes/PrivateRoute";
import Start from "@/routes/Start";
import Register from "@/routes/Register";
import OnboardedRoute from "@/routes/OnboardedRoute";
import OnboardingRoute from "@/routes/Onboarding";
import OnboardingBasic from "@/routes/Onboarding/OnboardingBasic";
import OnboardingDob from "@/routes/Onboarding/OnboardingDob";
import SharedLayout from "@/routes/SharedLayout";
import Calendar from "@/routes/Calendar";
import Maps from "@/routes/Maps";
import MyPage from "@/routes/MyPage";

const queryClient = new QueryClient();

export type RouteHandle = {
  hideHeader?: boolean;
  hideGnb?: boolean;
  title?: string;
};

const router = createBrowserRouter([
  {
    element: <SharedLayout />,

    children: [
      {
        path: "/start",
        element: <Start />,
        handle: {
          hideHeader: true,
          hideGnb: true,
        } satisfies RouteHandle,
      },
      {
        path: "/register",
        element: <Register />,
        handle: {
          hideGnb: true,
          title: "회원가입",
        } satisfies RouteHandle,
      },
      {
        path: "/login",
        element: <Login />,
        handle: {
          hideGnb: true,
          title: "로그인",
        } satisfies RouteHandle,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            element: <OnboardedRoute />,
            children: [
              {
                index: true,
                element: <Home />,
                handle: {
                  hideHeader: true,
                } satisfies RouteHandle,
              },
              {
                path: "calendar",
                element: <Calendar />,
                handle: {
                  hideHeader: true,
                } satisfies RouteHandle,
              },
              {
                path: "maps",
                element: <Maps />,
                handle: {
                  hideHeader: true,
                } satisfies RouteHandle,
              },
              {
                path: "my-page",
                element: <MyPage />,
                handle: {
                  hideHeader: true,
                } satisfies RouteHandle,
              },
            ],
          },
          {
            path: "onboarding",
            element: <OnboardingRoute />,
            handle: {
              hideGnb: true,
              title: "회원가입",
            } satisfies RouteHandle,
            children: [
              { index: true, element: <Navigate to="basic" replace /> },
              {
                path: "basic",
                element: <OnboardingBasic />,
              },
              {
                path: "dob",
                element: <OnboardingDob />,
              },
            ],
          },
        ],
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
