import { createBrowserRouter, Navigate } from "react-router-dom";
import Calendar from "@/routes/Calendar";
import Home from "@/routes/Home";
import Login from "@/routes/Login";
import Maps from "@/routes/Maps";
import MyPage from "@/routes/MyPage";
import OnboardedRoute from "@/routes/OnboardedRoute";
import OnboardingRoute from "@/routes/Onboarding";
import PrivateRoute from "@/routes/PrivateRoute";
import Register from "@/routes/Register";
import SharedLayout from "@/routes/SharedLayout";
import Start from "@/routes/Start";
import NotFound from "@/routes/NotFound";
import LogoutComplete from "@/routes/MyPage/LogoutComplete/index";
import DeleteAccount from "@/routes/MyPage/DeleteAccount/deleteAccount";
import DeleteComplete from "@/routes/MyPage/DeleteAccount/deleteComplete";

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
          path: "/*",
          element: <NotFound />,
          handle: {
            hideGnb: true,
            hideHeader: true,
          } satisfies RouteHandle,
        },
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              element: <OnboardedRoute />,
              children: [
                { index: true, element: <Navigate to="home" replace /> },
                {
                  path: "home",
                  element: <Home />,
                  handle: {
                    title: "홈",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "calendar",
                  element: <Calendar />,
                  handle: {
                    title: "캘린더",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "maps",
                  element: <Maps />,
                  handle: {
                    title: "지도",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "my-page",
                  element: <MyPage />,
                  handle: {
                    title: "마이페이지",
                    hideHeader: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "logout-complete",
                  element: <LogoutComplete />,
                  handle: {
                    title: "로그아웃 완료",
                    hideHeader: true,
                    hideGnb: true,
                  } satisfies RouteHandle,
                },
                {
                  path: "/delete-account",
                  element: <DeleteAccount />,
                  handle: {
                    title: "회원 탈퇴",
                    hideHeader: true,
                    hideGnb: true,
                  },
                },
                {
                  path: "/delete-complete",
                  element: <DeleteComplete />,
                  handle: {
                    title: "회원탈퇴 완료",
                    hideHeader: true,
                    hideGnb: true,
                  },
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
                  lazy: () => import("@/routes/Onboarding/OnboardingBasic"),
                },
                {
                  path: "dob",
                  lazy: () => import("@/routes/Onboarding/OnboardingDob"),
                },
                {
                  path: "height",
                  lazy: () => import("@/routes/Onboarding/OnboardingHeight"),
                },
                {
                  path: "weight",
                  lazy: () => import("@/routes/Onboarding/OnboardingWeight"),
                },
                {
                  path: "interests",
                  lazy: () => import("@/routes/Onboarding/OnboardingInterests"),
                },
                {
                  path: "done",
                  lazy: () => import("@/routes/Onboarding/OnboardingDone"),
                },
                {
                  path: "resume",
                  lazy: () => import("@/routes/Onboarding/OnboardingResume"),
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
