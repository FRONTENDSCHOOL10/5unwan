import { createBrowserRouter, Navigate } from "react-router-dom";
import Calendar from "@/routes/Calendar";
import Home from "@/routes/Home";
import Login from "@/routes/Login";
import Maps from "@/routes/Maps";
import MyPage from "@/routes/MyPage";
import OnboardedRoute from "@/routes/OnboardedRoute";
import OnboardingRoute from "@/routes/Onboarding";
import OnboardingBasic from "@/routes/Onboarding/OnboardingBasic";
import OnboardingDob from "@/routes/Onboarding/OnboardingDob";
import OnboardingHeight from "@/routes/Onboarding/OnboardingHeight";
import OnboardingInterests from "@/routes/Onboarding/OnboardingInterests";
import OnboardingWeight from "@/routes/Onboarding/OnboardingWeight";
import PrivateRoute from "@/routes/PrivateRoute";
import Register from "@/routes/Register";
import SharedLayout from "@/routes/SharedLayout";
import Start from "@/routes/Start";

export type RouteHandle = {
  hideHeader?: boolean;
  hideGnb?: boolean;
  title?: string;
};
export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
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
                {
                  path: "height",
                  element: <OnboardingHeight />,
                },
                {
                  path: "weight",
                  element: <OnboardingWeight />,
                },
                {
                  path: "interests",
                  element: <OnboardingInterests />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);